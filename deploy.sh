#!/bin/bash

echo "🚀 GameBeliever 部署脚本"
echo "========================"

# 1. 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler 未安装，正在安装..."
    npm install -g wrangler
fi

# 2. 运行 QA 检查
echo ""
echo "📋 运行 QA 检查..."
npm run qa

# 3. 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

# 4. 部署到 Cloudflare Pages
echo ""
echo "🚀 部署到 Cloudflare Pages..."
wrangler pages deploy dist --project-name=gamebeliever

echo ""
echo "✅ 部署完成！"
echo ""
echo "下一步："
echo "1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com"
echo "2. 连接 GitHub 仓库以启用自动部署"
echo "3. 配置自定义域名"
