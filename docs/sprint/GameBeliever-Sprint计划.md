# GameBeliever 第一阶段 Sprint 计划（V3.0 — 边上线边验证）

## Sprint 总览

| Sprint | 周期 | 天数 | 核心目标 | 页面里程碑 |
|--------|------|------|----------|-----------|
| Sprint 1 | Day 1~7 | 7 天 | 建立内容流水线 + **Day 7 提前上线** | 10 页 → 提交 GSC |
| Sprint 2A | Day 8~10 | 3 天 | 角色数据整理（仅 Character 60 个） | 120 页 |
| Sprint 2B | Day 11~14 | 4 天 | 装备数据整理（光锥/遗器/材料/队伍/Banner） | 200+ 页 |
| Sprint 3 | Day 15~21 | 7 天 | 扩展至 400+ 页 + SEO 基建 | 400 页 |
| Sprint 4 | Day 22~30 | 9 天 | 扩展至 **700~800+** 页 + 监控体系 | 800 页 |

> **Sprint 2 拆分原因**：结构化数据整理是整个项目最累的部分，角色和装备分开避免崩溃。

---

## Sprint 1：Foundation + Pipeline + 提前上线

### Sprint 目标

建立 9 大数据模型的内容生产流水线。**Day 7 即上线至 Cloudflare Pages 并提交 GSC**。

### 关键里程碑

```
Day 1  项目骨架就绪（15个数据目录 + 15个路由目录）
Day 2  10大 TS 接口 + 关键词 JSON Schema 定义完成
Day 3  全部页面模板 + Prompt 模板完成
Day 4  QA Agent 审核规则编写完成
Day 5  首个角色 9 内容全流程跑通（Kafka）
Day 6  5 个角色 x 2 类型 = 10 页全部生成 + QA 审核通过
Day 7  🚀 正式上线 + 提交 GSC + Bing Webmaster
```

### Sprint 任务列表

| ID | 任务 | 负责 | 估时 | 状态 |
|----|------|------|------|------|
| S1-01 | 初始化 Astro 项目 + TypeScript 严格模式 | Dev | 2h | ⬜ |
| S1-02 | 建立 src/data/ 15 个数据子目录 + src/pages/ 15 个路由目录 | Dev | 2h | ⬜ |
| S1-03 | 配置 ESLint + Prettier（暂不使用 Pagefind） | Dev | 1h | ⬜ |
| S1-04 | 定义全部 10 个 TypeScript 数据接口 + 关键词 JSON Schema | Dev | 4h | ⬜ |
| S1-05 | 创建 Layout.astro 基础布局 + SEO Head 组件 | Dev | 3h | ⬜ |
| S1-06 | 创建全部 14 个页面模板组件 | Dev | 10h | ⬜ |
| S1-07 | 编写全部 12 个 AI Prompt 模板 | Content | 6h | ⬜ |
| S1-08 | 编写 **关键词管理系统** JSON Schema + 首批 5 角色关键词文件 | Content | 4h | ⬜ |
| S1-09 | 编写 **QA Agent 审核规则**（标题/FAQ/Meta/内部链接/字数检测） | Content | 4h | ⬜ |
| S1-10 | 准备 5 个测试角色拆分 JSON 数据 | Content | 6h | ⬜ |
| S1-11 | AI 生成 5 角色 x 2 内容类型 = 10 个 MD | Content+AI | 3h | ⬜ |
| S1-12 | QA Agent 审核 10 篇 MD + 修复 + 重跑 | Content | 4h | ⬜ |
| S1-13 | 验证全流程：JSON-Prompt-AI-QA Agent-MD-网页 | All | 4h | ⬜ |
| S1-14 | 首页 + Header/Footer 导航组件 | Dev | 4h | ⬜ |
| S1-15 | 移动端响应式适配 | Dev | 4h | ⬜ |
| S1-16 | 配置 Cloudflare Pages + 首次部署上线 | Dev | 3h | ⬜ |
| S1-17 | 提交 GSC + Bing Webmaster 验证 + 首次 sitemap 提交 | Dev | 2h | ⬜ |

**Sprint 1 总计：约 66 工时**

### Sprint 1 验收标准

