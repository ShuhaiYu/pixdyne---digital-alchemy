# Claude Code SEO 实战工作流(每月 5 万点击）— Jono Catliff 拆解

> 来源：YouTube《Claude Code SEO: How I Got 50,000 Clicks Per Month》(Jono Catliff，2026-04)。核心：不写代码、用 Claude Code + antigravity 把一整套 SEO 工作流（原本需要整个团队全职做）压缩到一个人 + 一个 skill 来跑。下面是他全部工作重点的逐步拆解。

---

## 0. 全局思路（为什么这套有效）

- **SEO 的本质是排到 Google 前面**：第 1 名拿走约 40% 点击，第 2 名约 20%，往下断崖式下跌。目标是让尽量多的页面、尽量快地排到尽量高。
- **错误策略的代价是滞后的**：用错方法往往 2~4 年后才发现，所以方法论比蛮干更重要。
- **AI SEO ≈ 传统 SEO**：ChatGPT / Perplexity / Claude 回答前本质也是先去搜索引擎抓结果。SEO 排得好，AI SEO 自然排得好，不必单独追这个热点。
- **整个 SEO 拆成 4 块**：① 找关键词 ② On-Page SEO（写什么、结构、发布）③ Technical SEO（站点怎么构建：速度、Core Web Vitals）④ Off-Page SEO（外部对你的信任/权威）。
- **真正赚钱的只有 2 个打法**：① 规模化博客文章（blog posts at scale）② 高转化服务页（service pages）。作者靠这两个在上一家公司赚了 50 万美元+。

## 1. 搭站（Claude Code + antigravity）

- 去 `antigravity.google` 下载免费桌面应用，在 extensions 里搜索安装 **Claude Code**。会复制粘贴就够了，不需要懂代码。
- 每个 Claude Code 项目都活在一个文件夹里。新建一个空文件夹（如 `SEO brief`）。
- **关键文件 `Claude.md`**：相当于给新员工的 SOP/培训手册，告诉 Claude 怎么干活、行为规范。作者提供了现成的 web app 版 `Claude.md` 直接粘进去。
- 用一句 prompt 让 Claude 建出 3 个页面：**homepage + 博客 index 页 + 服务 index 页**。`index 页` = 列出所有同类文章的列表页（有 100 篇博客就列 100 条）。
- **防 AI slop 的关键**：建站时必须给设计参考图。去 **Dribbble** 搜对应行业（如 plumbing website），截图，在 Claude 里用 `+` 上传截图，要求「克隆这个设计」。
- 对比：WordPress 配 hosting / DNS 要花 4~5 小时，这套几秒钟出雏形，本地 `localhost` 即可预览。

## 2. ⭐ 渲染方式：必须用 SSG（最重要的技术前提）

用点披萨比喻三种渲染：

- **SSG 静态生成**：披萨已做好，10 秒拿走 → Google 爬虫秒拿到完整页面。**这是我们要的。**
- **SSR 服务端渲染**：现点现做，要等 → 爬虫要等加载，不够优化。
- **CSR 客户端渲染**：自己进厨房做，常常做不出来 → 爬虫常常拿到空页面，几乎无法被索引。

> SEO 的前提是 Google 能爬到完整页面；爬不到，做 10 年 SEO 也白搭。作者提供的 `Claude.md` 默认强制 Claude 用 SSG。

## 3. 关键词研究（用 SEMrush，不要让 Claude 瞎猜）

- 直接问 Claude 要关键词 = 它瞎猜，没有真实搜索量/难度数据，会害死你。必须用独立 SEO 工具，作者用 **SEMrush**（有免费试用）。
- 路径：SEO → **Keyword Magic Tool** → 输入词根（如 `plumber`）→ 返回上百万变体。
- **三个筛选条件（找「金块/草垛里的针」）**：
  1. **Keyword Difficulty ≤ 30**：新站才有机会排上去（KD 越低，一篇博客就可能冲到前 3）。
  2. **搜索量 ≥ 100/月**：太低没人搜，不值得排。
  3. **搜索意图 = 信息型（informational）**：博客要抓信息型查询（如「水管工多少钱」），而非交易型（如「买 Nike 鞋」）。
- **避坑**：别去排别人的品牌名 / 同行公司名 / 想入行的人搜的词（如「怎么成为水管工」）。要排潜在客户会搜、可能转化成付费的词。
- **补充挖词**：① Questions 标签（天然的博客选题）② 漏斗上游的「邻近话题」（如「2026 最佳软水机」「无水箱热水器」，提前抓住还没准备下单的人）③ 分析竞争对手在排的词，拿过来用。
- 把选好的词加进 keyword list → 导出 **CSV** → 拖进 antigravity，重命名为 `keywords`。

## 4. 生产博客文章（三步：生成 → 注入人味 → 偷格式）

