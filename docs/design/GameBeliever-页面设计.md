[cache hygiene: omitted completed write.content argument, 2.1KB, approx 553 token(s), 87 line(s); see following tool result] preview="# GameBeliever 第一阶段 页面设计文档（V2.0 — 内容生产系统） --- ## 1. 设计原则 - **Content-First**：以内容为核心 - **Static-First**：Astro SSG - **Mobile-First**：响应式 - **Performance-First**：PageSpeed ≥ 90 --- ## 2. 网站信息架构（V2.0 扩展）

### 2.1 页面层级（15 路由，SEO 流量思维）

```
/ (Homepage — 内容聚合器)
├── /characters/{slug}                          → 角色详情页（Wiki 入口）
├── /characters/{slug}/builds                   → 角色 Build 列表页
├── /builds/{slug}-{variant}-build              → Build 变体页（SEO 主战场）
├── /pull-advice/{slug}                         → 抽取建议独立页（Pull Advice）
├── /compare/{slug1}-vs-{slug2}                 → 角色/光锥对比页（Comparison）
├── /teams/{slug}-team                          → 队伍指南页
├── /lightcones/{slug}                          → 光锥详情页
├── /relics/{slug}                              → 遗器详情页
├── /materials/{slug}                           → 材料详情页
├── /tier-list                                  → 总强度榜
│   ├── /tier-list/dps                          → DPS 分榜
│   ├── /tier-list/support                      → Support 分榜
│   ├── /tier-list/sustain                      → Sustain 分榜
│   ├── /tier-list/break                        → Break 分榜
│   ├── /tier-list/f2p                          → F2P 分榜
│   └── /tier-list/beginner                     → Beginner 新手分榜
├── /banners/{version}-{phase}                  → Banner 页
├── /events/{slug}                              → 事件页
├── /versions/{version}                         → 版本文本页
├── /guides/farming/{slug}                      → 养成/刷取攻略
├── /guides/banners/{slug}                      → 卡池/Banner 攻略
├── /guides/events/{slug}                       → 事件攻略
├── /guides/beginners/{slug}                    → 新手攻略
└── /about                                      → 关于页
```

### 2.2 导航结构

```
Header:
├── Logo (GameBeliever)
├── Characters ▾
├── Builds
├── Teams
├── Light Cones
├── Relics
├── Materials
├── Tier List ▾
│   ├── Overall
│   ├── DPS
│   ├── Support
│   ├── Sustain
│   ├── Break
│   ├── F2P
│   └── Beginner
├── Pull Advice
├── Compare
├── Banners
├── Events
└── Guides ▾
    ├── Farming
    ├── Banners
    ├── Events
    └── Beginners

Footer:
├── About
├── Privacy Policy
├── Contact
└── © 2026 GameBeliever
```

> **V1 不设站内搜索。** 300 页以下时 Google 本身就是搜索引擎。搜索功能延至 1000+ 页面后再上。

### 2.3 页面数量预估（V3.0 — Programmatic SEO）

| 页面类型 | 数量 | 计算依据 |
|---------|------|---------|
| Character Page | 60 | 全部角色 1:1 |
| Build Guide | 180 | 60 角色 × 3 变体 |
| Pull Advice | 60 | 每个角色 1 篇独立抽取建议 |
| Comparison | 30 | 热门角色/光锥对比（如 Acheron vs Kafka） |
| Team Guide | 50 | 主流队伍 × 变体 |
| LightCone Page | 100 | 全部光锥 |
| Relic Page | 40 | 全部遗器套装 |
| Material Page | 80 | 全部材料 |
| Tier List | 6 | 1 总榜 + 5 分榜 |
| Banner Page | 8 | 当前/历史版号 × 2 Phase |
| Event Page | 10 | 当前 + 近期事件 |
| Version Page | 6 | 最近 6 个版号 |
| Guides | 16 | 4 分类 × 4 篇 |
| Other | 3 | Home / About / Privacy |
| **合计** | **~649** | 纯结构化内容页 |
| ++ 交叉组合页（compare 变体 + 长尾 FAQ 页） | **~350+** | Programmatic SEO 增量 |
| **总目标** | **1000+** | |

