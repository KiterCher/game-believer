# GameBeliever 内容生产流水线设计文档（V1.0）

---

## 1. 设计目标

> 这不是一个静态网站生成器。这是一个**内容工厂**。
> 决定 GameBeliever 未来是 500 页还是 50,000 页。

### 核心指标

| 指标 | 目标 |
|------|------|
| 1 角色 → 全内容生成 | ≤ 5 分钟（AI API 调用） |
| 批量生成 60 角色 | ≤ 2 小时（并发 10 路） |
| 内容质量（QA 通过率） | ≥ 90% 首次生成，修复后 ≥ 98% |
| 人工干预 | 仅 QA 未通过时介入 |

---

## 2. 流水线总览

```
┌─────────────────────────────────────────────────────┐
│              GameBeliever Content Pipeline           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [1] JSON Data  ──→  [2] Prompt Builder  ──→       │
│  src/data/            src/scripts/build-prompt.ts    │
│                                                     │
│  [3] AI API Call  ──→  [4] Normalize  ──→  [5] QA Agent  ──→           │
│  DeepSeek/OpenAI      src/normalize/               │
│                                                     │
│  [5] Markdown  ──→  [6] Astro SSG  ──→             │
│  src/content/         npm run build                 │
│                                                     │
│  [7] Deploy  ──→  [8] GSC Submit                    │
│  Cloudflare Pages     sitemap.xml                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 3. 阶段 1：JSON Data（数据层）

### 3.1 目录结构

```
src/data/
├── characters/{slug}/
│   ├── core.json          # 基本信息（name/rarity/element/path）
│   ├── skills.json        # 技能详情
│   ├── traces.json        # 行迹
│   ├── eidolons.json      # 星魂
│   ├── stats.json         # 属性成长
│   └── materials.json     # 晋级材料
├── keywords/{slug}-keywords.json   # SEO 关键词
├── lightcones/{slug}.json
├── relics/{slug}.json
├── materials/{slug}.json
├── teams/{slug}.json
├── banners/{version}-phase{1|2}.json
├── versions/{version}.json
└── events/{slug}.json
```

### 3.2 数据完整性校验

```bash
# 运行校验脚本
npx tsx src/scripts/validate-data.ts

# 检查项：
# - JSON 格式正确性
# - 必填字段完整
# - ID 引用一致性（characterId 存在性）
# - 枚举值合法性
```

---

## 4. 阶段 2：Prompt Builder（Prompt 组装层）

### 4.1 工作流程

```
src/scripts/build-prompt.ts
         ↓
   读取 JSON 数据文件
         ↓
   读取关键词文件
         ↓
   选择 Prompt 模板（prompts/）
         ↓
   注入数据 + 关键词 → 完整 Prompt
         ↓
   输出到 temp/prompt-{slug}-{type}.txt
```

### 4.2 TypeScript 脚本架构

```
src/scripts/
├── build-prompt.ts       # Prompt 组装入口
├── generate.ts           # AI 调用入口（批量/单篇）
├── types.ts              # 类型定义
└── utils/
    ├── read-json.ts      # JSON 读取工具
    ├── read-keywords.ts  # 关键词读取
    └── format-output.ts  # MD 格式化
```

### 4.3 关键代码接口

```typescript
// src/scripts/build-prompt.ts
interface PromptContext {
  characterData: CharacterSplitData;  // 6 个 JSON 文件合并
  keywords: KeywordData;              // 关键词 JSON
  template: string;                   // Prompt 模板名
  targetWords: number;                // 目标字数
}