### 4.1 生成初稿
- Prompt 让 Claude 用某个关键词写一篇博客，同时：① 生成 **keyword cluster**（关键词簇）② 从 **Pexels** 拉免费图（把 Pexels API key 放进 `.env` 文件）。
- **keyword cluster 的意义**：一篇文章不要只排一个词。围绕一个 root keyword（如「how to unclog a drain」）堆叠多个二级/三级相关词（unclog kitchen sink、slow drain、what dissolves hair in drain…），一篇文章可同时排几十甚至上百个词，最大化曝光。
- `.env` = 存 API key / 密码等不想公开的东西的文件。

### 4.2 ⭐ 注入「人味」（避免 AI slop）
- 直接生成的稿子又干又无聊，没人读完 = 转化不了。必须让它听起来像「你」。
- 准备参考素材并让 Claude 建立独立参考文件：**voice（语气）/ humor（幽默）/ opinions（观点）/ stats（真实数据，如修过多少根管、开店几年）/ stories（真实案例轶事）**。
- 素材来源：你的通话/视频转录、Gmail、LinkedIn 帖子，或任何你喜欢的网上文风段落。把这些喂给 Claude 去更新上述参考文件。
- 作者的幽默基调示例：「开头 50 词里没有一个 dad joke 就重写；我们不是宣传册，是酒吧里喝了一杯酒、正在跟你解释马桶怎么工作的那个人。」

### 4.3 ⭐ 从搜索引擎「偷」获胜格式
- 写之前先搜目标关键词，找排名前 3（排除 Reddit 之类）的文章。
- 让 Claude **分析前 3 名**：平均字数、H2 标题数量、图片数量、覆盖的主题 → **取三者平均值 = 获胜公式**，据此生成自己文章的结构。
- 把「用我的 voice/humor 改写」+「先 Google 分析前 3 名再写、偷格式与长度」合并进一个 prompt 跑。

### 4.4 心法：SEO 是黑箱，但内容为王
- 没人确切知道排名算法（200+ 传闻信号：质量、停留时长 dwell time、跳出率、滚动深度、点击率…）。
- **逆向 Google 的动机**：Google 要靠广告赚钱 → 要让人反复回来 → 必须提供高质量内容。所以你只要持续产出**真正好读的内容**，就会赢。指标重要，但内容是第一位。

## 5. 服务页 Service Pages（第二个赚钱打法）

- **博客 vs 服务页**：博客 = 信息型，建立 **topical authority / 域名权威**（抬高整片海，把所有船=服务页一起抬高）；服务页 = **money keywords**，搜的人直接想下单（如「plumbing Toronto」），目标是让人**填表单 → 你打电话 → 成交**。
- **拉链法（zipper）造词**：一边是「服务」（emergency plumber、drain cleaning、hot water repair…），一边是「城市/行政区」（Vancouver、Toronto…），两两拼接成「emergency plumber Toronto」这类页面。
- **数量要克制**：服务页内容高度相似，别造上千个甚至几百个，过多会被 Google 当负面信号。要「有品味地」做。
- **找服务页关键词**：SEMrush Keyword Magic → 按 **CPC（每次点击成本）排序**。CPC 高 = 广告主在花钱抢 = money keyword（正常 3~20 美元/次）。规律就是「服务 + 城市」。导出 CSV 拖进项目，命名 `service keywords`，用同样方式让 Claude 生成页面。
- **转化优化（funnel 思维）**：排上去只是第一步。作者跑 **Google Ads** 测了 5~10 个落地页版本，把最佳版本做到 **20% 转化率**（5 个访客 1 个成交），再把这个获胜模板套到所有服务页。

## 6. ⭐ On-Page SEO（一个 prompt 自动跑 80+ 信号）

- 不用自己懂细节：把作者提供的 **80+ 信号 checklist** 直接粘进 Claude，让它优化即可。
- checklist 里的代表项：① 外链（external links）② 指向自己其它博客的内链（internal links）③ 前 100 词出现主关键词 ④ 每篇 4~8 个问题 ⑤ 全页有且仅有一个 H1（H1/H2/H3 层级正确）。
- **关键约束**：优化时必须**保留 voice/humor**，不能把文章改回又干又无聊 —— SEO 与「内容好读」要平衡，跳出率高一样排不上去。
- 自动产出还包括：2~3 条外链 + 3~5 条内链、首 100 词含主词、以及 **meta title + meta description**（页面上看不见，在 `<head>` 里，F12 → Elements → 搜 OG 可查）。
- **博客和服务页都要做**，每一页都做。

## 7. ⭐ Technical SEO（把 Lighthouse 刷到 100）

三件事：