---

## 3. 页面模板设计


### 3.1 Homepage（首页 — 内容聚合器，非门户）

**URL**: `/`

**定位**: 首页本身就是一个 SEO 页面，聚合最新内容，而非仅作为导航入口。

**内容结构**:
```
┌──────────────────────────────────────────┐
│  HERO: "Build Smarter. Farm Faster."      │
│  Subtitle: Honkai Star Rail Database      │
├──────────────────────────────────────────┤
│  🆕 Latest Character Releases (3~6)       │
│     — 最新上线角色卡片                      │
├──────────────────────────────────────────┤
│  📢 Current Banner                         │
│     — 当前卡池信息（Phase 1 & 2）           │
├──────────────────────────────────────────┤
│  🎯 Tier List Quick View                   │
│     — Top 5 DPS / Top 5 Support / Top 5     │
│       Beginner（迷你排行榜）                  │
├──────────────────────────────────────────┤
│  🔥 Most Popular Builds (3~6)              │
│     — 近期热门 Build 推荐                    │
├──────────────────────────────────────────┤
│  📋 Latest Guides (3~6)                    │
│     — 最新 Farming / Banner / Event 攻略     │
├──────────────────────────────────────────┤
│  About GameBeliever + Footer              │
└──────────────────────────────────────────┘
```

**字数要求**: ≥ 1500 词（首页本身是 SEO 页面）
### 3.2 Character Page（角色详情页）

**URL**: `/characters/{slug}` 示例：`/characters/kafka`

**内容结构**:
- Character Overview（角色概述: Rarity/Element/Path/Release）
- Skills Breakdown（5 技能详解）
- Traces & Eidolons（行迹 + 星魂）
- Ascension & Trace Materials（养成材料）
- Best Builds Link（链接至 Build 页）
- Strengths（优势）
- Weaknesses（劣势）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**字数要求**: ≥ 1200 词

### 3.3 Build Guide Page（Build 推荐页）

**URL**: `/builds/{slug}-{variant}-build` 示例：
- `/builds/kafka-general-build`
- `/builds/kafka-f2p-build`
- `/builds/kafka-premium-build`

**内容结构**:
- Build Overview（Build 类型说明）
- Recommended Light Cones（光锥推荐，含 Best/Alternative/F2P）
- Recommended Relics & Planars（遗器 + 位面饰品）
- Recommended Stats（主属性 / 副属性优先级）
- Team Compositions（配队推荐，1~3 队）
- Synergy Notes（核心机制/阈值要求）
- Pull Recommendation（抽取建议）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**Build Variant 类型**:
| 变体 | 说明 | 示例 |
|------|------|------|
| `general` | 通用推荐 | 适合大多数玩家 |
| `f2p` | 免费玩家 | 无限定光锥 / 低星魂 |
| `premium` | 高配 | BIS 光锥 + 关键星魂 |

> 部分角色可能有角色特定变体（如 Firefly: `break` / `speed` / `f2p`）

**字数要求**: ≥ 1200 词

### 3.4 Team Guide Page（队伍指南页）

**URL**: `/teams/{slug}-team` 示例：`/teams/kafka-dot-team`

**内容结构**:
- Team Overview（队伍类型: Hypercarry/DoT/FollowUp/Break 等）
- Team Members（成员 + 角色定位 + 替代角色）
- Rotation（输出循环详解）
- Synergy & Mechanics（核心互动机制）
- Advantages（优势）
- Weaknesses（劣势/克制 Boss）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**字数要求**: ≥ 1200 词


### 3.5 Pull Advice Page（抽取建议独立页）

**URL**: /pull-advice/{slug} 示例：/pull-advice/kafka

