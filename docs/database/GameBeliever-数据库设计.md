# GameBeliever 第一阶段 数据模型设计（V2.0 — 内容生产系统思维）

---

## 设计哲学

> **这不是数据库设计，这是内容生产系统设计。**

V1 阶段唯一目标：**一个数据源 → 自动生成多篇 SEO 页面 → 构成流量资产矩阵。**

### 核心原则

| 原则 | 说明 |
|------|------|
| **数据与内容分离** | JSON 数据（事实源）与 Markdown 内容（AI 生成产物）物理隔离，版本更新时只需改 JSON → 重新生成 |
| **文件级拆分** | 不发生一个 `kafka.json` 包含一切——按职责拆文件，降低单文件体积，减少 AI 上下文开销 |
| **1 个数据源 → N 篇内容** | 每个角色至少产出 8 篇文章，每个版本至少产出 3 篇版本内容 |
| **JSON 即 Schema** | 无后端、无 DB、无 ORM——JSON 文件即数据层，Astro 直接 `import` |

### 技术约束

```
无 MySQL / 无 PostgreSQL / 无 Redis / 无 ES / 无 ORM
```

数据层 = `src/data/` 下的结构化 JSON 文件。

---

## 1. Character（角色）— 拆分为核心 + 技能 + 材料

### 设计决定

原 V1 将 skills / traces / eidolons / statProgression / ascensionMaterials 全部塞入一个 `kafka.json`。

**问题**：文件越来越大，版本更新（技能调整 / eidolon 改版）时需要替换整个文件。

**方案**：拆分为 3 层文件。

### 1.1 Character Core（角色核心信息）

```
src/data/characters/{slug}.json
```

```json
{
  "id": "kafka",
  "name": "Kafka",
  "slug": "kafka",
  "rarity": 5,
  "element": "Lightning",
  "path": "Nihility",
  "releaseVersion": "1.2",
  "avatar": "/images/characters/kafka.webp",
  "description": "A member of the Stellaron Hunters. A dashing, collected, and professional beauty. Used the enchantment of Spirit Whisper to set up a stage for the Trailblazer.",
  "tags": ["DoT", "Debuffer", "FollowUp"],
  "role": "MainDPS",
  "damageType": "DoT"
}
```

### 1.2 Character Skills（技能）

```
src/data/characters/{slug}-skills.json
```

```json
{
  "characterId": "kafka",
  "basicAttack": {
    "name": "Midnight Tumult",
    "type": "SingleTarget",
    "description": "Deals Lightning DMG equal to 100% of Kafka's ATK to a single enemy."
  },
  "skill": {
    "name": "Caressing Moonlight",
    "type": "Blast",
    "description": "Deals Lightning DMG equal to 160% of Kafka's ATK to a single enemy and 60% to adjacent targets. If the target is currently receiving DoT, all DoT effects placed on that enemy immediately produce DMG equal to 75% of their original DMG."
  },
  "ultimate": {
    "name": "Twilight Trill",
    "type": "AoE",
    "energyCost": 120,
    "description": "Deals Lightning DMG equal to 80% of Kafka's ATK to all enemies..."
  },
  "talent": {
    "name": "Gentle But Cruel",
    "description": "After an ally uses Basic ATK on an enemy that is receiving DoT, Kafka immediately launches a follow-up attack..."
  },
  "technique": {
    "name": "Mercy Is Not Forgiveness",
    "description": "Immediately attacks all enemies within a set range..."
  }
}
```

### 1.3 Character Traces & Eidolons（行迹 & 星魂）

```
src/data/characters/{slug}-traces.json
```

