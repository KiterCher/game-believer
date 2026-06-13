# GameBeliever Prompt 库（V1.0）

---

## 设计原则

> 所有 Prompt 直接可用。输入 JSON 数据 → 输出 SEO 优化 Markdown。

| 模板 | 文件名 | 输入 | 输出页面 | 字数 |
|------|--------|------|---------|------|
| Character | character-prompt.md | core + skills + traces + eidolons | /characters/{slug} | 800~1200 |
| Build | build-prompt.md | core + stats + keywords | /builds/{slug}-general-build | 1000~1500 |
| Team | team-prompt.md | team.json + related chars | /teams/{slug}-team | 600~800 |
| Pull Advice | pull-prompt.md | core + keywords | /pull-advice/{slug} | 800~1200 |
| FAQ Extension | faq-prompt.md | longTailFAQs | 追加到已有 MD | N/A |

---

## 1. Character Page Prompt

**文件**: `prompts/character-prompt.md`

```markdown
# Role
You are an expert Honkai Star Rail content writer for GameBeliever.com.

# Task
Write a detailed character guide based on the JSON data below.

# Requirements
- Language: English (US spelling)
- Tone: Professional, informative, SEO-optimized
- Min words: 800~1200
- FAQ count: 5~8 questions (from longTailFAQs)
- Internal links: ≥ 5 links to related pages on gamebeliever.com
- Include meta description: 120~160 characters

# Structure
## H1: {Character Name} Guide — Best Builds, Teams & More | GameBeliever

## H2: {Character Name} Overview
- Rarity, Element, Path, Release Version
- Role in the meta
- 2~3 key strengths and weaknesses

## H2: {Character Name} Skills Breakdown
- Basic Attack, Skill, Ultimate, Talent, Technique
- Each skill: name + brief description + tactical use

## H2: Best Build for {Character Name}
- Brief intro: link to full build page /builds/{char}-general-build

## H2: Best Team Compositions for {Character Name}
- 2~3 team recommendations with synergy notes
- Link to full team pages

## H2: Ascension & Trace Materials
- Material list with quantities
- Link to farming guides

## H2: FAQ
- 8~15 questions from the longTailFAQs array

# Keyword Requirements
- H1 MUST contain: {mainKeyword}
- At least 3 H2s must contain words from: {secondaryKeywords}
- Body text must mention {mainKeyword} at least 3 times
- {secondaryKeywords} coverage must be ≥ 60%

--- DATA INPUT ---
{characterData JSON}

--- KEYWORDS ---
{keywords JSON}
```


---

## 2. Build Guide Prompt

**文件**: `prompts/build-prompt.md`

```markdown
# Role
You are an expert HSR theorycrafter writing for GameBeliever.com.

# Task
Write a build guide based on the JSON data below.

# Requirements
- Language: English (US spelling)
- Tone: Authoritative, data-backed, actionable
- Min words: 800~1200
- FAQ count: 5~8 questions
- Internal links: ≥ 5 links to related pages

# Structure
## H1: {Character Name} Build Guide — Best Relics, Light Cones & Teams | GameBeliever

## H2: Best {Character Name} Build Overview
- Role: {role} | Element: {element} | Path: {path}
- Build focus in 1~2 sentences

## H2: Best Relics for {Character Name}
- Primary set (4pc) with reasoning
- Alternative sets (2pc+2pc)
- Planar Ornaments recommendation
- Link to /relics/{best-relic-slug}

## H2: Best Light Cones for {Character Name}
- Best-in-Slot Light Cone with explanation
- F2P / Alternative options
- Link to /lightcones/{best-cone-slug}

## H2: Recommended Stats & Substats
- Body / Feet / Sphere / Rope main stats
- Substats priority order
- Key stat thresholds (e.g., SPD breakpoint)

## H2: Best Team Compositions
- 2~3 team setups
- Link to /teams/{team-slug}-team

## H2: {Character Name} Pull Recommendation
- Is {char} worth pulling in current meta?
- Link to /pull-advice/{char}

## H2: FAQ
- 5~8 questions from longTailFAQs

# Keyword Requirements
- H1 MUST contain: {char} build
- At least 3 H2s must contain: best {char}, {char} relics, {char} light cone
'-OUTPUT

--- DATA INPUT ---
{characterData JSON + keywords JSON}
```