**定位**: 独立的抽取建议页，从 Build 页中独立出来，作为独立 SEO 页面。

**内容结构**:
- Pull Recommendation（Must Pull / Worth Pulling / Situational / Skip）
- Value Analysis（当前环境价值评估）
- Investment Priority（养成优先级，含 E0~E6 建议）
- Best Teammates（最佳配队角色）
- Alternative Characters（替代角色对比）
- Banner History & Prediction（历史/未来卡池预测）
- FAQ（8~15 个）

> 搜索意图："{character} worth pulling" "Should I pull {character}" "Is {character} good"

**字数要求**: ≥ 1200 词

### 3.6 Comparison Page（对比页）

**URL**: /compare/{slug1}-vs-{slug2} 示例：/compare/acheron-vs-kafka

**定位**: Programmatic SEO 主战场。通过热门组合批量生成对比页，覆盖大量长尾搜索词。

**内容结构**:
- Comparison Overview（对比目的: 同为 DPS/Support?）
- Side-by-Side Stats（关键属性并排对比表）
- Kit Comparison（技能机制对比）
- Team Flexibility（配队灵活性对比）
- Investment Cost（养成成本对比）
- Pull Priority（抽取优先级建议）
- TL;DR Verdict（一句话结论）
- FAQ（8~15 个）

> 搜索意图："{char1} vs {char2}" "Best between {char1} and {char2}" "{cone1} vs {cone2}"

**字数要求**: ≥ 1500 词

### 3.7 LightCone Page（光锥详情页）


**URL**: `/lightcones/{slug}`

**内容结构**:
- Overview（基础属性: HP/ATK/DEF / Rarity / Path）
- Effect & Superimpositions（效果 + 叠影级别表）
- Best Characters（最适合角色，带说明）
- Alternative Options（替代光锥）
- Source（获取途径）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**字数要求**: ≥ 800 词

### 3.8 Relic Page（遗器详情页）

**URL**: `/relics/{slug}`

**内容结构**:
- Overview（稀有度 / Set Type: Cavern or Planar）
- Set Effects（2 件套 + 4 件套效果详解）
- Best Characters（最适合角色）
- Recommended Stats（推荐主副属性）
- Source / Farming Location（获取位置）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**字数要求**: ≥ 800 词

### 3.9 Material Page（材料详情页）

**URL**: `/materials/{slug}` 示例：`/materials/dream-collection-component`

**内容结构**:
- Description（材料概述 + 稀有度）
- Usage（Used by 角色列表 / Used For 光锥列表）
- Farming Locations（掉落位置列表）
- Best Farming Route（最优刷取路线）
- Daily Farming Tips（每日推荐刷取量 + 技巧）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

> 重点搜索词: "How to Farm {material}" "Best Farming Route {material}"

**字数要求**: ≥ 800 词

### 3.10 Tier List Page（强度榜 — 6 分榜）

**主榜 URL**: `/tier-list`
**分榜 URL**: `/tier-list/{role}` (dps / support / sustain / break / f2p)

**内容结构**:
- Tier Explanation（S+ ~ C 各等级说明）
- Tier Table（本次版号的完整排行）
- Character Cards（每个角色的简要说明）
- Meta Analysis（当前环境分析）
- Update Log（历次更新记录）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**分榜维度**:
| 分榜 | URL | 搜索意图 |
|------|-----|---------|
| DPS | `/tier-list/dps` | "Best DPS HSR" |
| Support | `/tier-list/support` | "Best Support HSR" |
| Sustain | `/tier-list/sustain` | "Best Healer/Shielder HSR" |
| Break | `/tier-list/break` | "Best Break Character HSR" |
| F2P | `/tier-list/f2p` | "Best F2P Characters HSR" |

**字数要求**: ≥ 1500 词

### 3.9 Banner Page（卡池页）

**URL**: `/banners/{version}-phase{1|2}` 示例：`/banners/3-4-phase1`