```json
{
  "characterId": "kafka",
  "traces": [
    {
      "name": "Torture",
      "level": "A2",
      "description": "When the Ultimate is used, enemy targets will now receive DMG from all DoT sources..."
    },
    {
      "name": "Plunder",
      "level": "A4",
      "description": "When an enemy takes DMG from a DoT effect triggered by Kafka's Talent..."
    },
    {
      "name": "Thorns",
      "level": "A6",
      "description": "Increases the chance for Ultimate, Technique, and Talent-triggered follow-up attacks to inflict Shock by 30%."
    }
  ],
  "eidolons": [
    {
      "level": 1,
      "name": "Da Capo",
      "description": "When the Talent triggers a follow-up attack, there is a 100% base chance to increase the DoT received by the target by 30% for 2 turns."
    }
  ],
  "statBonuses": [
    { "stat": "ATK%", "value": 28 },
    { "stat": "EHR%", "value": 18 },
    { "stat": "HP%", "value": 10 }
  ]
}
```

### 1.4 Character Materials（养成材料）

```
src/data/characters/{slug}-materials.json
```

```json
{
  "characterId": "kafka",
  "ascension": [
    { "materialId": "shape-shifters-lightning-staff", "rarity": 4, "quantity": 65 },
    { "materialId": "obsidian-of-dread", "rarity": 2, "quantity": 15 },
    { "materialId": "obsidian-of-desolation", "rarity": 3, "quantity": 15 },
    { "materialId": "obsidian-of-obession", "rarity": 4, "quantity": 15 }
  ],
  "traces": [
    { "materialId": "obsidian-of-dread", "rarity": 2, "quantity": 18 },
    { "materialId": "obsidian-of-desolation", "rarity": 3, "quantity": 69 },
    { "materialId": "obsidian-of-obession", "rarity": 4, "quantity": 139 },
    { "materialId": "regret-of-infinite-ochema", "rarity": 5, "quantity": 12 }
  ]
}
```

### 1.5 Character Stat Progression（属性成长，可选）

```
src/data/characters/{slug}-stats.json
```

```json
{
  "characterId": "kafka",
  "level80": { "hp": 1086, "atk": 679, "def": 485, "speed": 100, "taunt": 100 },
  "level1": { "hp": 147, "atk": 92, "def": 66, "speed": 100, "taunt": 100 }
}
```

### 1.6 Character 目录最终结构

```
src/data/characters/
├── kafka.json               ← 核心信息
├── kafka-skills.json        ← 技能
├── kafka-traces.json        ← 行迹 & 星魂
├── kafka-materials.json     ← 养成材料
├── kafka-stats.json         ← 属性成长（可选）
├── firefly.json
├── firefly-skills.json
├── ...
```

### 1.7 数据量

| 项目 | 数量 |
|------|------|
| 5⭐ 角色 | ~30 |
| 4⭐ 角色 | ~30 |
| **角色核心文件** | **~60** |
| **角色技能文件** | **~60** |
| **角色行迹文件** | **~60** |
| **角色材料文件** | **~60** |
| **合计约** | **~240 文件** |

---

## 2. Light Cone（光锥）

### 2.1 JSON Schema

```
src/data/lightcones/{slug}.json
```

```json
{
  "id": "patience-is-all-you-need",
  "name": "Patience Is All You Need",
  "slug": "patience-is-all-you-need",
  "rarity": 5,
  "path": "Nihility",
  "baseStats": { "hp": 1058, "atk": 582, "def": 463 },
  "effect": {
    "name": "Spider Web",
    "description": "Increases DMG dealt by the wearer by 24%. After the wearer uses an attack, their SPD increases by 4.8%, stacking up to 3 times."
  },
  "superimpositions": [
    { "level": 1, "description": "DMG +24%, SPD per stack 4.8%" },
    { "level": 5, "description": "DMG +40%, SPD per stack 8.0%" }
  ],
  "description": "The way of the spider is patience. The spider does not chase—it waits.",
  "source": "Stellar Warp / Limited Warp (Kafka Banner)",
  "bestFor": ["kafka", "black-swan", "guinaifen"]
}
```

### 2.2 数据量

| 类别 | 数量 |
|------|------|
| 5⭐ 光锥 | ~30 |
| 4⭐ 光锥 | ~40 |
| 3⭐ 光锥 | ~30 |
| **合计** | **~100** |

---

## 3. Relic（遗器）

### 3.1 JSON Schema

```
src/data/relics/{slug}.json
```