- [ ] npm run dev 启动正常
- [ ] /characters/kafka 展示 AI 生成内容（含 FAQ + JSON-LD + OG）
- [ ] 关键词 JSON 文件可被 Prompt 读取（kafka-keywords.json）
- [ ] QA Agent 可自动检测标题缺失/FAQ不足/Meta缺失/字数不足
- [ ] 5 角色 x 2 内容 = 10 个 MD 全部通过 QA 审核
- [ ] 生产环境 URL 可公网访问
- [ ] GSC + Bing Webmaster 验证通过
- [ ] sitemap.xml 首次提交成功
- [ ] GA4 数据上报正常


---

## Sprint 2A：角色数据整理（仅 Character）

### Sprint 目标

**仅整理 60 个角色数据**（最累的阶段），完成 Character Page + 首批 Build 的批量生成。不碰装备数据。

### 关键里程碑

```
Day 8   30 个 5星角色拆分 JSON 整理完成
Day 9   30 个 4星角色拆分 JSON 整理完成
Day 10  60 Character + 60 Build = 120 个 MD 生成 + QA 审核
```

### Sprint 任务列表

| ID | 任务 | 负责 | 估时 | 状态 |
|----|------|------|------|------|
| S2A-01 | 整理 30 个 5星角色拆分数据（core/skills/traces/eidolons/stats/materials） | Content | 8h | ⬜ |
| S2A-02 | 整理 30 个 4星角色拆分数据 | Content | 6h | ⬜ |
| S2A-03 | 填充 60 角色关键词 JSON（mainKeyword/secondaryKeywords/longTailFAQs） | Content | 4h | ⬜ |
| S2A-04 | 批量生成 60 个 Character Page MD | Content+AI | 6h | ⬜ |
| S2A-05 | QA Agent 审核 60 Character MD + 修复 + 重跑 | Content | 6h | ⬜ |
| S2A-06 | 批量生成首批 60 个 Build Guide MD（每个角色 1 个 General Build） | Content+AI | 5h | ⬜ |
| S2A-07 | QA Agent 审核 60 Build MD + 修复 + 重跑 | Content | 5h | ⬜ |
| S2A-08 | 提交增量 sitemap 至 GSC + Bing | Dev | 1h | ⬜ |

**Sprint 2A 总计：约 41 工时**

### Sprint 2A 验收标准

- [ ] 60 角色拆分 JSON 全部就绪（~360 文件）
- [ ] 60 角色关键词文件全部填充
- [ ] 120 个 MD 全部通过 QA Agent 审核
- [ ] sitemap 更新提交成功
- [ ] GSC 已开始抓取并显示索引页数

---

## Sprint 2B：装备数据整理

### Sprint 目标

完成 LightCone / Relic / Material / Team / Banner / Version / Event 的数据整理和内容生成。

### 关键里程碑

```
Day 11  100 LightCone + 40 Relic JSON 整理完成
Day 12  80 Material + 30 Team JSON 整理完成 + 首批装备 MD 生成
Day 13  Banner/Version/Event JSON 整理 + 生成
Day 14  Sprint 2 Review（200+ 页在线）
```

### Sprint 任务列表

| ID | 任务 | 负责 | 估时 | 状态 |
|----|------|------|------|------|
| S2B-01 | 整理 100+ LightCone JSON 数据 | Content | 6h | ⬜ |
| S2B-02 | 整理 40+ Relic JSON 数据 | Content | 4h | ⬜ |
| S2B-03 | 整理 80+ Material JSON 数据（含 farmingTips/dropLocations） | Content | 8h | ⬜ |
| S2B-04 | 整理 30+ Team JSON 数据 | Content | 4h | ⬜ |
| S2B-05 | 整理 Banner/Version/Event 初始数据（当前版号 + 历史 2 版） | Content | 4h | ⬜ |
| S2B-06 | 批量生成 30 LightCone + 20 Material + 15 Relic MD | Content+AI | 8h | ⬜ |
| S2B-07 | QA Agent 审核装备 MD + 修复 + 重跑 | Content | 6h | ⬜ |
| S2B-08 | 批量生成 Team + Banner/Version/Event 页面（~44 MD） | Content+AI | 6h | ⬜ |
| S2B-09 | QA Agent 审核剩余 MD + 修复 | Content | 4h | ⬜ |
| S2B-10 | 首页内容更新（Latest Characters + Current Banner + Popular Builds） | Dev | 3h | ⬜ |
| S2B-11 | **GSC 收录监测报告**（首次数据反馈） | Content | 1h | ⬜ |

