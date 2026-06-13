我把你上传的三份文档一起看完了：

1. 关键词库设计 
2. 内容生产流水线 
3. Prompt库 

先说结论：

> **现在已经可以开始开发了。**
>
> 但不是开发网站。
>
> 而是开发：
>
> **Content Pipeline MVP（内容生产流水线 MVP）**

这是两个完全不同的事情。

---

# 我的评分

| 文档       | 评分 |
| -------- | -- |
| 数据模型     | 90 |
| 页面设计     | 95 |
| Sprint计划 | 92 |
| 关键词库     | 95 |
| 内容流水线    | 93 |
| Prompt库  | 88 |
| 综合       | 92 |

---

# 关键词库

这是目前最让我满意的一份。

优点：

### 已经形成页面映射

例如：

```text
keyword
↓
page_type
↓
priority
```



这意味着未来：

```text
Kafka Build
```

不会生成到：

```text
Material Page
```

里面。

---

### 已经有SEO运营思维

例如：

```text
S
A
B
C
```

分层。

这是对的。

---

# 关键词库唯一问题

## 不要相信搜索量

例如：

```text
5400
4800
3600
```

这些数字。

---

AI生成的。

不是Ahrefs真实数据。

---

所以：

```text
volume
difficulty
```

字段保留。

但：

```text
不要作为决策依据
```

---

真正的数据来源：

```text
Google Search Console
```

未来3个月后。

---

# Prompt库

整体不错。

但有几个问题。

---

## 问题1

字数太长

你要求：

```text
1200+
```



---

Character：

1200

Build：

1200

Team：

1200

Pull：

1200

---

假设：

```text
60角色
```

---

你会生成：

```text
288000+
words
```

---

Google未必喜欢。

---

建议：

### Character

800~1200

---

### Build

1000~1500

---

### Team

600~800

---

### Pull

800~1200

---

更合理。

---

## 问题2

FAQ过多

你要求：

```text
8~15
```



---

我建议：

```text
5~8
```

---

否则：

大量页面会出现：

```text
FAQ模板化
```

---

# 内容流水线

这是整个项目最核心的部分。

整体很好。

---

但有一个重大问题。

---

# 最大问题

你设计的是：

```text
JSON
↓
Prompt
↓
AI
↓
QA
↓
Markdown
```



---

我建议改成：

```text
JSON
↓
Prompt
↓
AI
↓
Normalize
↓
QA
↓
Markdown
```

---

增加：

## Normalize层

例如：

```text
标题统一

slug统一

链接统一

FAQ统一
```

---

否则：

未来：

```text
5000页
```

以后。

一定会出现：

```text
同一个角色
不同命名
```

问题。

---

# 还有一个非常重要的问题

## 不要一开始生成540篇

你文档写：

```text
60角色 × 9篇
```



---

我认为：

这是第二阶段。

---

第一阶段应该：

## Kafka

生成：

```text
Character

Build

Team

Pull
```

---

## Acheron

同样。

---

## Firefly

同样。

---

总计：

```text
12篇
```

---

然后：

### 部署

### 提交GSC

### 检查页面

### 检查Meta

### 检查Schema

---

确认：

```text
内容质量OK
```

再批量。

---

# 你现在应该让AI做什么

我会这样推进。

---

# Step1

让 Claude Code 生成：

```text
Astro项目骨架
```

只包含：

```text
Layout
Character
Build
Team
Pull
```

---

不要：

```text
Banner
Version
Event
```

---

# Step2

让 Claude Code 开发：

```text
build-prompt.ts
```

---

# Step3

开发：

```text
generate.ts
```

---

# Step4

开发：

```text
qa/check.ts
```

---

# Step5

生成：

```text
Kafka
Acheron
Firefly
```

---

# Step6

上线。

---

# 不要开发

目前不要做：

```text
搜索

用户

后台

评论

收藏

SpringBoot
```

---

# 如果是我

明天开始我给 Claude Code 的任务只有一个：

```text
根据：

数据模型
关键词库
内容流水线
Prompt库

生成：

GameBeliever Astro MVP

要求：

1. Character Page
2. Build Page
3. Team Page
4. Pull Advice Page

支持：

JSON → Prompt → Markdown → Astro

完成Kafka全流程演示

禁止开发：

搜索
用户
后台
SpringBoot
```

因为到你现在这个阶段，最大的风险已经不是方向错了。

而是：

> 花两周开发一堆功能，却没有验证 **“Kafka.json → Kafka页面”** 这条最核心的生产链路。

我的建议是：**先把 Kafka 跑通，再扩展到60个角色。** 这是目前成功率最高的路线。
