# GameBeliever 第一阶段 开发任务清单（V3.0 — 个人开发者节奏）

## 设计哲学

> 这不是一个 10 人团队的 Sprint 计划。这是一个个人开发者能活下去的节奏。
> 每个 Sprint 以「是否能按时完成」为首要标准。

## 任务总览

| 阶段 | 时间 | 核心目标 | 页面里程碑 | 上线？ |
|------|------|----------|-----------|--------|
| Sprint 0 | Day 1~3 | 关键词库 + Prompt 体系 + 内容流水线 | 3 角色测试页 | — |
| Sprint 1 | Day 4~7 | 3 模板 + 20 角色上线 | 40 页 | **Day 5** |
| Sprint 2 | Day 8~14 | 扩展至 60 角色 + Build + Team | 150 页 | 持续 |
| Sprint 3 | Day 15~21 | Tier List + LightCone + SEO | 250 页 | 持续 |
| Sprint 4 | Day 22~30 | Material + Relic + 监控 | 350+ 页 | 持续 |

> **设计原则**：先上线、先验证、先拿到 Google 反馈。不做「做完再验证」的事。
> Build 从 180 降至 60（Phase 1 每角色仅 1 个）。F2P/Premium 延至 Phase 2。

---

## Sprint 0：关键词库 + Prompt 体系（Day 1~3）

### Sprint 目标

**只做三件事**：关键词 JSON 库建立、AI Prompt 体系设计、3 角色全流程验证。不做任何页面模板开发，不碰 Astro。

### 任务列表

| # | 任务 | 产出 | 优先级 |
|---|------|------|--------|
| 0.1 | 关键词调研：Top 20 角色 search volume 摸底 | 关键词调研表 | P0 |
| 0.2 | 建立关键词 JSON Schema | src/data/keywords/schema.json | P0 |
| 0.3 | 填充首批 3 角色关键词文件（Kafka/Firefly/Acheron） | 3 个 {slug}-keywords.json | P0 |
| 0.4 | 设计 Character Prompt 模板 | prompts/character-prompt.md | P0 |
| 0.5 | 设计 Build Prompt 模板（仅 General） | prompts/build-prompt.md | P0 |
| 0.6 | 设计 Team Prompt 模板 | prompts/team-prompt.md | P0 |
| 0.7 | 设计 QA Agent 审核规则（FAQ/字数/Meta/链接/关键词） | src/qa/rules.json | P0 |
| 0.8 | 准备 Kafka JSON 数据（core + skills + traces + eidolons + stats） | src/data/characters/kafka/ | P0 |
| 0.9 | 准备 Firefly JSON 数据 | src/data/characters/firefly/ | P0 |
| 0.10 | 准备 Acheron JSON 数据 | src/data/characters/acheron/ | P0 |
| 0.11 | AI 生成 3 Character + 3 Build + 3 Team = 9 篇 MD | 9 个 .md | P0 |
| 0.12 | QA Agent 审核 9 篇 + 迭代 Prompt | 审核报告 + Prompt 优化 | P0 |

**Sprint 0 总计：约 24 工时（个人 3 天可完成）**

### Sprint 0 验收标准

- [ ] 3 角色关键词 JSON 就绪，格式通过 Schema 校验
- [ ] Character/Build/Team 3 个 Prompt 可用，生成内容质量 ≥ 80 分
- [ ] QA Agent 可自动检测 FAQ/字数/Meta/链接/关键词覆盖
- [ ] 3 角色 × 3 篇 = 9 篇 MD 全部通过 QA 审核

---

## Sprint 1：上线（Day 4~7）

### Sprint 目标

开发 3 种页面模板（Character/Build/Team），准备 20 角色 JSON 数据，**Day 5 部署上线**并提交 GSC。

### Day 4：Astro 模板开发

| # | 任务 | 产出 | 优先级 |
|---|------|------|--------|
| 1.1 | 初始化 Astro 项目 + TypeScript | 项目骨架 | P0 |
| 1.2 | 定义 3 个 TS 接口（Character/Build/Team） | 类型文件 | P0 |
| 1.3 | 创建 Layout.astro + SEO Head 组件 | 全局布局 | P0 |
| 1.4 | 创建 CharacterPage.astro | 角色页模板 | P0 |
| 1.5 | 创建 BuildGuide.astro | Build 页模板 | P0 |
| 1.6 | 创建 TeamGuide.astro | 队伍页模板 | P0 |
| 1.7 | 首页开发（内容聚合器风格） | / 页面 | P0 |
| 1.8 | Header/Footer 导航 + 移动端响应式 | 全局导航 | P1 |