**Sprint 2B 总计：约 54 工时**

### Sprint 2B 验收标准

- [ ] 全部 JSON 数据文件就绪（~650 个文件）
- [ ] 页面总数 ≥ 200
- [ ] 所有 MD 通过 QA Agent 审核
- [ ] GSC 收录数 > 0，开始出现曝光数据
- [ ] 首页内容聚合器正常展示

---

## Sprint 3：扩展至 400+ & SEO 基建

### Sprint 目标

Build 扩展至 3 变体/角色，新增 Pull Advice + Comparison 页面，完成全部 SEO 基建。

### 关键里程碑

```
Day 16  Build 3 变体全部生成完成（180 Build）
Day 17  Pull Advice 60 页 + Comparison 30 页生成
Day 18  Tier List 6 分榜 + 剩余 LightCone/Relic 生成
Day 19  sitemap.xml / robots.txt / JSON-LD / OG 全部就绪
Day 21  Sprint 3 Review（400+ 页 + SEO 基建完整）
```

### Sprint 任务列表

| ID | 任务 | 负责 | 估时 | 状态 |
|----|------|------|------|------|
| S3-01 | 批量生成剩余 120 个 Build Guide MD（F2P + Premium 变体） | Content+AI | 8h | ⬜ |
| S3-02 | 批量生成 60 个 Pull Advice MD | Content+AI | 8h | ⬜ |
| S3-03 | 批量生成 30 个 Comparison MD | Content+AI | 8h | ⬜ |
| S3-04 | QA Agent 审核 Build/Pull/Comparison 全部 MD + 修复 | Content | 8h | ⬜ |
| S3-05 | 生成 Tier List 6 分榜 MD（DPS/Support/Sustain/Break/F2P/Overall+Beginner） | Content+AI | 6h | ⬜ |
| S3-06 | 批量生成剩余 LightCone Pages（70 个） | Content+AI | 8h | ⬜ |
| S3-07 | 批量生成剩余 Relic Pages（25 个） | Content+AI | 4h | ⬜ |
| S3-08 | QA Agent 审核 LightCone/Relic/Tier MD + 修复 | Content | 6h | ⬜ |
| S3-09 | 生成 sitemap.xml（自动） + robots.txt | Dev | 2h | ⬜ |
| S3-10 | 全部页面 JSON-LD 结构化数据 + OG 完善 | Dev | 4h | ⬜ |
| S3-11 | 内部链接矩阵验证（检查 ≥ 5 链接/页） | Dev | 3h | ⬜ |
| S3-12 | RSS Feed 生成 | Dev | 2h | ⬜ |
| S3-13 | **GSC 数据回顾**（收录率/平均排名/Top Query/Top Landing Page） | Content | 2h | ⬜ |

**Sprint 3 总计：约 69 工时**

### Sprint 3 验收标准

- [ ] 页面总数 ≥ 400
- [ ] 每个角色 3 Build + 1 Pull Advice = 4 独立 SEO 页
- [ ] 6 个 Tier List 分榜 + 30 Comparison 页上线
- [ ] sitemap.xml 覆盖所有页面
- [ ] 内部链接矩阵生效（≥ 5 链接/页）
- [ ] GSC 开始显示 Top Query 和 Average Position

---

## Sprint 4：扩展至 700~800+ & 监控体系

### Sprint 目标

完成所有剩余内容页面生成，页面总数达到 700~800+，建立每日监控体系，达到第二阶段准入标准。

### 关键里程碑

```
Day 22~24 剩余 Material + Guides 页面全部生成
Day 25     10 篇 Guides + About Page 完成
Day 26     QA Agent 全域检查 + 修复
Day 27     Comparison 扩展 + 长尾 FAQ 扩展
Day 28     内容生成全部完成（700+ 页）
Day 28~30  Lighthouse 性能调优 + 监控体系运转
Day 30     第一阶段终验 🏁 GATE CHECK（目标 800 页）
```

