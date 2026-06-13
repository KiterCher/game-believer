# GameBeliever 关键词库设计文档（V1.0）

---

## 1. 设计目的

> 这不是一份 SEO 报告。这是 **AI 内容生产的输入源**。
> 每个 Prompt 必须读取对应关键词文件，确保生成内容覆盖目标关键词。

## 2. 使用方式

- 每个角色一个 `{slug}-keywords.json`，存放于 `src/data/keywords/`
- AI Prompt 强制包含 mainKeyword + 至少 5 个 secondaryKeywords
- FAQ 从 longTailFAQs 扩展生成 8~15 个
- 月更新周期：版本更新后重新审查关键词

## 3. 关键词分级

| 等级 | 月搜索量 | 说明 | 策略 |
|------|---------|------|------|
| S | 10,000+ | 头部流量词 | 首页/Tier List 页覆盖 |
| A | 1,000~10,000 | 角色/Build 核心词 | 角色页 + Build 页标题必含 |
| B | 100~1,000 | 长尾蓝海词 | FAQ 逐条覆盖 |
| C | <100 | 超长尾/新兴词 | Comparison + Guides 覆盖 |

> **⚠️ Volume/difficulty 数据为 AI 估算（基于 SEMrush/Ahrefs 公开趋势），非精确值。** 
> **真正决策依据是未来 3 个月 Google Search Console 真实数据。** 本表仅用于内容优先级排序，不用于流量预测。

## 4. 关键词总库（~500 词）

### 4.1 S 级：头部词（6 个）

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| honkai star rail builds | 22,000 | High | informational | homepage | S |
| hsr tier list | 18,000 | High | informational | tier-list | S |
| honkai star rail characters | 15,000 | High | informational | characters/index | S |
| best hsr characters | 12,000 | High | commercial | tier-list | S |
| hsr next banner | 10,000 | Medium | informational | banners | S |
| hsr current banner | 10,000 | Medium | informational | banners | S |

### 4.2 A 级：角色 Build 核心词（~120 个）

#### Top 20 角色 × 6 核心关键词 = 120 词

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| kafka build | 5,400 | Medium | commercial | build | A1 |
| acheron build | 4,800 | Medium | commercial | build | A1 |
| firefly build | 4,200 | Medium | commercial | build | A1 |
| robin build | 3,600 | Medium | commercial | build | A1 |
| aventurine build | 3,200 | Medium | commercial | build | A1 |
| ruan mei build | 3,000 | Medium | commercial | build | A1 |
| black swan build | 2,800 | Medium | commercial | build | A1 |
| jingliu build | 2,600 | Medium | commercial | build | A1 |
| imbibitor lunae build | 2,400 | Medium | commercial | build | A1 |
| sparkle build | 2,200 | Medium | commercial | build | A1 |
| best kafka build | 2,000 | Medium | commercial | build | A1 |
| best acheron build | 1,800 | Medium | commercial | build | A1 |
| best firefly build | 1,600 | Medium | commercial | build | A1 |

| kafka team | 3,600 | Medium | informational | team | A2 |
| acheron team | 3,200 | Medium | informational | team | A2 |
| firefly team | 3,000 | Medium | informational | team | A2 |
| robin team | 2,600 | Medium | informational | team | A2 |
| best kafka team | 2,400 | Medium | informational | team | A2 |
| best acheron team | 2,200 | Medium | informational | team | A2 |
| kafka relics | 2,800 | Medium | commercial | relic | A2 |
| acheron relics | 2,400 | Medium | commercial | relic | A2 |
| firefly relics | 2,200 | Medium | commercial | relic | A2 |
| kafka light cone | 3,200 | Medium | commercial | lightcone | A2 |
| acheron light cone | 2,800 | Medium | commercial | lightcone | A2 |
| firefly light cone | 2,400 | Medium | commercial | lightcone | A2 |
| is kafka worth pulling | 1,800 | Low | commercial | pull-advice | A2 |
| is acheron worth pulling | 1,600 | Low | commercial | pull-advice | A2 |
| is firefly worth pulling | 1,400 | Low | commercial | pull-advice | A2 |
| kafka f2p build | 1,500 | Low | commercial | build | A2 |
| acheron f2p build | 1,300 | Low | commercial | build | A2 |

### 4.3 A 级：Tier List 核心词（~24 个）

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| best dps hsr | 4,500 | Medium | commercial | tier-list/dps | A3 |
| best support hsr | 3,800 | Medium | commercial | tier-list/support | A3 |
| best sustain hsr | 2,800 | Medium | commercial | tier-list/sustain | A3 |
| best break dps hsr | 2,200 | Medium | commercial | tier-list/break | A3 |
| hsr dps tier list | 3,500 | Medium | informational | tier-list/dps | A3 |
| hsr support tier list | 2,500 | Medium | informational | tier-list/support | A3 |
| best f2p characters hsr | 2,000 | Low | informational | tier-list/f2p | A3 |
| hsr beginner tier list | 1,500 | Low | informational | tier-list/beginner | A3 |

### 4.4 A 级：Banner/Version 核心词（~16 个）

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| hsr 3.4 banner | 3,500 | Medium | informational | banners | A4 |
| hsr 3.5 banner | 2,500 | Medium | informational | banners | A4 |
| hsr upcoming banners | 2,000 | Medium | informational | banners | A4 |
| hsr banner schedule | 1,800 | Medium | informational | banners | A4 |
| hsr rerun schedule | 2,200 | Medium | informational | banners | A4 |
| hsr 3.4 update | 1,600 | Medium | informational | versions | A4 |
| hsr 3.4 patch notes | 1,400 | Medium | informational | versions | A4 |
| hsr 3.4 characters | 1,200 | Medium | informational | versions | A4 |