### Day 5：20 角色上线

| # | 任务 | 产出 | 优先级 |
|---|------|------|--------|
| 1.9 | 整理 20 角色 JSON 数据（优先 5星 + 热门 4星） | 20 角色 × 6 文件 | P0 |
| 1.10 | 批量生成 20 Character MD + QA 审核 | 20 个 MD | P0 |
| 1.11 | 批量生成 20 Build MD（每角色 1 个） + QA 审核 | 20 个 MD | P0 |
| 1.12 | 批量生成 10 Team MD + QA 审核 | 10 个 MD | P1 |
| 1.13 | **配置 Cloudflare Pages + 部署上线** | 网站可公网访问 | P0 |
| 1.14 | **提交 GSC + Bing Webmaster 验证 + sitemap** | 搜索引擎接入 | P0 |
| 1.15 | 接入 GA4 | 数据上报正常 | P0 |

### Day 6~7：缓冲

| # | 任务 | 产出 | 优先级 |
|---|------|------|--------|
| 1.16 | 修复线上问题 + 内容质量修复 | — | P0 |
| 1.17 | **首次 GSC 数据检查**（索引状态/抓取错误） | GSC 报告 | P0 |
| 1.18 | 整理剩余 40 角色 JSON 数据 | 40 角色就绪 | P1 |

**Sprint 1 总计：约 50 工时**

### Sprint 1 验收标准

- [ ] 生产环境 URL 可公网访问
- [ ] 20 Character + 20 Build + 10 Team = 50 页在线
- [ ] GSC + Bing 验证通过，sitemap 提交成功
- [ ] GA4 数据上报正常
- [ ] 所有 MD 通过 QA Agent 审核
- [ ] 首页内容聚合器正常展示

---

## Sprint 2锛氭墿灞曡嚦 60 瑙掕壊 + Build + Team锛圖ay 8~14锛?
### Sprint 鐩爣

瀹屾垚鍏ㄩ儴 60 瑙掕壊鏁版嵁 + 鎵归噺鐢熸垚 60 Build锛堟瘡瑙掕壊 1 涓級锛屾墿灞?Team 鑷?30 闃燂紝鎬婚〉闈?150+銆?*鎸佺画閮ㄧ讲涓婄嚎**锛屽叧娉?GSC 鏀跺綍鍙嶉銆?
### 浠诲姟鍒楄〃

| # | 浠诲姟 | 浜у嚭 | 浼樺厛绾?|
|---|------|------|--------|
| 2.1 | 濉厖鍓╀綑 57 瑙掕壊鍏抽敭璇?JSON | 57 涓?keywords 鏂囦欢 | P0 |
| 2.2 | 鏁寸悊鍓╀綑 40 瑙掕壊 JSON 鏁版嵁 | 40 瑙掕壊 脳 6 鏂囦欢 | P0 |
| 2.3 | 鎵归噺鐢熸垚鍓╀綑 40 Character MD + QA | 40 涓?MD | P0 |
| 2.4 | 鎵归噺鐢熸垚鍓╀綑 40 Build MD + QA | 40 涓?MD | P0 |
| 2.5 | 鎵归噺鐢熸垚鍓╀綑 20 Team MD + QA | 20 涓?MD | P1 |
| 2.6 | 鐢熸垚 sitemap.xml + robots.txt | SEO 鍩哄缓 | P0 |
| 2.7 | 鎵€鏈夐〉闈㈡坊鍔?JSON-LD + OG 鏍囩 | 缁撴瀯鍖栨暟鎹?| P0 |
| 2.8 | **GSC 鏀跺綍鐩戞祴**锛堥娆℃暟鎹弽棣堬細绱㈠紩/鏇濆厜/鎺掑悕锛?| GSC 鍛ㄦ姤 | P0 |
| 2.9 | 棣栭〉鏇存柊锛圠atest Characters + Popular Builds锛?| 棣栭〉鍔ㄦ€佸唴瀹?| P1 |