function buildPrompt(ctx: PromptContext): string {
  // 1. 选择基础 Prompt 模板
  const template = readPrompt(ctx.template);

  // 2. 注入角色数据
  const dataSection = formatCharacterData(ctx.characterData);

  // 3. 注入关键词要求
  const keywordSection = formatKeywords(ctx.keywords);

  // 4. 拼接
  return `${template}

## DATA INPUT
${dataSection}

## KEYWORD REQUIREMENTS
${keywordSection}

## OUTPUT REQUIREMENTS
- Minimum ${ctx.targetWords} words
- 8~15 FAQs from longTailFAQs list
- Internal links to related pages
- Meta description 120~160 chars`;
}
```

---

## 5. 阶段 3：AI API Call（内容生成层）

### 5.1 批量生成脚本

```bash
# 单个角色全部内容生成
npx tsx src/scripts/generate.ts --char=kafka --all

# 批量生成全部角色
npx tsx src/scripts/generate.ts --all-chars --concurrency=10

# 只生成指定类型
npx tsx src/scripts/generate.ts --char=kafka --type=build
npx tsx src/scripts/generate.ts --char=kafka --type=character
npx tsx src/scripts/generate.ts --char=kafka --type=team
npx tsx src/scripts/generate.ts --char=kafka --type=pull-advice
```

### 5.2 生成策略

| 参数 | 值 | 说明 |
|------|-----|------|
| Model | deepseek-chat / gpt-4o-mini | 优先 DeepSeek（性价比） |
| Temperature | 0.7 | 平衡创意与一致性 |
| Max Tokens | 4096 | 确保 ≥ 1200 词输出 |
| Concurrency | 10 | 并发请求数 |
| Retry | 3 | QA 未通过自动重试 |

### 5.3 API 调用封装

```typescript
// src/scripts/generate.ts 核心逻辑
async function generateContent(
  slug: string,
  type: ContentType,
  retryCount = 0
): Promise<string> {
  const prompt = buildPrompt({ slug, type });
  const raw = await callAI(prompt);
  const qaResult = await runQA(raw, type);

  if (!qaResult.passed && retryCount < MAX_RETRIES) {
    console.log(`QA failed for ${slug}/${type}, retrying...`);
    return generateContent(slug, type, retryCount + 1);
  }

  return formatMarkdown(raw, qaResult.fixes);
}
```



---


## 6. 阶段 4：Normalize 层（内容标准化）

### 6.1 设计目的

> AI 每次生成的内容格式会有差异。Normalize 层确保所有输出统一。

### 6.2 标准化规则

`	ypescript
// src/normalize/index.ts
function normalize(markdown: string, slug: string, type: ContentType): string {
  let result = markdown;

  // 1. 标题统一：确保 H1 格式为 "{Name} {Type} Guide | GameBeliever"
  result = normalizeH1(result, slug, type);

  // 2. Slug 统一：确保所有内部链接使用规范 slug
  result = normalizeLinks(result, slug);

  // 3. FAQ 统一：确保 FAQ 标题为 "## FAQ"（非 "## Frequently Asked Questions" 等变体）
  result = normalizeFAQHeader(result);

  // 4. 表格格式统一：确保 Markdown 表格对齐
  result = normalizeTables(result);

  // 5. 空行统一：确保段落间有且仅有 1 个空行
  result = normalizeSpacing(result);

  return result;
}
`

### 6.3 新增流水线位置

`
[3] AI API Call
    ↓
[4] Normalize（标题/slug/链接/FAQ/格式统一）
    ↓
[5] QA Agent（质量审核）
    ↓
[6] Markdown 输出
`
## 7. 阶段 5：QA Agent（质量审核层）

### 6.1 审核规则配置

```
src/qa/
├── rules.json          # 审核规则定义
├── check.ts            # 审核执行脚本
└── report.json         # 审核输出报告
```

### 6.2 审核规则定义

```json
{
  "rules": {
    "h1_exists": { "enabled": true, "severity": "error" },
    "faq_count": { "enabled": true, "min": 8, "severity": "error" },
    "meta_description": { "enabled": true, "min_chars": 120, "max_chars": 160, "severity": "error" },
    "word_count": { "enabled": true, "min": { "character": 1200, "build": 1200, "team": 1200, "lightcone": 800, "relic": 800, "material": 800, "pull-advice": 1200 }, "severity": "error" },
    "internal_links": { "enabled": true, "min": 5, "severity": "warning" },
    "keyword_coverage": { "enabled": true, "mainKeyword_min": 3, "secondary_coverage_pct": 60, "severity": "error" },
    "version_tag": { "enabled": true, "severity": "warning" },
    "h2_structure": { "enabled": true, "min": 3, "severity": "warning" }
  }
}
```

### 6.3 QA 执行流程

```typescript
// src/qa/check.ts
interface QAResult {
  passed: boolean;
  score: number;         // 0~100
  errors: QAIssue[];
  warnings: QAIssue[];
  fixes: string[];       // 修复建议
}