### Sprint 任务列表

| ID | 任务 | 负责 | 估时 | 状态 |
|----|------|------|------|------|
| S4-01 | 批量生成剩余 Material Pages（60 个，含 Farming Tips） | Content+AI | 8h | ⬜ |
| S4-02 | 撰写 10 篇 Guides（Farming 4 / Banner 2 / Event 2 / Beginner 2） | Content+AI | 8h | ⬜ |
| S4-03 | 批量生成剩余 Team Pages（20 个） | Content+AI | 6h | ⬜ |
| S4-04 | QA Agent 全域审核当前全部页面 + 修复 | Content | 8h | ⬜ |
| S4-05 | Comparison 扩展（新增 20 组热门对比） | Content+AI | 6h | ⬜ |
| S4-06 | 长尾 FAQ 页扩展（从 longTailFAQs 批量生成独立 FAQ 页） | Content+AI | 8h | ⬜ |
| S4-07 | About Page + Privacy Policy 完善 | Content | 2h | ⬜ |
| S4-08 | Lighthouse 性能优化（目标移动端 ≥ 90） | Dev | 8h | ⬜ |
| S4-09 | 内部链接矩阵全域复查 + 修正 | Dev | 4h | ⬜ |
| S4-10 | 提交最终 sitemap 至搜索引擎 | Dev | 1h | ⬜ |
| S4-11 | **每日 GSC 监控**（收录率/Avg Position/Top Query/Top Landing Page） | Content | 1h/日 | ⬜ |
| S4-12 | **每日 Bing Webmaster 监控** | Content | 0.5h/日 | ⬜ |
| S4-13 | **Google Analytics 流量分析**（UV/Session/Page View/Bounce Rate） | Content | 0.5h/日 | ⬜ |

**Sprint 4 总计：约 77 工时（含持续监控 18h）**

### 监控指标清单（V3.0 补全）

| 指标 | 来源 | 检查频率 | 目标（Day 30） |
|------|------|---------|--------------|
| **收录率（Index Rate）** | GSC | 每日 | ≥ 30% |
| **日曝光量（Impressions）** | GSC | 每日 | ≥ 200 |
| **平均排名（Average Position）** | GSC | 每日 | ≤ 30 |
| **Top Query（前10搜索词）** | GSC | 每周 | 记录趋势 |
| **Top Landing Page（前10落地页）** | GSC | 每周 | 记录趋势 |
| **自然点击（Clicks）** | GSC | 每日 | > 0（出现即可） |
| **UV / Session** | GA4 | 每日 | 10~30 UV/Day |
| **PageSpeed（移动端）** | Lighthouse | 每周 | ≥ 90 |
| **索引页面数** | GSC | 每日 | ≥ 200 |

### Sprint 4 验收标准（= 第一阶段结束标准）

- [ ] ✅ 页面数量 ≥ 700（目标 800）
- [ ] ✅ Google Search Console 日曝光 ≥ 200
- [ ] ✅ Google 收录 ≥ 200
- [ ] ✅ 平均排名 ≤ 30
- [ ] ✅ 出现自然搜索点击（Top Query 可追溯）
- [ ] ✅ PageSpeed 移动端 ≥ 90
- [ ] ✅ 内容生产流水线完全自动化（JSON → AI → QA Agent → MD → 上线）
- [ ] ✅ 9 大模型 + 关键词系统 + QA Agent 全部覆盖

---

## 关键日期节点 V3.0

```
Day 1  ─── Sprint 1 Start（项目初始化）
Day 5  ─── 首个角色 9 内容全流程跑通（Kafka）
Day 7  ─── 🚀 正式上线 + GSC/Bing 提交（提前 7 天！）
───────────────────────────────────
Day 8  ─── Sprint 2A Start（角色数据攻坚战）
Day 10 ─── 120 页在线（60 Char + 60 Build）
───────────────────────────────────
Day 11 ─── Sprint 2B Start（装备数据攻坚战）
Day 14 ─── Sprint 2 Review（200+ 页）
───────────────────────────────────
Day 15 ─── Sprint 3 Start（Build 3 变体 + Pull Advice + Comparison）
Day 18 ─── 180 Build + 60 Pull + 30 Comparison 全部上线
Day 21 ─── Sprint 3 Review（400+ 页 + SEO 完备）
───────────────────────────────────
Day 22 ─── Sprint 4 Start（剩余内容收割）
Day 28 ─── 内容生成完成（700+ 页）
Day 30 ─── 第一阶段终验 🏁 GATE CHECK（目标 800 页）
```