**Sprint 2 鎬昏锛氱害 42 宸ユ椂**

### Sprint 2 楠屾敹鏍囧噯

- [ ] 60 瑙掕壊鍏ㄩ儴鍦ㄧ嚎锛圕haracter + Build锛?- [ ] 30 Team 椤靛湪绾?- [ ] 椤甸潰鎬绘暟 鈮?150
- [ ] sitemap + robots.txt + JSON-LD + OG 灏辩华
- [ ] GSC 寮€濮嬫樉绀虹储寮曢〉闈㈡暟

---

## Sprint 3锛歍ier List + LightCone + SEO锛圖ay 15~21锛?
### Sprint 鐩爣

鐢熸垚 Tier List锛? 鍒嗘锛? LightCone 100 椤碉紝椤甸潰鎵╁睍鑷?250+銆傚畬鍠?SEO 鍩哄缓锛堝唴閮ㄩ摼鎺ョ煩闃?RSS锛夈€?
### 浠诲姟鍒楄〃

| # | 浠诲姟 | 浜у嚭 | 浼樺厛绾?|
|---|------|------|--------|
| 3.1 | 鏁寸悊 Tier List 璇勭骇鏁版嵁锛? 鍒嗘锛歄verall+DPS+Support+Sustain+Beginn+B+F2P锛?| 6 涓?JSON | P0 |
| 3.2 | 鐢熸垚 Tier List 6 涓垎姒?MD + QA | 6 涓?MD | P0 |
| 3.3 | 鏁寸悊 100+ LightCone JSON | lightcones/ 鐩綍 | P0 |
| 3.4 | 鎵归噺鐢熸垚 100 LightCone MD + QA | 100 涓?MD | P0 |
| 3.5 | 鐢熸垚 Banner/Version/Event 椤甸潰锛堝悇 4~6 涓級 | ~14 涓?MD | P1 |
| 3.6 | 鍐呴儴閾炬帴鐭╅樀閮ㄧ讲锛堣嚜鍔ㄧ敓鎴?鈮?5 閾炬帴/椤碉級 | Astro 缁勪欢 | P0 |
| 3.7 | RSS Feed 鐢熸垚 | /rss.xml | P1 |
| 3.8 | **GSC 鏁版嵁鍥為【**锛堟敹褰曠巼/Avg Position/Top Query锛?| SEO 鎶ュ憡 | P0 |

**Sprint 3 鎬昏锛氱害 40 宸ユ椂**

### Sprint 3 楠屾敹鏍囧噯

- [ ] 6 涓?Tier List 鍒嗘鍦ㄧ嚎
- [ ] 100 LightCone 椤靛湪绾?- [ ] Banner/Version/Event 椤甸潰涓婄嚎
- [ ] 鍐呴儴閾炬帴鐭╅樀鐢熸晥锛堚墺 5 閾炬帴/椤碉級
- [ ] 椤甸潰鎬绘暟 鈮?250
- [ ] GSC 寮€濮嬫樉绀?Top Query

---

## Sprint 4锛歁aterial + Relic + 鐩戞帶锛圖ay 22~30锛?
### Sprint 鐩爣

瀹屾垚 Material 80 椤?+ Relic 40 椤碉紝鎾板啓 10 绡?Guides锛屽缓绔嬫瘡鏃ョ洃鎺т綋绯汇€?*绗竴闃舵鐩爣锛?50+ 椤碉紝Google 鏀跺綍 鈮?100銆?*

### 浠诲姟鍒楄〃

