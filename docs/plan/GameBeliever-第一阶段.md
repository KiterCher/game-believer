# GameBeliever 第一阶段实施计划（V1.0）

## 项目目标

在30天内完成 GameBeliever 第一版上线，并验证 Google/Bing 自然搜索流量。

第一阶段不追求：

- 收入
- 用户注册
- 社区互动
- AI功能
- 会员体系

第一阶段唯一目标：

建立一套可批量生产内容的流水线，并上线 300~500 个高质量可索引页面。

---

# 第一阶段项目定位

项目名称：

GameBeliever

项目定位：

面向全球玩家的《崩坏：星穹铁道》数据库与Build资料站。

项目口号：

Build Smarter. Farm Faster.

核心内容：

- Character Database
- Build Guides
- Team Guides
- Light Cone Database
- Relic Database
- Material Database

---

# 第一阶段成功标准

## 第30天验收指标

页面数量：

300+

Google Search Console：

成功接入

Bing Webmaster：

成功接入

Google收录：

100+

自然流量：

10~30 UV/Day

页面加载速度：

90+（PageSpeed）

---

# 第一周计划

## Day1：网站架构设计

确定目录结构

```
/
├── characters
├── builds
├── teams
├── relics
├── lightcones
├── materials
├── tier-list
├── guides
└── about
```

建立统一URL规范：

```
/characters/kafka
/builds/kafka-build
/teams/kafka-team
/relics/prisoner-in-deep-confinement
```

---

## Day2：数据模型设计

建立统一数据模型。

Character

```
id
name
rarity
element
path
releaseVersion
avatar
description
```

LightCone

```
id
name
rarity
path
effect
description
```

Relic

```
id
name
setType
effect2
effect4
```

Material

```
id
name
source
usage
rarity
```

---

## Day3：内容模板设计

设计统一模板。

### Character Page

内容结构：

- Character Overview
- Skills
- Traces
- Ascension Materials
- Strengths
- Weaknesses

---

### Build Guide

内容结构：

- Best Build
- Recommended Light Cones
- Recommended Relics
- Recommended Stats
- Team Compositions
- Pull Recommendation

---

### Team Guide

内容结构：

- Team Members
- Rotation
- Advantages
- Weaknesses

---

### Material Guide

内容结构：

- Description
- Usage
- Farming Location
- Best Routes

---

## Day4：AI Prompt体系

建立统一Prompt。

目标：

输入JSON数据。

输出：

SEO优化Markdown页面。

要求：

- 英文
- SEO友好
- H1-H3结构
- FAQ模块
- Meta Description
- 不少于1200词

---

## Day5：内容生成测试

选取5个角色测试。

推荐：

- Kafka
- Firefly
- Acheron
- Robin
- Castorice

验证：

```
数据
↓
Prompt
↓
AI
↓
Markdown
↓
网站展示
```

全流程跑通。

---

# 第二周计划

## 数据整理

整理：

Character

60+

LightCone

100+

Relic

40+

Material

80+

---

## 批量生成内容

目标：

100页面

内容类型：

Character

Build

Material

---

## 网站上线

部署：

Cloudflare Pages

接入：

Google Analytics

Google Search Console

Bing Webmaster

---

# 第三周计划

## 批量扩展

新增：

Build Pages

Team Pages

Tier List

---

页面目标：

200+

---

## SEO优化

生成：

sitemap.xml

robots.txt

RSS Feed

Structured Data

Open Graph

---

# 第四周计划

## 扩展至300-500页面

内容覆盖：

所有角色

所有光锥

主要遗器

主要材料

Build推荐

Team推荐

---

## 建立监控

每日检查：

Google Search Console

Bing Webmaster

Google Analytics

---

重点关注：

- 收录数量
- 曝光数量
- 点击数量
- 页面排名

---

# 第一阶段技术方案

前端：

Astro

内容：

Markdown

部署：

Cloudflare Pages

图片：

Cloudflare R2

统计：

Google Analytics

SEO：

Google Search Console

搜索：

本地静态搜索

---

# 第一阶段禁止开发内容

以下功能全部延后：

用户注册

用户登录

评论系统

收藏系统

支付系统

会员系统

论坛系统

聊天系统

AI问答

SpringBoot后台

Redis

ES

MQ

---

# 第一阶段核心任务

不是开发网站。

而是建立：

```
游戏数据
↓
AI生成内容
↓
Markdown
↓
自动发布
↓
SEO收录
```

这套内容生产流水线。

---

# 第一阶段结束标准

满足以下条件即可进入第二阶段：

1. 页面数量 ≥ 300
2. Google收录 ≥ 100
3. 日曝光 ≥ 100
4. 出现自然搜索点击
5. 内容生成流程自动化

达到以上标准后，进入第二阶段：

Build数据库、Tier List、Team Planner、养成计算器开发。