---

## 内容生产节奏表 V3.0

```
                  W1    S2A    S2B    W3     W4     Total
Character Page    5      60      0      0      0     65
Build Guide       5      60      0     120     0    185
Pull Advice       0       0      0      60      0     60
Comparison        0       0      0      30     20     50
Team Guide        0       0      8      22      0     30
LightCone Page    0       0     30      70      0    100
Relic Page        0       0     15      25      0     40
Material Page     0       0     20       0     60     80
Tier List         0       0      0       6      0      6
Banner/Event/Ver  0       0      8       6      6     20
Guides            0       0      0       0     16     16
FAQ Ext           0       0      0       0     50     50
Other             3       0      0       0      2      5
───────────────────────────────────────────────────────
累计               13    133    214     553    707   ~707
```

---

## 鍏抽敭璇嶇鐞嗙郴缁燂紙V3.0 鏂板锛?
### JSON Schema

姣忎釜瑙掕壊涓€涓叧閿瘝鏂囦欢锛屽瓨鏀句簬 `src/data/keywords/{slug}-keywords.json`锛?
```json
{
  "characterId": "kafka",
  "mainKeyword": "Kafka Build",
  "secondaryKeywords": [
    "Best Kafka Build HSR",
    "Kafka Relics",
    "Kafka Team",
    "Kafka Light Cone",
    "Kafka Materials",
    "Kafka Pull Advice",
    "Is Kafka Worth Pulling",
    "Kafka F2P Build"
  ],
  "longTailFAQs": [
    "How to build Kafka in HSR?",
    "Best team for Kafka without Black Swan?",
    "What relic set for Kafka?",
    "Kafka vs Acheron who is better?",
    "Is Kafka beginner friendly?"
  ],
  "targetSearchVolume": "medium",
  "lastUpdated": "2026-06-12"
}
```

### 绠＄悊鏂瑰紡

- AI Prompt 璇诲彇鍏抽敭璇嶆枃浠讹紝**寮哄埗鍖呭惈** mainKeyword + 鑷冲皯 5 涓?secondaryKeywords
- FAQ 浠?longTailFAQs 鎵╁睍鐢熸垚 8~15 涓?- 鏈堟洿鏂板懆鏈燂細鐗堟湰鏇存柊鍚庨噸鏂板鏌ュ叧閿瘝

---

## QA Agent 瀹℃牳灞傦紙V3.0 鏂板锛?
### 瀹℃牳娴佹按绾?
```
JSON 鏁版嵁
    鈫?AI Prompt 鐢熸垚 MD
    鈫?鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?    QA Agent 瀹℃牳        鈹?鈹? 鉁?鏍囬妫€鏌ワ紙H1 瀛樺湪锛燂級      鈹?鈹? 鉁?FAQ 鏁伴噺锛堚墺 8 涓紵锛?     鈹?鈹? 鉁?Meta Description锛?20~160 瀛楃锛燂級鈹?鈹? 鉁?鍐呴儴閾炬帴锛堚墺 5 涓紵锛?      鈹?鈹? 鉁?瀛楁暟杈炬爣锛堚墺 绫诲瀷鏈€浣庤姹傦紵锛?   鈹?鈹? 鉁?鐗堝彿鏍囨敞锛堟墍鏈夐〉闈㈠惈鐗堝彿锛燂級    鈹?鈹? 鉁?鍏抽敭璇嶈鐩栵紙mainKeyword 鍑虹幇 鈮?3娆★紵锛夆攤
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?           鈫?      鈹屸攢鈹€ 閫氳繃锛熲攢鈹€鈹?      鈫?          鈫?   Markdown    淇 + 閲嶈窇
      鈫?          鈫?  鍙戝竷涓婄嚎    鈫愨攢鈹€鈹?```