```json
{
  "id": "prisoner-in-deep-confinement",
  "name": "Prisoner in Deep Confinement",
  "slug": "prisoner-in-deep-confinement",
  "rarity": 5,
  "setType": "CavernRelic",
  "pieces": ["Head", "Hands", "Body", "Feet"],
  "effect2": "ATK increases by 12%.",
  "effect4": "For every DoT effect the target enemy is suffering, the wearer will ignore 6% of the target's DEF when dealing DMG to them. This effect is valid for a maximum of 3 DoT effects.",
  "description": "A relic set tailored for DoT-focused damage dealers, maximizing DEF ignore per active DoT.",
  "source": "Cavern of Corrosion: Path of Darkness (Xianzhou Luofu)",
  "bestFor": ["kafka", "black-swan", "guinaifen", "serval"],
  "recommendedStats": {
    "body": ["ATK%", "CRIT Rate"],
    "feet": ["ATK%", "SPD"],
    "sphere": ["Lightning DMG%", "ATK%"],
    "rope": ["ATK%"],
    "substats": ["ATK%", "SPD", "EHR"]
  }
}
```

### 3.2 数据量

| 类别 | 数量 |
|------|------|
| 隧洞遗器 | ~25 |
| 位面饰品 | ~15 |
| **合计** | **~40** |

---

## 4. Material（材料）— SEO 增强版

### 4.1 JSON Schema

```
src/data/materials/{slug}.json
```

```json
{
  "id": "dream-collection-component",
  "name": "Dream Collection Component",
  "slug": "dream-collection-component",
  "type": "CommonEnemy",
  "rarity": 2,
  "description": "A component collected from the Dreamscape. Used for character ascension and trace leveling.",
  "source": ["Memory Zone Memes", "Dreamjolt Troupe", "Penacony overworld enemies"],
  "farmingLocation": {
    "bestMap": "Dream's Edge",
    "alternativeMaps": ["Reverie Hotel", "Golden Hour"],
    "calyx": "Bud of Memories (Penacony)"
  },
  "farmingTips": "Run a loop around Dream's Edge starting from the northern Space Anchor. Each run yields ~15-20 drops. Recommended to farm with a fast AoE team (Jingliu or Acheron). Time per run: ~90 seconds.",
  "dropLocations": [
    { "map": "Dream's Edge", "enemies": ["Memory Zone Meme x8", "Dreamjolt Troupe x5"], "quantity": "15-20 per run" },
    { "map": "Reverie Hotel", "enemies": ["Memory Zone Meme x6"], "quantity": "10-15 per run" }
  ],
  "recommendedDailyAmount": "40-60 pieces (approximately 3-4 runs on Dream's Edge)",
  "usedBy": ["robin", "sparkle", "black-swan"],
  "usedFor": ["but-the-battle-isnt-over", "earthly-escapade"]
}
```

### 4.2 新增字段说明

| 字段 | 目的 | SEO 关键词 |
|------|------|-----------|
| `farmingTips` | 提供具体刷取建议 | "How to farm X" "X farming guide" |
| `dropLocations[].map` | 精确掉落地图 | "X location" "where to find X" |
| `dropLocations[].enemies` | 掉落怪物列表 | "what enemies drop X" |
| `dropLocations[].quantity` | 单次掉落量 | "how many X per run" |
| `recommendedDailyAmount` | 建议每日刷取量 | "daily farming X" |

### 4.3 数据量

| 类别 | 数量 |
|------|------|
| 晋级材料（Boss Drop） | ~15 |
| 行迹材料 | ~20 |
| 通用怪物掉落 | ~15 |
| 周本掉落 | ~10 |
| 经验材料 | ~5 |
| **合计** | **~65** |

---

## 5. Team（队伍）

### 5.1 JSON Schema

```
src/data/teams/{slug}.json
```