**内容结构**:
- Banner Overview（版号 + Phase + 起止时间）
- Featured Characters（UP 角色 + 评级）
- Featured Light Cones（UP 光锥 + 评级）
- 4-Star Rate-Ups（四星陪跑）
- Pull Recommendation（抽取建议: Must Pull / Worth / Skip）
- Rerun Prediction（复刻预测）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

> 搜索意图: "HSR 3.4 banner" "HSR next banner" "HSR rerun schedule"

**字数要求**: ≥ 1000 词

### 3.10 Event Page（事件页）

**URL**: `/events/{slug}` 示例：`/events/garden-of-plenty`

**内容结构**:
- Event Overview（事件类型: DoubleDrop / Combat / Story）
- Duration（起止时间）
- Rewards（奖励总览）
- Best Farming Strategy（最优参与策略）
- FAQ（8~15 个，每个FAQ = 一个长尾关键词）

**字数要求**: ≥ 800 词

### 3.11 Banner Page（卡池页）

**URL**: /banners/{version}-phase{1|2} 示例：/banners/3-4-phase1

**内容结构**:
- Banner Overview（版号 + Phase + 持续期间）
- Featured Characters（UP 角色列表）
- Featured Light Cones（UP 光锥列表）
- Pull Recommendation（抽取建议）
- Banner History（历史 Banner 记录）
- FAQ（8~15 个）

> 搜索意图："HSR 3.4 banner" "HSR current banner" "HSR next banner"

**字数要求**: ≥ 1000 词
### 3.12 Guides Pages（攻略体系 — 4 分类）

> **Guide 不再是一个垃圾桶栏目。** 按搜索意图拆分为 4 个独立分类。

#### 3.12.1 Farming Guides（养成/刷取攻略）

**URL**: /guides/farming/{slug} 示例：/guides/farming/best-calyx-to-farm

**内容结构**:
- Overview（刷取目标说明）
- Best Farming Route（最优路线）
- Daily Farming Tips（每日体力规划）
- Efficiency Comparison（效率对比）
- FAQ（8~15 个）

> 搜索意图："Best Calyx to Farm HSR" "How to farm material" "HSR farming guide"

**字数要求**: ≥ 1200 词

#### 3.12.2 Banner Guides（卡池攻略）

**URL**: /guides/banners/{slug} 示例：/guides/banners/pull-priority-3-4

**内容结构**:
- Banner Analysis（当期卡池分析）
- Pull Priority（抽取优先级排序）
- Investment Guide（养成成本估算）
- Future Banner Prediction（未来卡池预测）
- FAQ（8~15 个）

> 搜索意图："HSR 3.4 banner guide" "Should I pull" "Pull priority HSR"

**字数要求**: ≥ 1200 词

#### 3.12.3 Event Guides（事件攻略）

**URL**: /guides/events/{slug} 示例：/guides/events/garden-of-plenty-guide

**内容结构**:
- Event Overview（事件概述 + 奖励）
- Best Strategy（最优策略）
- Team Recommendations（推荐队伍）
- Reward Breakdown（奖励拆解）
- FAQ（8~15 个）

> 搜索意图："{event} guide HSR" "How to complete {event}"

**字数要求**: ≥ 1000 词

#### 3.12.4 Beginner Guides（新手攻略）

**URL**: /guides/beginners/{slug} 示例：/guides/beginners/starter-guide-2026

**内容结构**:
- Getting Started（新手入门）
- First Week Priorities（首周优先级）
- Best Beginner Characters（最佳新手角色）
- Common Mistakes（常见错误）
- FAQ（8~15 个）

> 搜索意图："HSR beginner guide" "HSR new player tips" "HSR starter guide 2026"

**字数要求**: ≥ 1500 词
### 3.13 Event Page（事件页）

**URL**: /events/{slug} 示例：/events/garden-of-plenty

**内容结构**:
- Event Overview（事件概述 + 开放时间）
- Event Rewards（奖励列表）
- Best Strategy（最优策略）
- Team Recommendations（推荐队伍）
- FAQ（8~15 个）