### 4.5 B 级：长尾 FAQ 词（~150 个）

#### 角色 FAQ 类 × 60 角色 = 至少 120 词

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| how to build kafka hsr | 900 | Low | informational | character | B1 |
| kafka best team without black swan | 500 | Low | informational | team | B1 |
| what relic set for kafka | 700 | Low | informational | relic | B1 |
| kafka speed requirements | 400 | Low | informational | build | B1 |
| kafka e0 vs e1 | 300 | Low | commercial | pull-advice | B1 |

| acheron vs kafka | 1,200 | Low | commercial | compare | B1 |
| firefly vs acheron | 1,000 | Low | commercial | compare | B1 |
| kafka f2p light cone | 600 | Low | commercial | lightcone | B1 |
| acheron best planar ornaments | 500 | Low | informational | relic | B1 |
| kafka team without ruan mei | 400 | Low | informational | team | B1 |

#### 材料/养成类（~30 个）

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| how to farm dream collection component | 600 | Low | informational | material | B2 |
| best calyx to farm hsr | 500 | Low | informational | guides/farming | B2 |
| hsr ascension materials list | 400 | Low | informational | material | B2 |
| hsr trace materials farming | 350 | Low | informational | material | B2 |
| where to find shape shifters lightning staff | 300 | Low | navigational | material | B2 |
| hsr stellar jade farming | 400 | Low | informational | guides/farming | B2 |
| best farming route hsr | 300 | Low | informational | guides/farming | B2 |

#### 通用攻略类（~20 个）

| keyword | volume | difficulty | intent | page_type | priority |
|---------|--------|-----------|--------|-----------|----------|
| hsr beginner guide 2026 | 800 | Low | informational | guides/beginners | B3 |
| hsr new player tips | 600 | Low | informational | guides/beginners | B3 |
| hsr best teams for beginners | 500 | Low | informational | guides/beginners | B3 |
| hsr relic farming guide | 400 | Low | informational | guides/farming | B3 |
| hsr how to get stellar jade fast | 700 | Low | informational | guides/farming | B3 |
| hsr should i pull guide | 600 | Low | commercial | pull-advice | B3 |
| hsr returning player guide 2026 | 300 | Low | informational | guides/beginners | B3 |

### 4.6 C 级：超长尾/新兴词（~180 个 — 由 AI 自动从长尾 FAQ 生成）

> 以下为代表性样本。实际 C 级关键词由 AI Prompt 从每个角色的 longTailFAQs 数组中自动展开。

| keyword 类型 | 模板 | 预估量 | page_type | priority |
|-------------|------|--------|-----------|----------|
| 角色 × 遗器组合 | `{char} {relic_set} build` | ~50 | build | C |
| 角色 × 光锥对比 | `{char} {cone1} vs {cone2}` | ~40 | compare | C |
| 星魂建议 | `{char} eidolon priority` | ~30 | pull-advice | C |
| 速度阈值 | `{char} speed breakpoint` | ~20 | build | C |
| 配队变体 | `{char} {teammate} team no {support}` | ~40 | team | C |

---

## 5. 关键词 → 页面映射

| 页面类型 | 目标关键词数 | 核心覆盖方式 |
|---------|------------|------------|
| Homepage | 6 (S 级) | H1 + Meta + H2 |
| Character Page | 每个角色 5~8 词 | H1 含 mainKeyword，H2 含 secondary |
| Build Page | 每个 Build 6~10 词 | H1 含 `{char} {variant} build` |
| Pull Advice | 每个角色 4~6 词 | H1 含 `Is {char} worth pulling` |
| Team Page | 每队 4~6 词 | H1 含 `{char} team` |
| Tier List | 每个分榜 6~8 词 | H1 含 `Best {role} HSR` |
| Banner Page | 每版号 4~6 词 | H1 含 `HSR {ver} banner` |
| Comparison | 每对比 3~5 词 | H1 含 `{char1} vs {char2}` |
| Material Page | 每材料 3~5 词 | H1 含 `How to farm {material}` |

---

## 6. AI Prompt 集成方式

```
1. Prompt 读取 src/data/keywords/{slug}-keywords.json
2. 强制要求：
   - H1 必须包含 mainKeyword
   - 至少 3 个 H2 包含 secondaryKeywords 中的词
   - FAQ 从 longTailFAQs 扩展生成
3. QA Agent 检查关键词覆盖率
   - mainKeyword 在正文中出现 ≥ 3 次 → 通过
   - secondaryKeywords 覆盖率 ≥ 60% → 通过
```

---

## 7. 维护周期

| 触发条件 | 动作 | 频率 |
|---------|------|------|
| 新角色上线 | 新增关键词文件，填充 mainKeyword + secondaryKeywords + longTailFAQs | 每次 |
| 版号更新 | 更新 Banner/Version 关键词 | 每 6 周 |
| 月度 SEO 审查 | 审查 GSC Top Query，补充未覆盖关键词 | 每月 |
| 季度大审查 | 全量关键词重新评估 volume + difficulty | 每季度 |

---

## 8. 关键词总数统计

| 等级 | 数量 |
|------|------|
| S 级 | 6 |
| A 级（Build/Team/Relic/LC/Pull） | 140+ |
| A 级（Tier List） | 24 |
| A 级（Banner/Version） | 16 |
| B 级（FAQ 长尾） | 150+ |
| B 级（材料/养成） | 30 |
| B 级（通用攻略） | 20 |
| C 级（AI 自动生成） | 180+ |
| **总计** | **~566** |

---

> **文档版本**：V1.1
> **创建日期**：2026-06-12
> **变更**：添加 GSC 真实数据来源声明
> **说明**：Volume 数据基于 SEMrush/Ahrefs 估算，实际以 GSC 为准。C 级关键词由 AI 自动扩展，无需人工维护。
