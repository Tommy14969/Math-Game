# 🚀 部署到 Vercel 指南

**项目**：Math Game v1.0
**仓库**：https://github.com/Tommy14969/Math-Game
**部署目标**：Vercel

---

## 📋 前置条件

✅ 已完成：
- [x] 代码已推送到GitHub
- [x] v1.0.0标签已创建
- [x] 远程仓库已配置

需要准备：
- [ ] GitHub账号
- [ ] Vercel账号（免费）
- [ ] 5分钟时间

---

## 🎯 方法一：通过 Vercel 网站部署（推荐，最简单）

### 步骤 1：登录 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **Sign Up** 或 **Log In**
3. 使用 **GitHub** 账号登录（推荐，这样可以直接导入仓库）

### 步骤 2：导入项目

1. 登录后，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 部分：
   - 找到 **Math-Game** 仓库
   - 点击 **"Import"**

### 步骤 3：配置项目

Vercel 会自动检测到这是一个 Next.js 项目，配置如下：

```
Project Name: math-game (可以修改)
Framework Preset: Next.js (自动检测)
Root Directory: ./ (默认)
Build Command: npm run build (自动设置)
Output Directory: .next (自动设置)
Install Command: npm install (自动设置)
```

**重要配置**：
- ✅ 保持默认设置即可
- ✅ 环境变量无需配置（项目未使用）
- ✅ 点击 **"Deploy"**

### 步骤 4：等待部署

- 部署时间：约2-3分钟
- 可以看到实时日志
- 部署完成后会显示 ✅ **Ready**

### 步骤 5：访问网站

部署成功后，Vercel会提供一个免费域名：
```
https://math-game.vercel.app
```

或
```
https://math-game-[your-username].vercel.app
```

---

## 🖥️ 方法二：通过 Vercel CLI 部署

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：登录

```bash
vercel login
```

会打开浏览器登录GitHub账号。

### 步骤 3：部署

在项目根目录执行：

```bash
cd D:\ClaudeCodeProjects\math-game-frontend
vercel
```

按照提示操作：
1. **Set up and deploy?** → **Y**
2. **Which scope?** → 选择你的账号
3. **Link to existing project?** → **N**
4. **What's your project's name?** → **math-game**
5. **In which directory is your code located?** → 按Enter（使用当前目录）
6. **Want to override settings?** → **N**（使用默认Next.js配置）

### 步骤 4：确认部署

Vercel会自动：
- 安装依赖
- 构建项目
- 部署到CDN

完成后会显示：
```
✅ Production: https://math-game.vercel.app [1m]
```

---

## 🔄 自动部署（推荐）

配置GitHub与Vercel的集成后，每次推送代码到`main`分支，Vercel会自动重新部署。

### 如何配置：

1. 在Vercel项目中，进入 **Settings** → **Git**
2. 确认 **Ignored Build Step** 为空
3. 确认 **Automatically Deploy** 已启用

### 工作流程：

```bash
# 修改代码后
git add .
git commit -m "feat: 新功能"
git push origin main

# Vercel会自动检测到push并开始部署
# 约2-3分钟后，新版本就上线了
```

---

## 🎨 自定义域名（可选）

### 步骤 1：购买域名

从以下平台购买域名：
- Namecheap
- GoDaddy
- Cloudflare（推荐，免费域名管理和CDN）

### 步骤 2：在 Vercel 添加域名

1. 进入项目 **Settings** → **Domains**
2. 输入你的域名（如：`mathgame.com`）
3. 点击 **Add**

### 步骤 3：配置 DNS

Vercel会提供DNS配置：

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

将这些记录添加到你的域名提供商的DNS设置中。

---

## 🔧 常见问题

### Q1: 部署失败，显示 "Module not found"

**解决方案**：
```bash
# 本地测试构建
npm run build

# 如果成功，再部署
vercel --prod
```

### Q2: 端口问题

**说明**：Vercel会自动处理端口，无需修改`package.json`中的端口配置。

### Q3: 静态文件404

**解决方案**：确保`public/questions/`目录已提交到Git。

```bash
# 检查文件是否在git中
git ls-files public/questions/

# 如果没有，重新添加
git add public/questions/
git commit -m "fix: Add question files"
git push
```

### Q4: 环境变量

**当前项目**：无需配置环境变量

**如果需要**：
- 在Vercel项目设置中添加
- Settings → **Environment Variables**
- 添加键值对

---

## 📊 部署监控

### 查看部署日志

1. 进入Vercel项目
2. 点击 **Deployments**
3. 点击任意部署记录查看详情

### 性能监控

Vercel提供：
- **Analytics**：访问量、性能
- **Speed Insights**：Core Web Vitals
- **Logs**：错误日志

---

## 💡 最佳实践

### 1. 预览部署

每次创建Pull Request时，Vercel会自动创建预览部署：

```bash
git checkout -b feature/new-feature
# 做一些修改
git push origin feature/new-feature
# Vercel会自动创建预览URL
```

### 2. 生产部署保护

保护`main`分支：
1. 在GitHub仓库设置 → Branches
2. 添加分支保护规则
3. 要求PR review才能合并

### 3. 回滚部署

如果新版本有问题：
1. 进入Vercel → Deployments
2. 找到之前的稳定版本
3. 点击 **Promote to Production**

---

## 🎉 部署成功后

### 访问你的网站

默认URL：
```
https://math-game.vercel.app
```

或自定义域名（如果配置了）

### 分享链接

- 分享给学生/家长
- 添加到收藏夹
- 二维码生成器创建二维码

---

## 📱 短链接（可选）

使用短链接服务：
- **bit.ly**：免费短链接
- **tinyurl.com**：免费短链接
- **rebrandly.com**：自定义短链接

示例：
```
原链接：https://math-game.vercel.app
短链接：https://bit.ly/math-game-v1
```

---

## ✅ 部署检查清单

部署前：
- [ ] 代码已推送到GitHub
- [ ] 本地构建成功（`npm run build`）
- [ ] 题库文件已提交（`public/questions/`）

部署后：
- [ ] 网站可以访问
- [ ] 所有页面正常工作
- [ ] 题目可以加载
- [ ] 游戏功能正常
- [ ] 移动端显示正常

---

## 🆘 需要帮助？

### 文档
- [Vercel官方文档](https://vercel.com/docs)
- [Next.js部署指南](https://nextjs.org/docs/deployment)

### 社区
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/Tommy14969/Math-Game/issues)

---

## 🎊 部署成功！

恭喜！您的 Math Game v1.0 现已上线！

**网站地址**：待部署完成后显示
**GitHub仓库**：https://github.com/Tommy14969/Math-Game

**下一步**：
1. 测试所有功能
2. 分享给用户
3. 收集反馈
4. 规划v2.0开发

---

<div align="center">

**Math Game v1.0 - 让数学学习更有趣**

Made with ❤️ for young learners

[🏠 返回首页](README.md) • [📖 完整文档](README_v1.0.md)

</div>