> 搜索意图："{event} HSR" "HSR current events" "HSR event guide"

**字数要求**: ≥ 1000 词


### 3.14 Version Page（版本文本页）

**URL**: /versions/{version} 示例：/versions/3-4

**内容结构**:
- Version Overview（版号 + 发布时间）
- New Characters（新增角色）
- New Light Cones（新增光锥）
- New Events（新增事件）
- Banner Schedule（卡池排期）
- Patch Notes Highlights（更新要点）
- FAQ（8~15 个）

> 搜索意图："HSR 3.4 update" "HSR 3.4 patch notes" "HSR 3.4 characters"

**字数要求**: ≥ 1000 词

---

## 4. 全局 SEO 模板

### 4.1 Meta 标签模板

```html
<title>{Page Title} | GameBeliever</title>
<meta name="description" content="{Meta Description 120~160 chars}">
<meta property="og:title" content="{OG Title}">
<meta property="og:description" content="{OG Description}">
<meta property="og:image" content="{OG Image URL}">
<meta property="og:url" content="{Canonical URL}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="{Canonical URL}">
```

### 4.2 Structured Data（JSON-LD）

每个内容页嵌入 FAQPage 结构化数据：

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{Most Searched Question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{Concise Answer}"
      }
    }
  ]
}
```

Banner/Event 页面额外嵌入 Event Schema：
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "{Event Name}",
  "startDate": "{ISO8601}",
  "endDate": "{ISO8601}",
  "description": "{Event Description}"
}
```

---

## 5. Astro 页面路由规划（V2.0）

### 5.1 动态路由

```
src/pages/
├── index.astro                             → /
├── about.astro                             → /about
├── characters/
│   ├── [slug].astro                        → /characters/{slug}
│   └── [slug]/builds.astro                 → /characters/{slug}/builds
├── builds/
│   └── [slug].astro                        → /builds/{slug}-{variant}-build
├── teams/
│   └── [slug].astro                        → /teams/{slug}
├── lightcones/
│   └── [slug].astro                        → /lightcones/{slug}
├── relics/
│   └── [slug].astro                        → /relics/{slug}
├── materials/
│   └── [slug].astro                        → /materials/{slug}
├── tier-list/
│   ├── index.astro                         → /tier-list
│   └── [role].astro                        → /tier-list/{role}
├── banners/
│   └── [version]-phase[phase].astro        → /banners/{version}-phase{1|2}
├── events/
│   └── [slug].astro                        → /events/{slug}
├── versions/
│   └── [version].astro                     → /versions/{version}
└── guides/
    └── [slug].astro                        → /guides/{slug}
```

### 5.2 静态生成

在 `getStaticPaths()` 中从 JSON 数据文件读取所有 slug / variant 并生成全部页面。

---

## 6. 内容质量标准（V2.0 更新）

| 维度 | V1.0 | V2.0 |
|------|------|------|
| 语言 | English（美式拼写） | 不变 |
| 字数 | Char/Build/Team ≥ 1200，其余 ≥ 800 | Tier/Guide/Home ≥ 1500，Banner/Version ≥ 1000，其余不变 |
| 标题层级 | H1 × 1 + H2 × N | 不变 |
| FAQ | 3~5 个/页 | 不变（Banner/Event 偏重时效性 FAQ） |
| Meta Description | 120~160 字符 | 不变 |
| Internal Link | ≥ 3 个/页 | **≥ 5 个/页** |
| Image Alt | 所有图片含 alt | 不变 |
| Structured Data | FAQPage | FAQPage + Event(Banner/Event页面) |
| Version Tag | — | **所有页标注适用版号** |

---

## 7. 内容生产映射（1 角色 → N 页面）