| # | 浠诲姟 | 浜у嚭 | 浼樺厛绾?|
|---|------|------|--------|
| 4.1 | 鏁寸悊 80 Material JSON锛堝惈 farmingTips锛?| materials/ 鐩綍 | P0 |
| 4.2 | 鎵归噺鐢熸垚 80 Material MD + QA | 80 涓?MD | P0 |
| 4.3 | 鏁寸悊 40 Relic JSON | relics/ 鐩綍 | P0 |
| 4.4 | 鎵归噺鐢熸垚 40 Relic MD + QA | 40 涓?MD | P0 |
| 4.5 | 鎾板啓 10 绡?Guides锛團arming/Banner/Beginner/Event 鍚?2~3 绡囷級 | 10 涓?MD | P1 |
| 4.6 | About Page + Privacy Policy | /about | P1 |
| 4.7 | Lighthouse 鎬ц兘浼樺寲锛堢洰鏍囩Щ鍔ㄧ 鈮?90锛?| PageSpeed 杈炬爣 | P0 |
| 4.8 | QA Agent 鍏ㄥ煙妫€鏌ュ叏閮ㄩ〉闈?+ 淇 | 鍏ㄥ煙璐ㄩ噺淇濊瘉 | P0 |
| 4.9 | 鎻愪氦鏈€缁?sitemap | 澧為噺绱㈠紩 | P0 |
| 4.10 | **姣忔棩 GSC 鐩戞帶**锛堟敹褰曠巼/鏇濆厜/鎺掑悕/Top Query/Top Landing Page锛?| GSC 鏃ユ姤 | P0 |
| 4.11 | **姣忔棩 GA4 娴侀噺鍒嗘瀽**锛圲V/Session/Page View锛?| GA 鍛ㄦ姤 | P0 |
| 4.12 | 绗竴闃舵缁堥獙鎶ュ憡 | 楠屾敹鏂囨。 | P1 |

**Sprint 4 鎬昏锛氱害 55 宸ユ椂锛堝惈鎸佺画鐩戞帶 18h锛?*

### 鐩戞帶鎸囨爣娓呭崟

| 鎸囨爣 | 鏉ユ簮 | 棰戠巼 | Day 30 鐩爣 |
|------|------|------|-----------|
| 鏀跺綍鐜囷紙Index Rate锛?| GSC | 姣忔棩 | 鈮?30% |
| 鏃ユ洕鍏夐噺 | GSC | 姣忔棩 | 鈮?100 |
| 骞冲潎鎺掑悕 | GSC | 姣忔棩 | 鈮?50 |
| Top 10 Query | GSC | 姣忓懆 | 璁板綍瓒嬪娍 |
| Top 10 Landing Page | GSC | 姣忓懆 | 璁板綍瓒嬪娍 |
| 鑷劧鐐瑰嚮 | GSC | 姣忔棩 | > 0 |
| UV | GA4 | 姣忔棩 | 10~30/Day |
| PageSpeed 绉诲姩绔?| Lighthouse | 姣忓懆 | 鈮?90 |

### Sprint 4 楠屾敹鏍囧噯锛? 绗竴闃舵缁撴潫锛?
- [ ] 椤甸潰鎬绘暟 鈮?350
- [ ] Google 鏀跺綍 鈮?100
- [ ] 鏃ユ洕鍏?鈮?100
- [ ] 鍑虹幇鑷劧鎼滅储鐐瑰嚮
- [ ] PageSpeed 绉诲姩绔?鈮?90
- [ ] 鍐呭鐢熶骇娴佹按绾胯嚜鍔ㄥ寲锛圝SON 鈫?AI 鈫?QA Agent 鈫?MD 鈫?涓婄嚎锛?- [ ] 鍏抽敭璇嶅簱瑕嗙洊鍏ㄩ儴 60 瑙掕壊

---

## 鍐呭鐢熶骇鏄犲皠锛圴3.0 鈥?Phase 1 绮剧畝鐗堬級

| # | 鍐呭绫诲瀷 | 鏁版嵁婧?| Phase 1 | Phase 2 |
|---|---------|--------|---------|---------|
| 1 | Character Page | core + skills + traces | 鉁?60 椤?| 涓嶅彉 |
| 2 | Build Guide | 1 Build/瑙掕壊 | 鉁?60 椤?| +F2P/Premium锛?120 椤碉級 |
| 3 | Team Guide | teams/ | 鉁?30 椤?| 鎵╁睍鑷?50 椤?|
| 4 | LightCone Page | lightcones/ | 鉁?100 椤?| 涓嶅彉 |
| 5 | Tier List | tier-lists/ | 鉁?6 鍒嗘 | 涓嶅彉 |
| 6 | Material Page | materials/ | 鉁?80 椤?| 鍚?Farming Guide |
| 7 | Relic Page | relics/ | 鉁?40 椤?| 涓嶅彉 |
| 8 | Banner/Event/Version | banners+events+versions/ | 鉁?14 椤?| 鎵╁睍 |
| 9 | Guides | guides/ | 鉁?10 绡?| 鎵╁睍 |
| 10 | Pull Advice | 鐙珛鐢熸垚 | 寤惰嚦 Phase 2 | 60 椤?|
| 11 | Comparison | 浜ゅ弶鐢熸垚 | 寤惰嚦 Phase 2 | 30 椤?|