```json
{
  "id": "kafka-dot-premium",
  "name": "Kafka DoT Premium Team",
  "slug": "kafka-dot-premium",
  "type": "DoT",
  "tierRating": "S",
  "members": [
    { "characterId": "kafka", "role": "MainDPS", "alternatives": ["serval"] },
    { "characterId": "black-swan", "role": "SubDPS", "alternatives": ["sampo", "guinaifen"] },
    { "characterId": "ruan-mei", "role": "Support", "alternatives": ["asta", "pela"] },
    { "characterId": "huohuo", "role": "Sustain", "alternatives": ["luocha", "fu-xuan"] }
  ],
  "rotation": "Ruan Mei Skill → Black Swan Skill → Kafka Skill → Kafka Ultimate → Huohuo heal as needed. Repeat.",
  "strengths": [
    "Highest DoT ceiling in the game",
    "Excellent Blast/AoE coverage",
    "Black Swan DEF shred + Kafka detonate = exponential damage"
  ],
  "weaknesses": [
    "Expensive—requires 3 limited 5⭐ units",
    "Weak to CC-heavy enemies without cleanse",
    "Below-average single-target burst"
  ],
  "synergyNotes": "Black Swan's Arcana scales with DoT variety. Kafka detonates all DoTs simultaneously, maximizing Arcana stacks per cycle."
}
```

### 5.2 数据量

| 类别 | 数量 |
|------|------|
| 队伍配置 | **~50**（覆盖主流体系） |

---

## 6. Build（Build 推荐）— 每角色 3 套

### 6.1 设计决定

原 V1 为每角色 1 个 Build（~60 个），远不足以覆盖搜索意图。

**方案**：每个角色 **最少 3 套 Build**。

| Build 类型 | 目标用户 | SEO 关键词 |
|-----------|---------|-----------|
| **General Build** | 大众玩家 | `{character} build` `best {character} build` |
| **F2P Build** | 零氪 / 低氪玩家 | `{character} f2p build` `budget {character} build` |
| **Premium Build** | 中高氪玩家 | `{character} premium build` `{character} best team` |

部分角色根据定位增加额外 Build：

| 角色类型 | 额外 Build |
|---------|-----------|
| Break 角色（Firefly, Boothill） | Speed Build / Break Build |
| 多形态角色（Acheron） | 0-cycle Build / Sustain Build |
| Support 角色 | Support Build / SubDPS Build |

### 6.2 JSON Schema

```
src/data/builds/{characterSlug}-{buildType}.json
```

```json
{
  "id": "kafka-general",
  "characterId": "kafka",
  "buildName": "Kafka General DoT Build",
  "slug": "kafka-general",
  "buildType": "General",
  "targetAudience": "FreeToPlay | LightSpender | Dolphin | Whale",
  "summary": "The most balanced Kafka build. Focuses on ATK and SPD to maximize DoT detonation frequency and damage.",
  "recommendedLightCones": [
    { "lightConeId": "patience-is-all-you-need", "priority": "Best", "note": "Signature LC—massive SPD boost and DMG amplification" },
    { "lightConeId": "incessant-rain", "priority": "Alternative", "note": "Silver Wolf's LC—EHR and CRIT buffs for hybrid Kafka" },
    { "lightConeId": "good-night-and-sleep-well", "priority": "F2P", "note": "Best 4⭐ option—scales DMG per debuff on target" }
  ],
  "recommendedRelics": [
    { "setId": "prisoner-in-deep-confinement", "pieces": "4pc" }
  ],
  "recommendedPlanars": [
    { "setId": "firmament-frontline-glamoth", "note": "Best-in-slot for ATK scaling" },
    { "setId": "space-sealing-station", "note": "Good F2P alternative" }
  ],
  "recommendedStats": {
    "body": ["ATK%"],
    "feet": ["SPD"],
    "sphere": ["Lightning DMG%"],
    "rope": ["ATK%"],
    "substatPriority": ["SPD", "ATK%", "EHR"],
    "targetValues": { "ATK": 3500, "SPD": 134, "EHR": 28 }
  },
  "teamCompositions": ["kafka-dot-premium", "kafka-dot-f2p"],
  "pullRecommendation": "MustPull"
}
```

### 6.3 数据量

| 类别 | 数量 |
|------|------|
| 5⭐ 角色 × 3 Build | ~90 |
| 4⭐ 角色 × 3 Build | ~90 |
| **合计** | **~180** |