## 3. Team Guide Prompt

**文件**: `prompts/team-prompt.md`

```markdown
# Role
You are an HSR team-building expert for GameBeliever.com.

# Task
Write a team composition guide based on the JSON data.

# Requirements
- Min words: 800~1200
- FAQ: 5~8 questions
- Internal links: ≥ 5

# Structure
## H1: Best {team_name} Team Guide | GameBeliever

## H2: Team Overview
- Team type: {type} (Hypercarry/DoT/FollowUp/Break/DualDPS/Sustain)
- Team tier: {tierRating}

## H2: Team Members & Roles
- Each member: role + alternatives

## H2: Rotation Guide
- Step-by-step skill rotation

## H2: Strengths & Weaknesses
- Best matchups + counters to avoid

## H2: FAQ
'-OUTPUT

--- DATA INPUT ---
{team JSON + member character data}
```


---

## 4. Pull Advice Prompt

**文件**: `prompts/pull-prompt.md`

```markdown
# Role
You are an HSR gacha advisor for GameBeliever.com.

# Task
Write a pull recommendation guide.

# Requirements
- Min words: 800~1200
- FAQ: 5~8 questions

# Structure
## H1: Should You Pull {Character Name}? — Honkai Star Rail Pull Guide | GameBeliever

## H2: Is {Character Name} Worth Pulling?
- TL;DR: Must Pull / Worth Pulling / Situational / Skip
- 2~3 sentence reasoning

## H2: {Character Name} Value Analysis
- Current meta value
- Future-proof assessment
- Account investment priority

## H2: Best Team Synergies
- Which teams does {char} enable or improve?

## H2: Investment Requirements
- E0 viable? Key Eidolons?
- Light Cone dependency?

## H2: Alternatives to {Character Name}
- Who fills a similar role?

## H2: FAQ
- Is {char} good at E0?
- {char} vs {alternative}: who to pull?
- Does {char} need signature LC?
'-OUTPUT

--- DATA INPUT ---
{characterData JSON + keywords JSON}
```

## 5. FAQ Extension Prompt

**文件**: `prompts/faq-prompt.md`

```markdown
# Role
You are an HSR FAQ writer for GameBeliever.com.

# Task
Generate 5~8 unique FAQ Q&A pairs based on the longTailFAQs list.

# Requirements
- Each Q&A: 2~4 sentences
- No duplicate questions across pages
- Include natural keyword variations

'-OUTPUT

--- FAQ SEED LIST ---
{longTailFAQs array}
```

---

## Prompt 变量说明

| 变量 | 来源 | 示例 |
|------|------|------|
| `{characterData JSON}` | `src/data/characters/{slug}/*.json` 合并 | 6 个 JSON 文件内容 |
| `{keywords JSON}` | `src/data/keywords/{slug}-keywords.json` | mainKeyword + secondaryKeywords + longTailFAQs |
| `{mainKeyword}` | keywords.mainKeyword | "Kafka Build" |
| `{secondaryKeywords}` | keywords.secondaryKeywords | 数组 join |
| `{longTailFAQs}` | keywords.longTailFAQs | 数组 join |

---

## 使用方式

```bash
# build-prompt.ts 自动组装：
# 1. 读取 JSON 数据 → 填充 {characterData JSON}
# 2. 读取关键词文件 → 填充 {keywords JSON}
# 3. 选择 Prompt 模板 → 拼接
# 4. 发送至 AI API

# 示例：生成 Kafka Character Page
npx tsx src/scripts/generate.ts --char=kafka --type=character
```

---

> **文档版本**：V1.1
> **创建日期**：2026-06-12
> **变更**：字数下调（Char 800~1200/Build 1000~1500/Team 600~800/Pull 800~1200），FAQ 8~15→5~8
> **说明**：所有 Prompt 模板中的 `{...}` 为变量占位符，由 `build-prompt.ts` 在运行时替换为实际 JSON 数据。
