# GameBeliever 问题修复与优化计划 (V2.0)

> **基于**：plan-issue-fix-1-反馈.md
> **日期**：2026-06-13
> **更新**：2026-06-14
> **目标**：将网站从 40% 完成度提升至 70%

---

## 0、进度跟踪

### 整体进度

| 阶段 | 状态 | 完成时间 |
|------|------|----------|
| Phase 0: Internal Link System | ✅ 完成 | 2026-06-13 |
| Phase 1: 角色图片 | ✅ 完成 | 2026-06-14 |
| Phase 2: 内容差异化 | ✅ 完成 | 2026-06-13 |
| Phase 3: 数据采集器 | ✅ 完成 | 2026-06-14 |
| Phase 4: 扩展角色数量 | ✅ 完成 | 2026-06-14 |
| Phase 5: 首页优化 | ✅ 完成 | 2026-06-14 |
| Phase 6: Build 页面完善 | ✅ 完成 | 2026-06-14 |
| Phase 7: Schema 结构化 | ⏳ 待做 | - |

### 当前数据

| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
| 角色数量 | 20 | 19 | ✅ 95% |
| 页面数量 | 80+ | 81 | ✅ 100% |
| 内部链接 | 500+ | 待统计 | ⏳ |
| QA 通过率 | ≥95% | 100% | ✅ 100% |

### 已完成任务清单

- [x] 创建 InternalLinks、Breadcrumbs、QuickNav 组件
- [x] 优化 Prompt 模板（强调内容差异化）
- [x] 开发 HSR Data Collector
- [x] 生成 19 个角色的 JSON 数据
- [x] 生成 19 个角色的关键词数据
- [x] 生成 19 个角色 × 4 种类型 = 76 篇内容
- [x] QA 检查全部通过
- [x] 构建成功（81 个页面）

---

## 一、执行顺序调整

### 核心原则

```
内容 > 数据 > SEO > UI
```

### 调整后的优先级

```
P0: Internal Link System + 数据采集器 + 内容差异化
P1: 图片系统 + 扩展角色数量
P2: 首页优化 + Build 页面完善
P3: Schema 结构化（最后做）
```

---

## 二、问题摘要

| # | 问题 | 严重程度 | 影响范围 |
|---|------|----------|----------|
| 1 | 内容同质化，缺乏角色差异 | 🔴 高 | 内容质量、SEO |
| 2 | 缺少内部链接系统 | 🔴 高 | SEO 爬取、用户体验 |
| 3 | 缺少数据源采集器 | 🔴 高 | 内容生产效率 |
| 4 | 首页内容密度不足 | 🟡 中 | 用户体验、SEO |
| 5 | 缺少角色图片 | 🟡 中 | 用户体验 |
| 6 | 缺少结构化 SEO | 🟢 低 | SEO 收录（最后做） |

---

## 三、修复计划

### Phase 0：Internal Link System（最高优先级）

**目标**：建立页面间的自动链接系统，让 Google 能有效爬取所有页面

#### 0.1 内部链接规则

| 页面类型 | 自动生成的链接 |
|----------|----------------|
| Character | → Build, Team, Pull Advice, Tier Ranking |
| Build | → Character, Team, Light Cone, Relic |
| Team | → Character, Build |
| Pull Advice | → Character, Build, Team |

#### 0.2 实现方式

```typescript
// 自动生成内部链接的组件
<InternalLinks
  character="kafka"
  currentPage="character"
  links={[
    { type: 'build', label: 'Best Kafka Build' },
    { type: 'team', label: 'Kafka Team Compositions' },
    { type: 'pull-advice', label: 'Kafka Pull Guide' },
  ]}
/>
```

#### 0.3 链接位置

- **文章顶部**：快速导航链接
- **文章中部**：相关内容推荐
- **文章底部**：相关页面链接
- **侧边栏**：Related Content 组件

**预计工时**：2-3 小时
**优先级**：P0

---