### 6.4 文件命名

```
src/data/builds/
├── kafka-general.json
├── kafka-f2p.json
├── kafka-premium.json
├── firefly-general.json
├── firefly-break.json
├── firefly-f2p.json
├── acheron-general.json
├── acheron-premium.json
├── acheron-0cycle.json
├── ...
```

---

## 7. Banner（卡池）— 新增

### 7.1 设计动机

搜索流量分析：

```
"HSR 3.4 banner"           →  月均搜索量高
"HSR next banner"           →  每版本更新时流量巨大
"HSR rerun schedule"        →  长期稳定搜索
"Kafka rerun when"          →  角色复刻搜索
```

### 7.2 JSON Schema

```
src/data/banners/{version}-phase{1|2}.json
```

```json
{
  "id": "banner-3.4-p1",
  "version": "3.4",
  "phase": 1,
  "type": "LimitedCharacter",
  "rateUp5Star": ["firefly"],
  "rateUp4Stars": ["guinaifen", "xueyi", "misha"],
  "lightConeBanner": {
    "rateUp5Star": "whereabouts-should-rest",
    "rateUp4Stars": ["memories-of-the-past", "resolution-shines", "day-one-of-my-new-life"]
  },
  "startDate": "2026-07-02",
  "endDate": "2026-07-23",
  "isRerun": false,
  "rerunCount": 0,
  "estimatedJades": {
    "f2p": 85,
    "battlePass": 105,
    "battlePassPlus": 130
  },
  "notes": "Firefly's second rerun. Excellent pull value for Break teams."
}
```

### 7.3 数据量

| 类别 | 数量 |
|------|------|
| 当前版本 Banner（2 phases） | **2** |
| 历史版本 Banner（追溯 6 个版本） | **~12** |
| 合计 | **~14** |

---

## 8. Version（版本信息）— 新增

### 8.1 JSON Schema

```
src/data/versions/{version}.json
```

```json
{
  "version": "3.4",
  "name": "Farewell, Penacony",
  "slug": "3.4",
  "startDate": "2026-07-02",
  "endDate": "2026-08-13",
  "durationDays": 42,
  "type": "MainStory | Interlude | Filler",
  "newCharacters": ["firefly-alt"],
  "newLightCones": ["whereabouts-should-rest"],
  "newRelics": [],
  "newMaps": ["Dreamflux Reef"],
  "events": ["garden-of-plenty", "planar-fissure"],
  "keyFeatures": [
    "Penacony epilogue chapter",
    "Firefly SP version",
    "New Divergent Universe update"
  ],
  "totalFreeJades": 12000,
  "summary": "Version 3.4 wraps up the Penacony story arc with the epilogue..."
}
```

### 8.2 数据量

| 类别 | 数量 |
|------|------|
| 当前版本 | 1 |
| 历史版本 | ~11（追溯至 2.0） |
| **合计** | **~12** |

---

## 9. Event（活动）— 新增

### 9.1 JSON Schema

```
src/data/events/{slug}.json
```

```json
{
  "id": "garden-of-plenty",
  "name": "Garden of Plenty",
  "slug": "garden-of-plenty",
  "eventType": "DoubleDrop | Combat | Exploration | Puzzle",
  "version": "3.4",
  "startDate": "2026-07-09",
  "endDate": "2026-07-16",
  "durationDays": 7,
  "description": "Double Calyx drops! Get 2x rewards from Golden and Crimson Calyxes for a limited time.",
  "rewards": ["Traveler's Guide", "Refined Aether", "Credit"],
  "requirements": "Trailblaze Level ≥ 11",
  "guide": "Spend all Trailblaze Power on Crimson Calyx (Trace materials) during this event. Skip Golden Calyx unless you're out of EXP materials.",
  "isRecurring": true,
  "recurrenceNote": "Returns approximately every 2-3 patches."
}
```

### 9.2 数据量

| 类别 | 数量 |
|------|------|
| 当前版本活动 | ~5 |
| 历史活动 | ~30 |
| **合计** | **~35** |

---