```
一个角色 JSON（6 数据文件）
    ↓
┌──────────────────────────────────────┐
│ 1. Character Page   → /characters/{slug}                     │
│ 2. General Build    → /builds/{slug}-general-build            │
│ 3. F2P Build        → /builds/{slug}-f2p-build                │
│ 4. Premium Build    → /builds/{slug}-premium-build             │
│ 5. Team Guide       → /teams/{related-team-slug}               │
│ 6. Light Cone Guide → /lightcones/{best-cone-slug}             │
│ 7. Relic Guide      → /relics/{best-relic-slug}                │
│ 8. Material Guide   → /materials/{ascension-material-slug}     │
└──────────────────────────────────────┘

1 角色 ⇒ 至少 9 篇内容 ⇒ 最多 12 个 SEO 页面（含交叉链接）
60 角色 ⇒ 540+ 页面（仅角色衍生页）
```

配合 100 LightCone + 40 Relic + 80 Material + 6 Tier List + ~24 Banner/Event/Version + 16 Guides + 30 Comparison + 3 Other，

**第一阶段总页面量: 1000+ 页。**

---


---

## 8. 内部链接矩阵（Internal Link Matrix）

> **这是 SEO 的飞轮。** Google 通过内部链接密度和结构判断页面重要性。

### 8.1 矩阵规则

| 当前页面类型 | 自动链接至 | 搜索锚文本 |
|------------|-----------|-----------|
| **Character Page** | Build (General+F2P+Premium) | Best Builds for char |
| | Pull Advice | Should You Pull char? |
| | Best Light Cones | Best Light Cones for char |
| | Best Relics | Best Relics for char |
| | Materials | Ascension Materials for char |
| | Teams | Best Teams with char |
| | Tier List | char Tier Ranking |
| **Build Page** | Character Page | char Overview |
| | Pull Advice | Is char Worth Pulling? |
| | Best Light Cone | Best Light Cone for char |
| | Best Relic | Best Relic for char |
| | Team | Best Team for char |
| **Pull Advice** | Character Page | char Overview |
| | Build Pages | Best Builds for char |
| | Comparison | char vs alternative |
| **Comparison** | Character Pages | char1 vs char2 Overview |
| | Pull Advice | Should You Pull? |
| **Team Page** | 成员 Character Page | member Overview |
| | 成员 Build | member Build |
| **Material Page** | 使用该材料的角色 | char Overview |
| | Farming Guide | How to Farm material |
| **Tier List** | Top N Character+Build | char Overview/Build |

### 8.2 循环效应

`
Character Page
    ↓
Build Page → Pull Advice → Comparison → Tier List
    ↓          ↓              ↓               ↓
Team ←── Relic ←── Light Cone ←── Material ←── Guide
    ↓                                            ↓
    └──────────── 回到 Character ─────────────────┘
`

**效果**: 从任意页面入口，爬虫可在 3 跳内抵达 80% 以上页面。

### 8.3 实现方式

Astro 组件 InternalLinks.astro 接收当前页面类型+关联数据，自动渲染 5~8 个上下文内部链接。

---

> **文档版本**：V3.0
> **上一版本**：V2.0（2026-06-12）
> **更新日期**：2026-06-12
> **变更内容（V2.0→V3.0）**：
> - URL 路由从 12 扩展至 15（新增 Pull Advice / Comparison / Guides 4分类）
> - 首页重新设计：从门户改为内容聚合器，移除搜索框
> - Tier List 从 5 分榜扩展至 6 分榜（新增 Beginner）
> - Guide 从扁平拆分为 4 分类（farming/banners/events/beginners）
> - 新增 Pull Advice 独立页 + Comparison 对比页模板
> - FAQ 从 3~5 个/页 提升至 8~15 个/页（每个 FAQ = 一个长尾关键词）
> - 新增「内部链接矩阵」设计章节（自动生成链接，形成抓取闭环）
> - 内容生产映射升级为「1 角色→9+ 页」+ 交叉组合
> - 第一阶段页面目标从 480~520 提升至 1000+
> - 移除 V1 搜索功能（延至 1000+ 页面后上）"