async function runQA(markdown: string, type: ContentType): Promise<QAResult> {
  const rules = loadRules();
  const issues: QAIssue[] = [];

  // 逐条检查
  if (!hasH1(markdown)) issues.push(error("h1_exists"));
  if (countFAQs(markdown) < rules.faq_count.min) issues.push(error("faq_count"));
  if (!validMetaDescription(markdown)) issues.push(error("meta_description"));
  if (countWords(markdown) < rules.word_count.min[type]) issues.push(error("word_count"));
  if (countInternalLinks(markdown) < rules.internal_links.min) issues.push(warning("internal_links"));

  return {
    passed: issues.filter(i => i.severity === "error").length === 0,
    score: calculateScore(issues),
    errors: issues.filter(i => i.severity === "error"),
    warnings: issues.filter(i => i.severity === "warning"),
    fixes: generateFixes(issues)
  };
}
```

### 6.4 运行方式

```bash
# 单篇 QA
npx tsx src/qa/check.ts --file=src/content/characters/kafka.md

# 全量 QA（CI 中运行）
npx tsx src/qa/check.ts --all --output=qa-report.json

# 修复模式（自动重跑未通过的）
npx tsx src/scripts/generate.ts --qa-fix-only
```

---

## 8. 阶段 6：Markdown 输出（内容层）

### 7.1 输出目录结构

```
src/content/
├── characters/{slug}.md              # 角色详情页
├── builds/{slug}-general-build.md    # Build 页
├── teams/{slug}-team.md              # 队伍页
├── lightcones/{slug}.md
├── relics/{slug}.md
├── materials/{slug}.md
├── pull-advice/{slug}.md             # 抽取建议
├── compare/{slug1}-vs-{slug2}.md     # 对比页
├── tier-list/index.md                # 总榜
├── tier-list/{role}.md               # 分榜
├── banners/{version}-phase{1|2}.md
├── versions/{version}.md
├── events/{slug}.md
├── guides/farming/{slug}.md
├── guides/banners/{slug}.md
├── guides/events/{slug}.md
└── guides/beginners/{slug}.md
```

### 7.2 Markdown 前置元数据

每个 MD 文件头部必须包含：

```yaml
---
title: "Kafka Build Guide — Best Relics, Light Cones & Teams | GameBeliever"
description: "Best Kafka build guide for HSR. Recommended relics, light cones, team compositions. 120~160 chars."
updatedAt: "2026-06-12"
version: "3.4"
type: "build"
character: "kafka"
keywords: ["kafka build", "best kafka build", "kafka relics"]
---
```

---

## 9. 阶段 7：Astro SSG（构建层）

### 8.1 动态路由生成

```typescript
// src/pages/characters/[slug].astro
export async function getStaticPaths() {
  const characters = await getCollection('characters');
  return characters.map(c => ({
    params: { slug: c.slug },
    props: { content: c }
  }));
}
```

### 8.2 构建命令

```bash
npm run build          # Astro SSG 构建 → dist/
npm run preview        # 本地预览构建结果
```

---

## 10. 阶段 8：Deploy（部署层）

### 9.1 Cloudflare Pages 配置

```toml
# wrangler.toml
name = "gamebeliever"
pages_build_output_dir = "dist"
compatibility_date = "2026-06-12"

[env.production]
  routes = [{ pattern = "gamebeliever.com/*" }]