## 10. Tier List（强度榜）— 角色分榜

### 10.1 设计决定

原 V1 只有一个全局 Tier List（SS/S/A/B/C），无法命中细分搜索。

**方案**：按角色定位拆分为多个榜单。

### 10.2 JSON Schema

```
src/data/tier-lists/{role}.json
```

#### 示例：`tier-lists/dps.json`

```json
{
  "id": "tier-list-dps",
  "role": "DPS",
  "version": "3.4",
  "updatedAt": "2026-07-02T00:00:00Z",
  "tiers": {
    "SS": ["acheron", "firefly", "feixiao"],
    "S": ["jingliu", "dan-heng-il", "blade", "jing-yuan"],
    "A": ["seele", "yanqing", "argenti"],
    "B": ["hook", "arlan"],
    "C": ["herta"]
  },
  "criteria": ["Single-target DMG", "AoE DMG", "Consistency", "Ease of Use"],
  "notes": "Ranked at E0 with optimal team and F2P light cones. Does not account for eidolon investment."
}
```

#### 示例：`tier-lists/support.json`

```json
{
  "id": "tier-list-support",
  "role": "Support",
  "version": "3.4",
  "updatedAt": "2026-07-02T00:00:00Z",
  "tiers": {
    "SS": ["ruan-mei", "sparkle", "robin"],
    "S": ["bronya", "tingyun", "pela", "silver-wolf"],
    "A": ["asta", "yukong", "hanya"],
    "B": [],
    "C": []
  }
}
```

### 10.3 榜单清单

```
src/data/tier-lists/
├── dps.json         ← Best DPS HSR
├── support.json     ← Best Support HSR
├── sustain.json     ← Best Sustain HSR
├── break.json       ← Best Break DPS HSR
├── f2p.json         ← Best F2P Characters HSR
└── overall.json     ← HSR Tier List（综合榜，保留以覆盖传统搜索）
```

| 榜单 | SEO 关键词 |
|------|----------|
| DPS | "Best DPS HSR" "HSR DPS ranking" |
| Support | "Best Support HSR" "HSR Support tier list" |
| Sustain | "Best Healer HSR" "HSR Sustain ranking" |
| Break | "Best Break DPS HSR" "Break team tier list" |
| F2P | "Best F2P characters HSR" "Budget tier list" |
| Overall | "HSR Tier List" "Star Rail character ranking" |

### 10.4 数据量

**6 个榜单文件。**

---

## 11. 内容生产映射

> **这是 V2 设计中最重要的部分。**

### 11.1 一个角色 → 至少 8 篇内容

```
Kafka 角色数据（5 个 JSON 文件）
        │
        ▼ AI Prompt 流水线
        │
        ├── 1.  Character Page      → /characters/kafka
        ├── 2.  Build Guide         → /builds/kafka-general
        ├── 3.  F2P Build Guide     → /builds/kafka-f2p
        ├── 4.  Premium Build Guide → /builds/kafka-premium
        ├── 5.  Team Guide          → /teams/kafka-dot-premium
        ├── 6.  Light Cone Guide    → /lightcones/patience-is-all-you-need (含 Kafka 专武分析)
        ├── 7.  Relic Guide         → /relics/prisoner-in-deep-confinement (含 Kafka 适配分析)
        └── 8.  Material Guide      → /materials/obsidian-of-obession (含 Kafka 养成路线)
```

### 11.2 内容量计算

| 数据源 | 每单位产出 | 单位数 | 总页面 |
|--------|-----------|--------|--------|
| Character（5⭐） | 8 页 | 30 角色 | 240 |
| Character（4⭐） | 3 页（精简版） | 30 角色 | 90 |
| Light Cone（5⭐） | 1 页 | 30 | 30 |
| Light Cone（4⭐） | 0.5 页（聚合页） | 40 | 20 |
| Relic | 1 页 | 40 | 40 |
| Material | 1 页 | 65 | 65 |
| Team | 1 页 | 50 | 50 |
| Tier List | 1 页 | 6 榜单 | 6 |
| Banner | 1 页 | 14 | 14 |
| Version | 1 页 | 12 | 12 |
| Event | 1 页 | 35 | 35 |
| Guides（聚合页） | — | 5 | 5 |
| Home / About | — | 2 | 2 |
| **合计** | | | **~609** |

