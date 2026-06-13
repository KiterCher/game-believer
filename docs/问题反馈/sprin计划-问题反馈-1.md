这一版已经不是 PRD 了。

这是接近真正项目管理层面的 **Sprint执行计划**。

如果前几份文档我一直在挑架构和SEO的问题。

那么这份文档我要从：

```text
项目经理
产品经理
独立开发者
SEO运营
```

四个角度来审查。

整体内容见：

---

# 先说结论

这是目前四份文档里面最好的一份。

评分：

| 维度     | 评分 |
| ------ | -- |
| 项目规划   | 95 |
| 执行可落地性 | 92 |
| 技术合理性  | 95 |
| SEO规划  | 90 |
| 创业可行性  | 88 |
| 综合     | 92 |

---

# 最大优点

## 终于开始像创业项目了

前面几份文档的问题：

```text
设计网站
```

---

这一份变成：

```text
验证市场
```



这是非常大的进步。

---

例如：

Sprint目标：

```text
上线
收录
曝光
点击
```

而不是：

```text
登录
权限
后台
```

---

这说明方向已经正确。

---

# 第一个问题

## 工时严重低估

例如这里：

```text
60个Character Page
4小时
```



---

理论上可以。

现实中不行。

---

为什么？

因为：

AI生成速度不是问题。

---

问题在：

```text
检查

修复

重跑

格式统一

链接检查
```

---

实际情况：

### 60篇

大约：

```text
8~12小时
```

更合理。

---

# 第二个问题

## Sprint 2太激进

这里：

```text
60角色
100光锥
80材料
40遗器
30队伍
```



---

实际上：

这是整个项目最累的部分。

---

很多人认为：

```text
生成内容最难
```

---

错。

最难的是：

```text
整理结构化数据
```

---

我甚至认为：

```text
S2
```

应该拆成：

```text
S2A
角色

S2B
装备
```

---

否则很容易崩。

---

# 第三个问题

## 500页面目标还是偏保守

这个我前面说过。

---

因为：

现在已经有：

```text
Character

Build

Team

LightCone

Relic

Material

Tier

Banner

Version

Event
```



---

实际上：

第一页上线时。

你应该已经能做到：

```text
700+
```

页面。

---

因为：

### Build

你已经设计：

```text
3 Build
```



---

那：

```text
60角色
×3
```

=

180页

---

所以：

我建议改：

```text
Sprint4

目标

800+
```

---

# 第四个问题

## 缺少关键词管理系统

这是我认为最大的遗漏。

---

你现在有：

```text
内容系统
```

---

但没有：

```text
关键词系统
```

---

例如：

Kafka。

---

应该维护：

```json
{
  "mainKeyword":"kafka build",
  "secondaryKeywords":[
    "best kafka build",
    "kafka relics",
    "kafka team",
    "kafka light cone"
  ]
}
```

---

否则未来：

```text
AI生成内容
```

和：

```text
SEO关键词
```

脱节。

---

# 第五个问题

## 缺少内容审核层

你现在：

```text
JSON
↓
Prompt
↓
AI
↓
Markdown
```



---

实际上应该：

```text
JSON
↓
Prompt
↓
AI
↓
QA Agent
↓
Markdown
```

---

检查：

### 是否缺标题

### 是否缺FAQ

### 是否缺Meta

### 是否缺内部链接

### 是否低于字数

---

否则：

500篇以后会出大量问题。

---

# 第六个问题

## 内容类型还不够

你现在：

```text
Character

Build

Team

LightCone

Relic

Material
```

---

但真正高流量的还有：

### Comparison

例如：

```text
Acheron vs Firefly

Kafka vs Black Swan
```

---

### Pull Advice

例如：

```text
Should You Pull Kafka
```

---

### F2P Guide

例如：

```text
Best F2P Kafka Build
```

---

这些页面流量非常高。

---

# 第七个问题

## 监控指标不完整

这里：

```text
曝光
点击
收录
```



---

还应该增加：

### 收录率

```text
Index Rate
```

---

### 平均排名

```text
Average Position
```

---

### Top Query

```text
Top Search Queries
```

---

### Top Landing Page

```text
Top Landing Pages
```

---

这些比UV更重要。

---

# 我最想改的地方

其实不是技术。

不是SEO。

不是架构。

---

而是：

## Sprint顺序

我会改成：

### Sprint1

内容流水线

---

### Sprint2

20角色

上线

收录

---

### Sprint3

扩展100角色页

---

### Sprint4

扩展全部内容

---

为什么？

因为：

你现在计划：

```text
做完
再验证
```

---

而我希望：

```text
边做
边验证
```

---

例如：

Day7

就应该：

```text
上线
提交GSC
```

而不是：

Day14。

---

这样：

Google能提前开始抓取。

---

# 如果我是项目负责人

我会给这份计划一个最终评价：

### 能开发吗？

能。

---

### 能上线吗？

能。

---

### 能获得收录吗？

大概率能。

---

### 能赚钱吗？

目前还不知道。

---

因为：

真正决定成败的还不是这份Sprint。

而是下一份文件：

> **《AI内容生产流水线设计文档》**

我现在最关心的已经不是：

```text
Astro
```

而是：

```text
Kafka.json
↓
自动生成8种内容
↓
自动生成FAQ
↓
自动生成Meta
↓
自动生成内部链接
↓
自动发布
```

这条链路。

因为这条链路决定你未来是：

```text
500页
```

还是：

```text
50000页
```

的网站。现在从项目成熟度来看，我认为：

```text
数据模型     90%
页面设计     95%
PRD         95%
Sprint计划   92%
内容流水线    20%（还没设计）
```

而最后那个20%，恰恰占整个项目未来价值的80%。