### 瀹炵幇鏂瑰紡

- Astro 鏋勫缓鏃舵垨 CI 涓繍琛?`qa-check.ts` 鑴氭湰
- 棰勫畾涔夎鍒欓泦锛歚src/qa/rules.json`
- 鏈€氳繃椤硅緭鍑哄埌 `qa-report.json`锛岄樆鏂瀯寤烘垨鍙戝嚭璀﹀憡

---

## 椋庨櫓璺熻釜琛紙V3.0 鏇存柊锛?
| 椋庨櫓 | 姒傜巼 | 褰卞搷 | 缂撹В鎺柦 | Sprint |
|------|------|------|----------|--------|
| AI 鐢熸垚鍐呭璐ㄩ噺涓嶈揪鏍?| 涓?| 楂?| S1 QA Agent 鍏呭垎娴嬭瘯 + 浜哄伐鎶芥 10% | S1~S3 |
| 瑙掕壊鏁版嵁鎷嗗垎宸ヤ綔閲忓ぇ | 楂?| **楂?* | **S2 鎷嗗垎涓?2A(瑙掕壊) + 2B(瑁呭)**锛屽垎鎵规敾鍧?| S2A~S2B |
| 鎵归噺鐢熸垚鍚庝慨澶嶈€楁椂瓒呴鏈?| 楂?| 涓?| **宸ユ椂宸茬炕鍊?*锛?h鈫?~12h per batch锛?| S2~S4 |
| Google 鏀跺綍閫熷害鎱?| 涓?| 涓?| **Day 7 鎻愬墠涓婄嚎**锛岃 Google 鎻愬墠鎶撳彇 | S1~S4 |
| 鍏抽敭璇嶈鐩栦笉鍏?| 涓?| 涓?| S1 寤虹珛鍏抽敭璇?JSON Schema锛孲2A 鎵归噺濉厖 | S1~S2A |
| QA Agent 璇姤/婕忔姤 | 涓?| 涓?| S1 鐢?5 瑙掕壊鍏呭垎楠岃瘉 + 杩唬瑙勫垯 | S1~S2 |
| 700~800 椤电敓鎴愪笉杈鹃鏈?| 浣?| 涓?| Comparison + Guides 鍙伒娲绘墿灞曪紝淇濆簳 600+ | S3~S4 |
| PageSpeed 涓嶈揪鏍?| 浣?| 涓?| Astro SSG + 闆堕噸 JS + 鍥剧墖鎳掑姞杞?| S1~S4 |

---

> **鏂囨。鐗堟湰**锛歏3.0
> **涓婁竴鐗堟湰**锛歏2.0锛?026-06-12锛?> **鏇存柊鏃ユ湡**锛?026-06-12
> **鍙樻洿鍐呭锛圴2.0鈫扸3.0锛?*锛?> - Sprint 2 鎷嗗垎涓?S2A锛堣鑹叉暟鎹級鍜?S2B锛堣澶囨暟鎹級锛岄檷浣庡穿婧冮闄?> - 鎵归噺鐢熸垚宸ユ椂缈诲€嶏紙鍔犲叆 QA 淇/鏍煎紡缁熶竴/閾炬帴妫€鏌ユ椂闂达級
> - Sprint 4 椤甸潰鐩爣浠?480鈫?*700~800+**
> - Sprint 1 鏂板銆屽叧閿瘝绠＄悊绯荤粺銆岼SON Schema + 鍒濆濉厖
> - 鏂板銆孮A Agent 瀹℃牳灞傘€嶏細JSON 鈫?Prompt 鈫?AI 鈫?**QA Agent** 鈫?MD
> - 鐩戞帶鎸囨爣琛ュ叏锛氭敹褰曠巼 / 骞冲潎鎺掑悕 / Top Query / Top Landing Page
> - **Day 7 鎻愬墠涓婄嚎** + GSC 鎻愪氦锛堣竟鍋氳竟楠岃瘉锛岄潪鍋氬畬鍐嶉獙璇侊級
> - 鍏抽敭鏃ユ湡鑺傜偣 + 鍐呭鐢熶骇鑺傚琛?+ 椋庨櫓琛ㄥ叏闈㈡洿鏂?