**Phase 1 鎬昏锛?50+ 椤?| Phase 2 鎵╁睍锛?210 椤?鈫?560+ 椤?*

---

## 浼樺厛绾х煩闃?
| 浼樺厛绾?| 鍐呭绫诲瀷 | 鍘熷洜 |
|--------|---------|------|
| **P0** | Character / Build / Tier List | 鏈€楂樻悳绱㈤噺锛屾渶蹇敹褰?|
| **P1** | Team / LightCone | 涓瓑鎼滅储閲忥紝Build 琛嶇敓 |
| **P2** | Material / Relic | 闀垮熬鎼滅储锛屽欢鍚庤ˉ鍏?|
| **P3** | Banner / Event / Version / Guides | 鏃舵晥鎬у唴瀹癸紝鎸夐渶澧炲姞 |

---

## 浠诲姟渚濊禆鍥撅紙V3.0锛?
```
Sprint 0锛圖ay 1~3锛?  鍏抽敭璇嶅簱 鈫?Prompt 鈫?QA Agent 鈫?3 瑙掕壊楠岃瘉
    鈫?Sprint 1锛圖ay 4~7锛?  3 妯℃澘 鈫?20 瑙掕壊 鈫?Day 5 涓婄嚎 鈫?GSC 鎻愪氦
    鈫?Sprint 2锛圖ay 8~14锛?  60 瑙掕壊鏁版嵁 鈫?60 Build 鈫?30 Team 鈫?150 椤?鈫?GSC 鍙嶉
    鈫?Sprint 3锛圖ay 15~21锛?  Tier List(6) 鈫?LightCone(100) 鈫?鍐呴儴閾炬帴鐭╅樀 鈫?250 椤?    鈫?Sprint 4锛圖ay 22~30锛?  Material(80) 鈫?Relic(40) 鈫?Guides(10) 鈫?鍏ㄥ煙 QA 鈫?350+ 椤?```

---

## 鏁版嵁鏂囦欢瑙勬ā棰勪及锛圴3.0锛?
| 鏁版嵁妯″瀷 | Phase 1 | Phase 2 |
|---------|---------|---------|
| Character锛? 鏂囦欢/瑙掕壊锛?| 360 | 360 |
| Keywords锛? 鏂囦欢/瑙掕壊锛?| 60 | 60 |
| Build | 60 | 180 |
| Team | 30 | 50 |
| LightCone | 100 | 100 |
| Relic | 40 | 40 |
| Material | 80 | 80 |
| Tier List | 6 | 6 |
| Banner/Version/Event | 14 | 20 |
| **鍚堣** | **~750** | **~896** |

---

> **鏂囨。鐗堟湰**锛歏3.0
> **涓婁竴鐗堟湰**锛歏2.0锛?026-06-12锛?> **鏇存柊鏃ユ湡**锛?026-06-12
> **鍙樻洿鍐呭锛圴2.0鈫扸3.0锛?*锛?> - 鏂板 Sprint 0锛堝叧閿瘝搴?+ Prompt + QA Agent + 3 瑙掕壊楠岃瘉锛?> - Sprint 1 浠?11 妯℃澘缂╁噺鑷?3 妯℃澘锛圕har/Build/Team锛?> - Day 5 棣栨涓婄嚎锛堝師 Day 14锛夛紝Google 鎻愬墠 9 澶╂姄鍙?> - Build 浠?180 闄嶈嚦 60锛圥hase 1 姣忚鑹蹭粎 1 涓級
> - 浼樺厛绾х煩闃碉細P0=Char/Build/Tier, P1=Team/LC, P2=Material/Relic
> - 鏂板鍏抽敭璇嶅簱 + QA Agent 瀹℃牳浠诲姟
> - Pull Advice / Comparison / F2P/Premium Build 寤惰嚦 Phase 2
> - 椤甸潰鐩爣浠?480+ 璋冩暣涓?Phase 1 350+ / Phase 2 560+
