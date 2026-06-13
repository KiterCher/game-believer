# GameBeliever 第一阶段 PRD（产品需求文档）

## 1. 产品概述

### 1.1 产品名称

**GameBeliever** — 面向全球玩家的《崩坏：星穹铁道》（Honkai: Star Rail）数据库与 Build 资料站。

### 1.2 产品口号

> **Build Smarter. Farm Faster.**

### 1.3 产品愿景

成为 HSR 玩家首选的：
- 角色培养参考站（Build Guides）
- 队伍搭配参考站（Team Guides）
- 装备数据查询站（Light Cones / Relics）
- 材料刷取路线站（Material Farming）

### 1.4 第一阶段定位

**第一阶段不是开发一个功能完备的网站，而是建立一套内容生产流水线。**

```
游戏数据 → AI 生成内容 → Markdown → 自动发布 → SEO 收录
```

核心目标：**上线 300~500 个高质量可索引页面，并验证 Google/Bing 自然搜索流量。**

---

## 2. 第一阶段不做的事（明确排除）

| 排除项 | 原因 |
|--------|------|
| 用户注册 / 登录 | 第二阶段 |
| 评论系统 | 第二阶段 |
| 收藏系统 | 第二阶段 |
| 支付系统 | 第二阶段 |
| 会员体系 | 第二阶段 |
| 论坛 / 社区 | 第二阶段 |
| 聊天系统 | 第二阶段 |
| AI 问答 | 第二阶段 |
| SpringBoot 后台 | 第二阶段 |
| Redis | 第二阶段 |
| ElasticSearch | 第二阶段 |
| 消息队列（MQ） | 第二阶段 |
| 收入 / 商业变现 | 暂不考虑 |

---

## 3. 目标用户

### 3.1 核心用户画像

| 用户类型 | 描述 | 核心需求 |
|----------|------|----------|
| HSR 新玩家 | 刚入坑，需要培养指导 | 角色 Build 推荐、材料刷取路线 |
| HSR 中级玩家 | 正在刷遗器/光锥，需要最优搭配 | Relic 推荐、Stats 优先级 |
| HSR 高级玩家 | 研究队伍搭配，追求最优解 | Team Compositions、Rotation |
| 搜索引擎流量 | 通过 Google/Bing 搜索进入的长尾用户 | 精准、SEO 友好的内容页面 |

### 3.2 用户语言

第一阶段内容全部使用 **英文**，面向全球搜索流量。

---

## 4. 核心内容体系

### 4.1 六大内容模块

| 模块 | 说明 | 预估页面数 |
|------|------|-----------|
| Character Database | 角色数据页 | 60+ |
| Build Guides | 角色 Build 推荐 | 60+ |
| Team Guides | 队伍搭配指南 | 30+ |
| Light Cone Database | 光锥数据页 | 100+ |
| Relic Database | 遗器数据页 | 40+ |
| Material Database | 材料刷取页 | 80+ |
| Tier List | 角色强度排行榜 | 1 |
| Guides | 通用攻略 | 10+ |
| About | 关于页面 | 1 |

**第一阶段总页面目标：300~500 页。**

---

## 5. 成功标准（第 30 天验收）

| 指标 | 目标值 | 备注 |
|------|--------|------|
| 页面数量 | ≥ 300 | 上限 500 |
| Google Search Console | 成功接入 | 验证所有权 |
| Bing Webmaster | 成功接入 | 验证所有权 |
| Google 收录 | ≥ 100 | 以 GSC 数据为准 |
| 自然流量 | 10~30 UV/Day | Google Analytics 统计 |
| PageSpeed | ≥ 90 分 | Lighthouse 移动端 |

### 5.1 第一阶段结束标准（Gate to Phase 2）

满足以下 **全部 5 条** 即可进入第二阶段：

1. ✅ 页面数量 ≥ 300
2. ✅ Google 收录 ≥ 100
3. ✅ 日曝光 ≥ 100
4. ✅ 出现自然搜索点击
5. ✅ 内容生成流程自动化

---

## 6. 技术方案

| 层级 | 方案 | 说明 |
|------|------|------|
| 前端框架 | **Astro** | 静态站点生成（SSG），Markdown 原生支持 |
| 内容格式 | **Markdown** | AI 直接输出，零转换成本 |
| 部署平台 | **Cloudflare Pages** | 免费、全球 CDN、自动部署 |
| 图片存储 | **Cloudflare R2** | S3 兼容，免费额度充足 |
| 统计分析 | **Google Analytics** | 免费 |
| SEO 工具 | **Google Search Console + Bing Webmaster** | 免费 |
| 站内搜索 | **本地静态搜索** | 如 Pagefind 等 |
| 域名 | 待定 | — |

### 6.1 不使用的技术

- ❌ 数据库（MySQL / PostgreSQL）
- ❌ 后端框架（SpringBoot）
- ❌ 缓存中间件（Redis）
- ❌ 搜索引擎（ElasticSearch）
- ❌ 消息队列（MQ）

---

## 7. 内容生产流水线（核心流程）

### 7.1 流水线架构

```
┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────────┐    ┌─────────┐
│ 游戏数据  │ → │  AI Prompt    │ → │  AI 生成  │ → │  Markdown    │ → │  发布   │
│ (JSON)   │    │  (标准化模板)  │    │ (DeepSeek)│    │  (.md 文件)  │    │ Cloudflare│
└──────────┘    └──────────────┘    └──────────┘    └──────────────┘    └─────────┘
```

### 7.2 数据来源

- 官方 Wiki
- Honey Hunter World
- Prydwen
- 其他社区数据源

### 7.3 AI Prompt 规范

- 输入：结构化 JSON 数据
- 输出：SEO 优化 Markdown 页面
- 语言：英文
- 结构：H1-H3 层级、FAQ 模块、Meta Description
- 长度：不少于 1200 词

---

## 8. URL 规范

```
/characters/{character-slug}        → 角色详情页
/builds/{character-slug}-build      → Build 推荐页
/teams/{team-slug}-team             → 队伍指南页
/relics/{relic-slug}                → 遗器详情页
/lightcones/{lightcone-slug}        → 光锥详情页
/materials/{material-slug}          → 材料详情页
/tier-list                          → 强度榜
/guides/{guide-slug}                → 通用攻略
/about                              → 关于页面
```

---

## 9. SEO 必备文件

| 文件 | 说明 |
|------|------|
| `sitemap.xml` | 站点地图，提交 GSC / Bing |
| `robots.txt` | 爬虫规则 |
| RSS Feed | 内容更新订阅 |
| Structured Data | JSON-LD 结构化数据（Article / FAQ） |
| Open Graph | 社交分享元数据 |

---

## 10. 风险与假设

| 风险 | 缓解措施 |
|------|----------|
| AI 生成内容质量不稳定 | 人工抽检 + Prompt 迭代 |
| Google 收录缓慢 | 主动提交 sitemap + URL Inspection |
| Cloudflare Pages 限制 | 第一阶段页面量级远低于免费额度上限 |
| 游戏版本更新导致数据过时 | 设计数据层与内容层分离，便于批量重新生成 |

---

> **文档版本**：V1.0
> **创建日期**：2026-06-12
> **来源**：GameBeliever-第一阶段.md
