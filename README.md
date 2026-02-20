# 数学游戏 - 小学数学练习平台

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18.3-blue)

一个专为6-12岁小学生设计的趣味数学学习游戏

**当前版本：v1.0.0** | **状态：✅ 生产就绪**

[📖 完整文档](#-文档) • [🚀 快速开始](#-快速开始) • [📋 功能特性](#-功能特性) • [🔄 更新日志](CHANGELOG.md)

</div>

---

## ⚠️ 重要提示

**v1.0.0 已正式发布！** 这是第一个稳定版本，功能完整且经过充分测试。

如需了解最新功能和详细文档，请查看：
- **[README_v1.0.md](README_v1.0.md)** - 完整的使用指南和技术文档
- **[CHANGELOG.md](CHANGELOG.md)** - 版本更新记录
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - 项目状态和已知问题

---

## 📖 项目简介

这是一个为小学生（6-12岁）设计的互动式数学学习游戏，通过游戏化的方式帮助孩子们掌握数学知识。平台涵盖小学1-6年级的数学内容，提供三种难度级别，让每个孩子都能找到适合自己的学习节奏。

### 核心特色

- 🎮 **游戏化学习**：通过闯关、星级评分、连击奖励等机制激发学习兴趣
- 📚 **完整内容体系**：覆盖小学1-6年级核心数学知识点
- 🎯 **个性化难度**：基础、进阶、奥数三种难度，适应不同水平
- 💡 **智能题目系统**：5157+道真实题目，智能去重，自动生成选项
- 🏆 **成就系统**：300+徽章设计，激励持续学习
- 📱 **响应式设计**：完美支持PC、平板、手机

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- 现代浏览器（Chrome/Edge/Firefox/Safari最新版本）

### 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd math-game-frontend

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# 浏览器打开 http://localhost:3010
```

### 生产部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## 📖 文档

### v1.0 完整文档
- **[README_v1.0.md](README_v1.0.md)** - 完整使用指南和技术文档（推荐）
- **[CHANGELOG.md](CHANGELOG.md)** - 版本更新记录
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - 项目状态和已知问题
- **[VERSION_1.0_RELEASE_NOTES.md](VERSION_1.0_RELEASE_NOTES.md)** - v1.0发布说明

### v2.0 规划
- **[VERSION_2.0_ROADMAP.md](VERSION_2.0_ROADMAP.md)** - v2.0开发路线图

---

## 📋 功能特性

### ✨ 核心功能（v1.0）

#### 1. 分级学习系统
- ✅ **6个年级**：小学1-6年级完整覆盖
- ✅ **3种难度**：基础、进阶、奥数
- ✅ **54个关卡**：每个年级9关（3难度×3关卡）
- ✅ **智能题量**：1年级6题 → 6年级11题

#### 2. 智能题库
- ✅ **5157+道题目**：真实题库，内容丰富
- ✅ **智能去重**：同年级同难度内题目不重复
- ✅ **自动适配**：按年级自动调整题目数量
- ✅ **质量过滤**：自动排除低质量题目
- ✅ **选项生成**：为填空题自动生成选项

#### 3. 游戏化机制
- ✅ **星级评分**：1-3星评价系统
  - 90分+：★★★ 三星
  - 70-89分：★★ 二星
  - 60-69分：★ 一星
- ✅ **连击奖励**：连续答对获得额外分数
- ✅ **提示功能**：每关可使用提示（影响最终评分）
- ✅ **计时系统**：每题30秒倒计时
- ✅ **进度保存**：自动保存到本地

#### 4. 精美界面
- ✅ **响应式设计**：支持PC、平板、手机
- ✅ **流畅动画**：Framer Motion动画
- ✅ **庆祝特效**：五彩纸屑庆祝
- ✅ **儿童友好**：大字体、圆角设计、渐变色彩

---

## 📊 项目统计

### 代码规模
- **TypeScript文件**：50+ 个
- **React组件**：30+ 个
- **题库题目**：5157+ 道
- **关卡数量**：54 个

### 技术栈
```
前端框架：Next.js 14.2
开发语言：TypeScript 5.6
样式方案：Tailwind CSS 3.4
状态管理：Zustand 5.0
动画库：Framer Motion 11.11
UI图标：Lucide React 0.45
特效库：Canvas Confetti 1.9
```

### 题库统计
| 年级 | 基础 | 进阶 | 奥数 | 总计 |
|------|------|------|------|------|
| 1年级 | 324题 | 336题 | 90题 | 750题 |
| 2-6年级 | - | - | - | 4407题 |
| **总计** | **~2000题** | **~2000题** | **~1157题** | **5157题** |

---

## 🎯 版本历史

### v1.0.0（2026-02-21）- 当前版本
- ✅ 首次正式发布
- ✅ 54个关卡完整实现
- ✅ 5157+题目题库
- ✅ 完整文档体系
- ✅ 修复12个重大问题

详细更新记录：[CHANGELOG.md](CHANGELOG.md)

---

## 🔮 未来计划（v2.0）

### 核心功能
- [ ] 完整的徽章系统UI（目前仅框架完成）
- [ ] 用户账户系统
- [ ] 后端API集成
- [ ] 排行榜功能

### 高级功能
- [ ] 数据分析面板
- [ ] 学习报告生成
- [ ] 家长监控面板
- [ ] 题目收藏和错题本

### 扩展功能
- [ ] 多语言支持（英文版）
- [ ] PWA离线模式
- [ ] 移动端APP
- [ ] AI智能推荐

详见：[VERSION_2.0_ROADMAP.md](VERSION_2.0_ROADMAP.md)

---

## 📁 项目结构

```
math-game-frontend/
├── app/                      # Next.js页面
│   ├── page.tsx              # 首页（年级选择）
│   ├── difficulty/[grade]/   # 难度选择
│   ├── levels/               # 关卡选择
│   ├── game/[levelId]/       # 游戏主页面
│   ├── complete/             # 完成页面
│   └── badges/               # 徽章页面
│
├── components/               # React组件
│   ├── pages/                # 页面级组件
│   └── ui/                   # UI组件库
│
├── lib/                      # 业务逻辑
│   ├── data.ts               # 数据配置
│   ├── questionBankLoader.ts # 题库加载
│   ├── questionGenerator.ts  # 题目生成
│   └── levelConfig.ts        # 关卡配置
│
├── store/                    # 状态管理
│   └── gameStore.ts          # Zustand状态
│
├── types/                    # TypeScript类型
│   └── index.ts
│
├── public/                   # 静态资源
│   └── questions/            # 题库JSON文件
│
└── 文档/
    ├── README.md             # 本文档
    ├── README_v1.0.md        # 完整文档
    ├── CHANGELOG.md          # 更新记录
    ├── PROJECT_STATUS.md     # 项目状态
    ├── VERSION_1.0_RELEASE_NOTES.md  # 发布说明
    └── VERSION_2.0_ROADMAP.md        # v2.0规划
```

---

## 💡 快速链接

| 链接 | 说明 |
|------|------|
| [README_v1.0.md](README_v1.0.md) | 完整文档（推荐新用户阅读） |
| [CHANGELOG.md](CHANGELOG.md) | 版本更新记录 |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | 项目状态和已知问题 |
| [VERSION_1.0_RELEASE_NOTES.md](VERSION_1.0_RELEASE_NOTES.md) | v1.0发布说明 |
| [VERSION_2.0_ROADMAP.md](VERSION_2.0_ROADMAP.md) | v2.0开发路线图 |

---

## 🐛 问题反馈

如果您在使用过程中遇到问题或有改进建议，请：

1. 查看文档：[README_v1.0.md](README_v1.0.md)
2. 查看已知问题：[PROJECT_STATUS.md](PROJECT_STATUS.md#-已知问题)
3. 提交Issue：[GitHub Issues](项目地址/issues)

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人员！

- **产品设计**：游戏机制、学习路径设计
- **前端开发**：React/Next.js/TypeScript实现
- **UI设计**：视觉设计、用户体验
- **内容制作**：题库建设、质量把控

---

## 📜 许可证

本项目采用 **MIT许可证**。详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**Math Game v1.0 - 让数学学习更有趣**

Made with ❤️ for young learners

[开始使用](#-快速开始) • [完整文档](README_v1.0.md) • [更新日志](CHANGELOG.md)

[⬆ 返回顶部](#-数学游戏---小学数学练习平台)

</div>