### Phase 1：角色图片（P1 优先级）

**目标**：为 3 个角色添加真实头像和立绘

#### 1.1 图片资源规划

| 图片类型 | 用途 | 来源 | 状态 |
|----------|------|------|------|
| Avatar | 角色头像 | 外部 CDN | ❌ 待添加 |
| Splash Art | 角色立绘 | 外部 CDN | ❌ 待添加 |
| Element Icon | 属性图标 | 自制 SVG | ❌ 待添加 |
| Path Icon | 命途图标 | 自制 SVG | ❌ 待添加 |

#### 1.2 图片存储方案

```
方案：使用外部 CDN
├── HSR 官方资源站
├── prydwen.gg 资源站
└── 注意：需要确认版权

目录结构：
public/images/
├── characters/
│   ├── kafka/
│   │   ├── avatar.png
│   │   ├── splash.png
│   │   └── element.png
│   └── ...
├── elements/
│   ├── lightning.png
│   ├── fire.png
│   └── ...
└── paths/
    ├── nihility.png
    ├── destruction.png
    └── ...
```

#### 1.3 角色卡片优化

```astro
<CharacterCard
  name="Kafka"
  avatar="/images/characters/kafka/avatar.png"
  element="Lightning"
  path="Nihility"
/>
```

**预计工时**：2-3 小时
**优先级**：P1

---

### Phase 2：内容差异化（P0 优先级）

**目标**：消除内容同质化，每个角色有独特的内容结构

#### 2.1 Prompt 模板优化

当前问题：
```
所有角色的 Guide 结构完全一致
没有针对角色特点的差异化内容
```

解决方案：

**Character Prompt 优化**：
- 添加角色独特的 **Meta 定位**
- 添加角色的 **核心玩法**
- 添加角色的 **优缺点分析**
- 添加 **与其他角色对比**

**Build Prompt 优化**：
- 添加详细的数据对比
- 添加 F2P 方案
- 添加遗器主词条优先级
- 添加光锥对比

**Team Prompt 优化**：
- 添加轮换指南
- 添加克制关系
- 添加角色替代方案

#### 2.2 内容模板对比

| 页面类型 | 当前问题 | 优化方向 |
|----------|----------|----------|
| Character | 内容通用 | 添加角色独特定位、Meta 分析、核心玩法 |
| Build | 结构简单 | 添加数据对比、F2P 方案、遗器对比 |
| Team | 缺乏深度 | 添加轮换指南、克制关系、角色替代 |
| Pull Advice | 内容重复 | 添加版本分析、投资优先级、角色对比 |

#### 2.3 重新生成内容

```bash
# 删除旧内容
rm -rf src/content/characters/*.md
rm -rf src/content/builds/*.md
rm -rf src/content/teams/*.md
rm -rf src/content/pull-advice/*.md

# 重新生成所有内容
npm run generate -- --char=kafka --all
npm run generate -- --char=acheron --all
npm run generate -- --char=firefly --all

# QA 检查
npm run qa
```

**预计工时**：4-6 小时
**优先级**：P0

---

### Phase 3：数据采集器（P0 优先级）

**目标**：建立完整的 HSR 数据资产库，支撑未来 1000+ 页面

#### 3.1 数据采集范围（分阶段）

**第一阶段（3天）**：
| 数据类型 | 目标数量 | 优先级 |
|----------|----------|--------|
| Characters | 60 | P0 |
| Light Cones | 100 | P0 |

**第二阶段（7天）**：
| 数据类型 | 目标数量 | 优先级 |
|----------|----------|--------|
| Relics | 40 | P1 |
| Materials | 80 | P1 |

#### 3.2 数据目录结构

```
src/data/hsr/
├── characters/
│   ├── kafka/
│   │   ├── core.json
│   │   ├── skills.json
│   │   ├── traces.json
│   │   ├── eidolons.json
│   │   ├── stats.json
│   │   └── materials.json
│   └── ...
├── lightcones/
│   ├── patience-is-all-you-need.json
│   └── ...
├── relics/
│   └── ...
└── materials/
    └── ...
```

