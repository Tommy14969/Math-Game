# 数学游戏 - 小学数学练习平台 v1.0

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)

一个适合小学1-6年级的趣味数学学习平台

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [项目结构](#-项目结构) • [API文档](#-api文档) • [贡献指南](#-贡献指南)

</div>

---

## 📋 项目概述

这是一个为小学生（6-12岁）设计的互动式数学学习游戏，通过游戏化的方式帮助孩子们掌握数学知识。平台涵盖小学1-6年级的数学内容，提供三种难度级别，让每个孩子都能找到适合自己的学习节奏。

### 核心特色

- 🎮 **游戏化学习**：通过闯关、星级评分、连击奖励等机制激发学习兴趣
- 📚 **完整内容体系**：覆盖小学1-6年级核心数学知识点
- 🎯 **个性化难度**：基础、进阶、奥数三种难度，适应不同水平
- 💡 **智能题目系统**：5157+道真实题目，智能去重，自动生成选项
- 🏆 **成就系统**：300+徽章设计，激励持续学习
- 📱 **响应式设计**：完美支持PC、平板、手机

## 🌟 功能特性

### 1. 分级学习系统

#### 年级覆盖
- ✅ 一年级（6-7岁）：基础加减法、认识数字
- ✅ 二年级（7-8岁）：乘法口诀、简单应用题
- ✅ 三年级（8-9岁）：除法运算、分数入门
- ✅ 四年级（9-10岁）：混合运算、小数运算
- ✅ 五年级（10-11岁）：方程解法、几何图形
- ✅ 六年级（11-12岁）：综合应用、奥数入门

#### 难度级别
| 难度 | 说明 | 适合人群 | 题目特点 |
|------|------|----------|----------|
| ⭐ 基础 | 循序渐进 | 数学基础薄弱 | 简单计算，步骤明确 |
| ⭐⭐ 进阶 | 有一定挑战 | 数学基础良好 | 多步骤推理，应用题 |
| ⭐⭐⭐ 奥数 | 高难度 | 数学天赋突出 | 复杂逻辑，创新思维 |

### 2. 游戏机制

#### 关卡设计
每个年级包含 **9个关卡**：
- 基础难度：3关（加法专项 → 减法专项 → 混合运算）
- 进阶难度：3关（方程 → 应用题 → 综合推理）
- 奥数难度：3关（找规律 → 数列 → 逻辑推理）

#### 题目数量
根据年级自动调整：
```
1年级：6题/关  →  总计54题
2年级：7题/关  →  总计63题
3年级：8题/关  →  总计72题
4年级：9题/关  →  总计81题
5年级：10题/关 →  总计90题
6年级：11题/关 →  总计99题
```

#### 星级评分
- 🌟🌟🌟 **90-100分**：完美通关
- 🌟🌟 **70-89分**：表现优秀
- 🌟 **60-69分**：合格通关
- ❌ **60分以下**：需要加油

#### 连击系统
- 连续答对获得额外分数奖励
- 10连击以上会有特殊庆祝效果
- 答错后连击清零

### 3. 题库系统

#### 题目类型
- **选择题**：4个选项，选择正确答案
- **填空题**（自动转换）：系统自动生成4个选项
- **应用题**：文字描述，需要理解题意

#### 题目来源
- ✅ 真实题库：5157+道精选题目
- ✅ 自动生成：题库不足时智能生成
- ✅ 质量过滤：自动过滤低质量题目

#### 智能去重
- 同年级同难度内题目不重复
- 切换年级/难度时自动清空记录
- 确保每次练习都有新鲜感

### 4. 用户体验

#### 界面设计
- 🎨 精美的渐变配色
- 🌈 圆角卡片式布局
- ✨ 流畅的动画过渡
- 🎉 庆祝特效（五彩纸屑）

#### 交互优化
- ⏱️ 每题30秒倒计时
- 💡 提示功能（影响最终评分）
- ⏸️ 随时暂停游戏
- 🏠 一键返回首页

#### 进度保存
- 自动保存到本地存储
- 关卡进度实时更新
- 星级数量持久化
- 刷新页面不丢失

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- 现代浏览器（Chrome/Edge/Firefox/Safari最新版本）

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd math-game-frontend
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3010](http://localhost:3010)

### 生产部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

生产环境将运行在 [http://localhost:3010](http://localhost:3010)

## 📁 项目结构

```
math-game-frontend/
├── app/                          # Next.js App Router页面
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页（年级选择）
│   ├── difficulty/               # 难度选择页面
│   │   └── [grade]/              # 动态路由：年级参数
│   ├── levels/                   # 关卡选择页面
│   ├── game/                     # 游戏主页面
│   │   └── [levelId]/            # 动态路由：关卡ID
│   ├── complete/                 # 完成页面
│   └──badges/                    # 徽章页面
│
├── components/                    # React组件
│   ├── pages/                    # 页面级组件
│   │   ├── HomePage.tsx          # 首页组件
│   │   ├── DifficultyPage.tsx    # 难度选择组件
│   │   ├── LevelsPage.tsx        # 关卡选择组件
│   │   ├── GamePage.tsx          # 游戏页面组件
│   │   └── CompletePage.tsx      # 完成页面组件
│   ├── ui/                       # 通用UI组件
│   │   ├── Button.tsx            # 按钮组件
│   │   ├── Card.tsx              # 卡片组件
│   │   ├── ProgressBar.tsx       # 进度条组件
│   │   ├── Stars.tsx             # 星星评分组件
│   │   └── Confetti.tsx          # 五彩纸屑特效
│   └── layout/                   # 布局组件
│       ├── Header.tsx            # 页头
│       └── Footer.tsx            # 页脚
│
├── lib/                          # 工具库和业务逻辑
│   ├── data.ts                   # 数据配置（年级/难度/徽章）
│   ├── questionBankLoader.ts     # 题库加载器
│   ├── questionGenerator.ts      # 题目生成器
│   └── levelConfig.ts            # 关卡配置
│
├── store/                        # 状态管理
│   └── gameStore.ts              # Zustand游戏状态
│
├── types/                        # TypeScript类型定义
│   └── index.ts                  # 全局类型定义
│
├── public/                       # 静态资源
│   └── questions/                # 题库JSON文件
│       ├── G1_basic.json         # 1年级基础题库
│       ├── G1_advanced.json      # 1年级进阶题库
│       ├── G1_olympic.json       # 1年级奥数题库
│       └── ...                   # 其他年级题库
│
├── CHANGELOG.md                  # 版本更新日志
├── README_v1.0.md               # 本文档
├── PROJECT_STATUS.md            # 项目状态文档
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript配置
├── tailwind.config.ts           # Tailwind CSS配置
└── next.config.js               # Next.js配置
```

## 🔧 配置说明

### 端口配置

默认端口：**3010**

修改端口：
```json
// package.json
{
  "scripts": {
    "dev": "next dev -p 3010",    // 开发环境
    "start": "next start -p 3010" // 生产环境
  }
}
```

### 题库配置

题库文件路径：`public/questions/`

命名格式：`G{年级}_{难度}.json`

示例：
- `G1_basic.json` - 1年级基础
- `G5_olympic.json` - 5年级奥数
- `G6_advanced.json` - 6年级进阶

### 关卡配置

文件：`lib/levelConfig.ts`

```typescript
export const LEVELS_PER_GRADE = {
  [Grade.Grade1]: { basic: 3, advanced: 3, olympiad: 3 },
  // ... 其他年级
};
```

## 📊 数据模型

### Grade（年级）
```typescript
enum Grade {
  Grade1 = 1,  // 一年级
  Grade2 = 2,  // 二年级
  Grade3 = 3,  // 三年级
  Grade4 = 4,  // 四年级
  Grade5 = 5,  // 五年级
  Grade6 = 6,  // 六年级
}
```

### Difficulty（难度）
```typescript
enum Difficulty {
  Basic = 'basic',        // 基础
  Advanced = 'advanced',  // 进阶
  Olympiad = 'olympiad',  // 奥数
}
```

### Question（题目）
```typescript
interface Question {
  id: string;              // 题目ID
  grade: Grade;            // 所属年级
  difficulty: Difficulty;  // 难度级别
  type: QuestionType;      // 题目类型
  question: string;        // 题目内容
  options?: number[];      // 选项（选择题）
  answer: number;          // 正确答案
  points: number;          // 分值
  timeLimit: number;       // 时间限制（秒）
  hint?: string;           // 提示内容
  explanation?: string;    // 解析
}
```

### Level（关卡）
```typescript
interface Level {
  id: string;              // 关卡ID
  grade: Grade;            // 所属年级
  difficulty: Difficulty;  // 难度级别
  levelNumber: number;     // 关卡编号（1-3）
  title: string;           // 关卡标题
  description: string;     // 关卡描述
  questions: Question[];   // 题目列表
  totalStars: number;      // 总星数
  earnedStars: number;     // 已获得星数
  status: LevelStatus;     // 关卡状态
  requiredScore: number;   // 所需分数
  timeLimit: number;       // 时间限制
}
```

## 🎨 UI组件库

### Button（按钮）
```typescript
<Button variant="primary" size="lg" onClick={handleClick}>
  点击我
</Button>
```

变体（variant）：`primary` | `secondary` | `success` | `danger`
尺寸（size）：`sm` | `md` | `lg` | `xl`

### Card（卡片）
```typescript
<Card variant="level" onClick={handleLevelClick}>
  关卡内容
</Card>
```

变体（variant）：`default` | `level` | `stat`

### ProgressBar（进度条）
```typescript
<ProgressBar
  progress={50}
  current={3}
  total={6}
  showLabel
  color="purple"
  size="lg"
/>
```

### Stars（星星评分）
```typescript
<Stars count={3} size={32} animate />
```

## 🔍 调试指南

### 启用调试日志

打开浏览器控制台（F12），可以看到详细日志：

```
[DEBUG] Grade 1, Difficulty basic, Level 1
[DEBUG] Total questions loaded: 324
[DEBUG] Filtered choice questions (4 options): 324
[DEBUG] Filtered out 80 questions requiring images
[DEBUG] Available questions (not seen): 324
[DEBUG] Questions needed: 6
[DEBUG] Selected 6 questions from available pool
```

### 常见问题

**Q: 题目加载不出来？**
- 检查题库文件是否在 `public/questions/` 目录
- 查看控制台是否有404错误
- 确认文件命名格式正确（G{年级}_{难度}.json）

**Q: 答案显示错误？**
- 检查题库中 `answer` 字段类型（应为数字）
- 查看控制台类型转换警告

**Q: 题目重复出现？**
- 切换到其他年级/难度再切回来
- 或清除浏览器缓存

## 🤝 贡献指南

### 代码规范

- 使用TypeScript编写代码
- 遵循ESLint规则
- 组件使用函数式组件 + Hooks
- 样式使用Tailwind CSS

### 提交规范

```
feat: 添加新功能
fix: 修复Bug
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建/工具变更
```

### 开发流程

1. Fork项目
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add xxx'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 LICENSE 文件。

## 👥 团队

- **产品设计**：定义学习路径和游戏机制
- **前端开发**：React/Next.js/TypeScript
- **UI设计**：视觉设计和用户体验
- **内容制作**：题库建设和质量把控

## 📮 联系方式

- 项目主页：[GitHub Repository]
- 问题反馈：[Issues]
- 邮箱：[support@example.com]

---

<div align="center">

**Made with ❤️ for young learners**

[⬆ 返回顶部](#数学游戏---小学数学练习平台-v10)

</div>