1. **sitemap.xml**：告诉 Google 你有哪些页面、怎么收进搜索引擎。没有它一切白搭。
2. **robots.txt**：告诉爬虫哪些能爬、哪些不能（通常全放行，只屏蔽 admin 登录这类不想被索引的页）。
3. **Google Lighthouse**：F12 → More tools → Developer tools → Lighthouse → 分析页面。打分 4 项：**SEO / Accessibility / Best Practices / Performance**，目标全部 **100/100**。

- **做法**：把所有报错项展开，复制整份 Lighthouse 报告 → 粘进 Claude → 「请优化到 4 项全 100，并生成 robots.txt 和 sitemap.xml」。没到 100 就把新报告再贴回去，来回迭代直到满分。原本要懂 render-blocking、legacy JS、LCP、网络依赖树等，现在 Claude 几分钟搞定。

## 8. ⭐ 封装成可复用的 Claude Code Skill

- 把前面整套流程**打包成一个 skill**，以后只输入 `blog` 一个词，就自动：抓 keyword → 建 cluster → 拉 Pexels 图 → 用你的 voice/humor 写 → 做 On-Page SEO → 用已优化好的统一模板保证 Technical SEO。
- Prompt 要点（创建名为 `blog` 的 skill）：从 `keywords.csv` 取词、建簇、发布并配 Pexels 图、注入写作风格、做 on-page、**复用同一套已优化的页面模板**、且**不重复用已用过的关键词**。建完刷新对话即可用。
- 服务页可同样封装。可设成每天早 9 点自动跑。
- **⚠️ 节奏控制（防封号）**：不要一次性扔上千篇，Google 会盯上发布量异常。慢慢来：Day1 发 1 篇、Day2 发 1、Day3 发 2、Day5 发 3、Day8 发 4…… 保持合理 cadence。

## 9. Off-Page SEO（作者本人基本不做）

- **强烈警告**：每次 Google 算法更新，被坑最惨的往往是做 off-page 的人。最该避开的是 **PBN（私有博客网络 / 链接农场）**——「$5 给你 100 条外链」就是这类，Google 一旦识别，可能永久重创甚至拉黑你的站，且很多便宜「SEO 专家」即便今天不黑帽，3 年后大概率也会把你坑了。
- 作者真正认为最稳的做法：**专注找金块关键词、踏实排上去**，off-page 非必需。
- 但列了 **4 个合规的外链方式**：
  1. **Broken backlink swapping**：用 SEMrush 审计大站（如 Homestars），找它们指向外部的失效链接（404），联系对方「我有覆盖同主题的页面，要不要换成我的」。
  2. **Guest posting**：Google 搜 `行业 + "write for us"`（加引号精确匹配），给别人写博客并放回链（backlink = 任何外部站点指向你的链接）。
  3. **Hero / journalist outreach（HARO 类）**：记者发问 → 你作为专家作答 → 对方给你回链。
  4. **付费优质外链**：像 Forbes/TechCrunch 之类的 pay-to-play 模式，付费换权威域名的回链（传递 link juice / 权威 / 信任）。

## 10. 上线部署 + 收尾 4 步

**部署（免费，用 GitHub + Vercel）**
- GitHub = 代码版的 Google Drive。新建 repo（设为 private），复制提供的命令，回到 Claude 让它「把整个项目上传到这里」。
- 去 **Vercel** 建免费账号 → New Project → 连接 GitHub → import 项目 → **preset 必须设为 Next.js** → 一键 deploy（约 60 秒上线）。域名可在 Vercel 买，或从 Namecheap 等便宜买后导入。

**上线后 4 步**
1. **Google My Business**：免费商家信息，2026 年最低垂的果子，能带来大量点击/来电。
2. **Google Search Console**：贴入 Vercel 站点 URL → 用 HTML meta tag 验证（把 tag 交给 Claude 加上并重新部署）→ 在 sitemap 区提交 `sitemap.xml` → 每页都被追踪。技巧：在搜索框输入新页面 URL → **Request Indexing**，可让新页 1 天内被收录（平时要数周~数月），每天约限 10 次。
3. **Google Analytics**：追踪访客行为。
4. **测试落地页转化**：找出转化最高的版本 → 套用到所有现有页面。

> ⚠️ 最后提醒：别一上来就把上千页一次性砸到站上，会出事。

---

## 一页速记（整条流水线）

antigravity + Claude.md（强制 SSG）→ Dribbble 截图建站（home/blog index/service index）→ SEMrush 选词（KD≤30、量≥100、信息型；CPC 排序找 money keyword）→ 导出 CSV → 生成博客（keyword cluster + Pexels 图）→ 注入 voice/humor/stats/stories → 偷前 3 名格式 → On-Page 80+ 信号一键优化（保留人味）→ Technical SEO 刷 Lighthouse 100 + sitemap + robots → 封装成 `blog` skill 量产（控节奏防封）→ 服务页同理（拉链法 + 转化模板）→ GitHub + Vercel(Next.js) 部署 → GMB / Search Console / Analytics / 落地页测试。