```

### 9.2 CI/CD 流程（GitHub Actions）

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsx src/qa/check.ts --all  # QA 阻断
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: gamebeliever
          directory: dist
```

---

## 11. 阶段 9：GSC / SEO 提交

### 10.1 自动提交

```bash
# 构建后自动生成 sitemap
npx astro add sitemap

# 主动提交至 Google（限每日 10 条）
npx tsx src/scripts/submit-url.ts --new-only
```

### 10.2 sitemap.xml 配置

```typescript
// astro.config.mjs
import sitemap from "@astrojs/sitemap";
export default {
  integrations: [sitemap({
    filter: (page) => !page.includes("/admin"),
    changefreq: "weekly",
    priority: 0.8,
  })],
  site: "https://gamebeliever.com",
};
```

---

## 12. 完整执行命令速查

```bash
# === 单角色全流程 ===
npx tsx src/scripts/validate-data.ts --char=kafka        # 1. 校验数据
npx tsx src/scripts/generate.ts --char=kafka --all        # 2. 生成全部 9 篇
npx tsx src/qa/check.ts --char=kafka                      # 3. QA 审核
npm run build                                              # 4. 构建
# git push → CI/CD → Cloudflare Pages                     # 5. 部署

# === 批量全量生成 ===
npx tsx src/scripts/generate.ts --all-chars --concurrency=10
npx tsx src/qa/check.ts --all --output=qa-report.json
npm run build

# === 重新生成（版本更新后） ===
npx tsx src/scripts/generate.ts --all-chars --force --concurrency=10
```

---

## 13. 性能与成本估算

| 项目 | 估算 |
|------|------|
| 单篇 API 调用耗时 | ~15~30s |
| 60 角色 × 9 篇 = 540 篇 | ~2h（并发10） |
| API 成本（DeepSeek） | ~$0.50/百篇 |
| 540 篇总成本 | ~$2.70 |
| Astro 构建（540 页） | ~2~3 分钟 |
| Cloudflare Pages 部署 | ~30 秒 |

---


## 15. MVP 验证范围（首阶段仅 12 页）

> **不要一开始生成 540 篇。** 先用 3 角色验证全链路。

### MVP 目标

| 角色 | Character | Build | Team | Pull Advice | 小计 |
|------|-----------|-------|------|-------------|------|
| Kafka | 1 | 1 | 1 | 1 | 4 |
| Acheron | 1 | 1 | 1 | 1 | 4 |
| Firefly | 1 | 1 | 1 | 1 | 4 |
| **合计** | | | | | **12 页** |

### MVP 流程

`
1. 整理 3 角色 JSON 数据
2. 生成 12 篇 MD（build-prompt.ts → AI → Normalize → QA）
3. Astro 构建 + Cloudflare Pages 部署
4. 提交 GSC + Bing
5. 人工审查内容质量（Meta/FAQ/内链/关键词）
6. 确认通过 → 扩展到 60 角色
`
## 14. 目录总览

```
GameBeliever-web/
├── src/
│   ├── data/           # JSON 数据文件
│   ├── content/        # AI 生成的 Markdown
│   ├── pages/          # Astro 路由
│   ├── components/     # Astro 组件
│   ├── normalize/      # Normalize 标准化层
│   ├── scripts/        # 生成 + 校验脚本
│   ├── qa/             # QA Agent
│   ├── types/          # TypeScript 类型
│   └── layouts/        # 布局组件
├── prompts/            # Prompt 模板库
├── temp/               # 临时 Prompt 文件
├── dist/               # 构建输出
└── docs/               # 项目文档
```

---

> **文档版本**：V1.1
> **创建日期**：2026-06-12
> **变更**：新增 Normalize 层（标题/slug/链接/FAQ统一）+ MVP 验证范围（12页起步）
> **下一步**：实现 `src/scripts/build-prompt.ts` + `src/scripts/generate.ts` + `src/qa/check.ts` 三个核心脚本，即可跑通 Kafka 全流程。