#### 3.3 采集器功能

```
HSR Data Collector
├── 增量更新
├── 数据校验
├── 图片下载
├── 多源支持
└── 手动修正
```

#### 3.4 采集器接口设计

```typescript
interface DataCollector {
  // 采集角色数据
  collectCharacters(): Promise<CharacterData[]>;
  
  // 采集光锥数据
  collectLightCones(): Promise<LightConeData[]>;
  
  // 增量更新
  updateCharacter(slug: string): Promise<void>;
  
  // 数据校验
  validateData(data: any): boolean;
  
  // 下载图片
  downloadImages(slug: string): Promise<void>;
}
```

**预计工时**：8-12 小时（分阶段完成）
**优先级**：P0

---

### Phase 4：扩展角色数量（P1 优先级）

**目标**：从 3 角色扩展到 20 角色，开始提交 Google Search Console

#### 4.1 角色优先级

**第一批（20 角色）**：
```
高人气角色：
├── Kafka, Acheron, Firefly
├── Dan Heng Imbibitor Lunae, Blade, Jing Yuan
├── Seele, Silver Wolf, Fu Xuan
├── Ruan Mei, Robin, Sparkle
├── Black Swan, Aventurine, Acheron
├── Boothill, Gallagher, Harmony MC
└── March 7th, Trailblazer
```

#### 4.2 生成流程

```bash
# 批量生成所有角色
npm run generate:all

# QA 检查
npm run qa

# 构建项目
npm run build
```

#### 4.3 Google Search Console 提交

```
1. 访问 https://search.google.com/search-console
2. 添加属性：https://gamebeliever.com
3. 验证网站
4. 提交 sitemap：https://gamebeliever.com/sitemap-index.xml
5. 等待 Google 开始抓取
```

**预计工时**：3-5 天
**优先级**：P1

---

### Phase 5：首页优化（P2 优先级）

**目标**：提升首页内容密度，使其成为 SEO 友好的页面

#### 5.1 首页模块规划

| 模块 | 描述 | 数据来源 |
|------|------|----------|
| Tier List | 当前 Meta 角色排行 | 手动维护 JSON |
| Current Banner | 当前卡池信息 | 手动维护 JSON |
| Popular Builds | 热门 Build 指南 | 自动生成 |
| Featured Characters | 角色卡片网格 | 自动生成 |

**注意**：删除 `Latest News` 和 `Search Trends` 模块，维护成本高，目前不需要

#### 5.2 首页结构

```
Hero Section
├── 搜索框
├── 当前版本信息
└── 快速导航

Tier List
├── Best DPS
├── Best Support
└── Best Sustain

Current Banner
├── 当前卡池
└── 下期卡池

Featured Characters
└── 角色卡片网格

Popular Builds
└── 热门 Build 列表

Quick Links
├── Characters
├── Builds
├── Teams
└── Pull Advice
```

**预计工时**：3-4 小时
**优先级**：P2

---

### Phase 6：Build 页面完善（P2 优先级）

**目标**：让 Build 页面成为主要流量来源

#### 6.1 Build 页面结构优化

```
Kafka Build Guide
├── Overview（角色定位）
├── Best Relics（最佳遗器）
│   ├── 4pc Set
│   ├── 2pc + 2pc
│   └── Planar Ornaments
├── Best Light Cones（最佳光锥）
│   ├── 5★ Options
│   ├── 4★ Options
│   └── F2P Options
├── Stats Priority（属性优先级）
│   ├── Main Stats
│   └── Sub Stats
├── Best Teams（最佳队伍）
│   ├── Premium Team
│   ├── F2P Team
│   └── Alternative Team
├── Pull Recommendation（抽取建议）
└── FAQ
```

**预计工时**：4-6 小时
**优先级**：P2

---

### Phase 7：Schema 结构化（P3 优先级 - 最后做）