> **第一阶段目标从 300~500 提升至 480~600 可索引页面。**

### 11.3 内容生产流水线

```
┌──────────────┐
│  Game Data    │  ← 手动维护 JSON 文件
│ (src/data/)   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  AI Prompt    │  ← 按内容类型匹配模板 Prompt
│  Pipeline     │     输入: JSON + Prompt
│               │     输出: SEO 优化 Markdown
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Markdown     │  ← 存储于 src/content/
│  Repository   │     独立于数据源，可随时重新生成
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Astro SSG    │  ← import JSON + Markdown
│               │     → 生成静态 HTML
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Cloudflare   │  ← 全球 CDN + 自动 HTTPS
│  Pages        │
└──────────────┘
```

---

## 12. 数据目录总览（V2）

```
src/
└── data/
    ├── characters/          # ~240 文件 (核心 + 技能 + 行迹 + 材料 + 属性)
    │   ├── kafka.json
    │   ├── kafka-skills.json
    │   ├── kafka-traces.json
    │   ├── kafka-materials.json
    │   ├── kafka-stats.json
    │   └── ...
    ├── lightcones/          # ~100 文件
    ├── relics/              # ~40 文件
    ├── materials/           # ~65 文件
    ├── teams/               # ~50 文件
    ├── builds/              # ~180 文件
    ├── banners/             # ~14 文件
    ├── versions/            # ~12 文件
    ├── events/              # ~35 文件
    └── tier-lists/          # 6 文件
```

**总计：约 742 个数据文件（V1 的 2 倍，但单个文件更轻）。**

---

## 13. 数据关系图（V2）

```
                     ┌─────────────────┐
                     │    Character    │
                     │  (core/skills/  │
                     │  traces/stats/  │
                     │   materials)    │
                     └────────┬────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │    Build     │    │    Team      │    │  Tier List   │
   │  (N:1 Char)  │    │ (N:N Char)   │    │  (N:1 Char)  │
   │  180 files   │    │  50 files    │    │  6 files     │
   └──────┬───────┘    └──────┬───────┘    └──────────────┘
          │                   │
          │    ┌──────────────┼──────────────┐
          │    │              │              │
          ▼    ▼              ▼              ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │  Light Cone  │    │    Relic     │    │  Material    │
   │  100 files   │    │  40 files    │    │  65 files    │
   └──────────────┘    └──────────────┘    └──────────────┘

   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   Banner     │    │   Version    │    │    Event     │
   │  14 files    │    │  12 files    │    │  35 files    │
   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │    Version      │
                     │  (关联 Banner   │
                     │   和 Event)     │
                     └─────────────────┘
```

---

## 14. V1 → V2 变更对照

| 维度 | V1（数据库思维） | V2（内容生产系统思维） |
|------|-----------------|---------------------|
| Character 模型 | 1 个大 JSON | 拆分 core + skills + traces + materials + stats |
| Build 数量 | ~60（1/角色） | ~180（3+/角色） |
| Banner | ❌ 无 | ✅ 新增 ~14 |
| Version | ❌ 无 | ✅ 新增 ~12 |
| Event | ❌ 无 | ✅ 新增 ~35 |
| Material | 基础字段 | 增加 farmingTips / dropLocations / recommendedDailyAmount |
| Tier List | 1 个综合榜 | 6 个角色分榜（DPS / Support / Sustain / Break / F2P / Overall） |
| 数据文件总数 | ~371 | ~742 |
| 可生成页面数 | 300~500 | **480~609** |
| 核心设计思维 | "存什么数据" | "一个数据源能生成几篇 SEO 内容" |

---

> **文档版本**：V2.0
> **创建日期**：2026-06-12
> **更新日期**：2026-06-12（基于用户反馈重写）
> **来源**：GameBeliever-第一阶段.md + 数据库设计-问题反馈-1.md
