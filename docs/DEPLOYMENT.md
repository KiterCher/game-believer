# GameBeliever 部署指南

## 方式一：Cloudflare Pages（推荐）

### 1. 准备工作

1. 注册 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)
2. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

3. 登录 Cloudflare：
   ```bash
   wrangler login
   ```

### 2. 手动部署

```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

### 3. GitHub Actions 自动部署

1. 推送代码到 GitHub
2. 在 Cloudflare Dashboard 创建 Pages 项目
3. 连接 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: `22`

### 4. 配置自定义域名

1. 在 Cloudflare Dashboard → Pages → 你的项目 → Custom domains
2. 添加 `gamebeliever.com`
3. 更新 DNS 记录

---

## 方式二：Vercel（备选）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

---

## 方式三：Netlify（备选）

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --dir=dist --prod
```

---

## 环境变量配置

在 Cloudflare Dashboard → Pages → Settings → Environment variables 中设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `AI_API_KEY` | AI API 密钥 | `sk-xxx` |
| `PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `PUBLIC_GSC_VERIFICATION` | Google Search Console 验证码 | `xxx` |
| `PUBLIC_BING_VERIFICATION` | Bing Webmaster 验证码 | `xxx` |

---

## SEO 提交

### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加属性：`https://gamebeliever.com`
3. 验证网站（使用 HTML 标签或 DNS 验证）
4. 提交 sitemap：`https://gamebeliever.com/sitemap-index.xml`

### Bing Webmaster

1. 访问 https://www.bing.com/webmasters
2. 添加站点：`https://gamebeliever.com`
3. 验证网站
4. 提交 sitemap

---

## 验证部署

部署完成后，检查以下内容：

1. ✅ 首页可访问
2. ✅ 角色页面可访问
3. ✅ Sitemap 可访问：`https://gamebeliever.com/sitemap-index.xml`
4. ✅ Robots.txt 可访问：`https://gamebeliever.com/robots.txt`
5. ✅ RSS 可访问：`https://gamebeliever.com/rss.xml`