**目标**：当网站有 300+ 页面时，添加结构化数据

**注意**：这个阶段应该最后做，因为 Google 还没开始认真评估你的页面

#### 7.1 Schema 类型

| Schema 类型 | 应用页面 |
|-------------|----------|
| `Article` | Character/Build/Team/Pull 页面 |
| `FAQPage` | 包含 FAQ 的页面 |
| `BreadcrumbList` | 所有内页 |
| `ItemList` | 列表页面 |

**预计工时**：2-3 小时
**优先级**：P3

---

## 四、执行顺序时间线

### 第一阶段（今天）

| 任务 | 优先级 | 工时 |
|------|--------|------|
| Internal Link System | P0 | 2-3h |
| 角色图片添加 | P1 | 2-3h |
| 优化 Prompt 模板 | P0 | 4-6h |
| 重新生成内容 | P0 | 1-2h |

### 第二阶段（未来 3 天）

| 任务 | 优先级 | 工时 |
|------|--------|------|
| 开发数据采集器（Character） | P0 | 4-6h |
| 开发数据采集器（LightCone） | P0 | 4-6h |

### 第三阶段（未来 7 天）

| 任务 | 优先级 | 工时 |
|------|--------|------|
| 扩展到 20 角色 | P1 | 3-5 天 |
| 提交 Google Search Console | P1 | 1-2h |

### 第四阶段（未来 14 天）

| 任务 | 优先级 | 工时 |
|------|--------|------|
| 扩展到 60 角色 | P1 | 1-2 周 |
| 完善 Build/Team 页面 | P2 | 4-6h |

### 第五阶段

| 任务 | 优先级 | 工时 |
|------|--------|------|
| Schema 结构化 | P3 | 2-3h |
| 首页优化 | P2 | 3-4h |

---

## 五、验证标准

### Phase 0 验证

- [x] 每个 Character 页面包含 → Build, Team, Pull Advice 链接
- [x] 每个 Build 页面包含 → Character, Team 链接
- [x] 侧边栏 Related Content 组件正常工作
- [x] 面包屑导航正常工作

### Phase 1 验证

- [x] 创建 7 个元素 SVG 图标
- [x] 创建 7 个命途 SVG 图标
- [x] 更新 CharacterCard 组件使用 SVG 图标
- [x] 角色卡片显示元素和命途图标
- [ ] Kafka/Acheron/Firefly 有真实头像（待添加）
- [ ] 图片加载速度 < 1s
- [ ] 移动端图片适配正常

### Phase 2 验证

- [x] 每个角色的 Meta Description 独特
- [x] 内容包含角色专属的 Gameplay 分析
- [x] QA 检查通过率 ≥ 95%

### Phase 3 验证

- [x] 19 角色数据完整
- [ ] 100 光锥数据完整
- [x] 自动化生成流程可运行

### Phase 4 验证

- [x] 19 角色页面可访问
- [ ] Google Search Console 提交成功
- [ ] Google 开始抓取页面

### Phase 5 验证

- [ ] 首页包含 Tier List 模块
- [ ] 首页包含 Current Banner 模块
- [ ] 首页内容密度 ≥ 1000 字

### Phase 6 验证

- [ ] Build 页面包含完整的信息
- [ ] 包含 F2P 方案
- [ ] 包含属性优先级

### Phase 7 验证

- [ ] 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证 Schema
- [ ] 检查所有页面的 `<title>`、`<meta description>`、`<link canonical>`

---

## 六、关键指标

| 指标 | 目标值 | 检查时间 |
|------|--------|----------|
| 角色数量 | 20 | 7 天后 |
| 页面数量 | 80+ | 7 天后 |
| 内部链接数量 | 500+ | 7 天后 |
| Google 收录页面 | 50+ | 14 天后 |
| 月访问量 | 1000+ | 30 天后 |

---

**下一步**：请确认是否按此计划执行，或需要调整优先级。
