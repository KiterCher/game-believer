现在你的状态已经从：

```text
想法阶段
```

进入：

```text
执行阶段
```

说实话，从我看过的独立开发项目来说，90%的人死在：

```text
不断优化文档
不断重构方案
不断调整架构
```

而不是死在开发。

所以：

> **从这一刻开始，禁止继续写产品文档。**

你已经有：

✅ 数据模型
✅ 页面设计
✅ 关键词库
✅ 内容流水线
✅ Prompt库
✅ Sprint计划

这些已经足够了。

---

# 接下来7天应该做什么

## Day1

创建项目骨架

让 Claude Code/Codex 执行：

```text
创建 Astro 项目

要求：

项目名称：
GameBeliever

技术栈：
Astro
TypeScript

目录：

src/
├── content/
├── data/
├── components/
├── layouts/
├── pages/
├── scripts/
├── qa/
└── types/

要求：

1、支持 Markdown Collection
2、支持动态路由
3、支持 Sitemap
4、支持 RSS
5、支持 SEO Meta
6、支持 OpenGraph

不要开发：
用户系统
搜索系统
后台管理
评论系统

输出完整项目结构
```

目标：

```text
项目能启动
```

---

# Day2

开发内容流水线

不要开发页面。

先开发：

```text
build-prompt.ts
```

然后：

```text
generate.ts
```

然后：

```text
qa/check.ts
```

目标：

```text
Kafka.json
↓
Prompt
↓
AI
↓
Markdown
```

跑通。

---

# Day3

准备测试数据

只准备：

```text
Kafka
Acheron
Firefly
```

三个角色。

不要一次做60个。

---

目录：

```text
src/data/characters/

kafka/
acheron/
firefly/
```

---

目标：

```text
生成12篇Markdown
```

---

# Day4

开发页面模板

只做：

```text
Character Page
Build Page
Team Page
Pull Advice
```

四个模板。

---

不要做：

```text
Banner
Version
Event
Guide
```

---

目标：

```text
Markdown
↓
页面渲染
```

跑通。

---

# Day5

部署

推荐：

```text
Cloudflare Pages
```

---

接入：

```text
Google Analytics

Google Search Console

Bing Webmaster
```

---

目标：

```text
网站可访问
```

---

# Day6

提交收录

生成：

```text
sitemap.xml
robots.txt
```

---

提交：

```text
Google Search Console
Bing Webmaster
```

---

目标：

```text
Google开始抓取
```

---

# Day7

检查质量

不要继续开发。

检查：

### 页面质量

```text
Title
Description
FAQ
内链
```

---

### 技术质量

```text
Lighthouse
PageSpeed
```

---

### SEO质量

```text
Schema
Canonical
Sitemap
```

---

# 未来两周

如果前7天顺利。

开始：

```text
3角色
↓
20角色
↓
60角色
```

扩展。

---

# 现在最重要的决定

你接下来不要问：

```text
需不需要ES？
需不需要SpringBoot？
需不需要Redis？
```

这些问题。

因为未来3个月答案都是：

```text
不需要
```

---

你现在唯一需要验证的是：

```text
Kafka.json
↓
AI生成
↓
Markdown
↓
网站
↓
Google收录
```

这条链路。

---

如果我是你。

今天晚上就会开始：

### 第一任务

```text
让 Claude Code 创建 Astro 项目骨架
```

### 第二任务

```text
开发 build-prompt.ts
```

### 第三任务

```text
准备 Kafka 测试数据
```

等 Kafka 第一篇页面在浏览器里渲染出来之后，你的项目才算真正开始。

在那之前，你仍然处于规划阶段。现在应该停止优化文档，进入开发模式。
