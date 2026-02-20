# 数学大冒险 - 前端架构文档

## 项目概述

这是一个使用 Next.js 14 + TypeScript + Tailwind CSS 构建的小学数学游戏前端应用。目标用户为6-12岁的小学生，提供趣味性的数学学习体验。

## 技术架构

### 1. 核心技术栈

**框架与运行时**
- Next.js 14 (App Router) - React框架，提供SSR、路由等功能
- React 18 - UI库
- TypeScript - 类型安全

**样式与UI**
- Tailwind CSS - 原子化CSS框架
- Framer Motion - 动画库
- Lucide React - 图标库

**状态管理**
- Zustand - 轻量级状态管理库
- Zustand Persist - 状态持久化

**特效**
- Canvas Confetti - 庆祝动画

### 2. 项目目录结构

```
math-game-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── globals.css               # 全局样式
│   ├── difficulty/               # 难度选择页面
│   ├── levels/                   # 关卡选择页面
│   ├── game/[levelId]/           # 游戏页面（动态路由）
│   ├── complete/                 # 完成页面
│   └── badges/                   # 徽章页面
│
├── components/                   # React组件
│   ├── pages/                    # 页面级组件
│   │   ├── HomePage.tsx          # 首页组件
│   │   ├── DifficultyPage.tsx    # 难度选择组件
│   │   ├── LevelsPage.tsx        # 关卡选择组件
│   │   ├── GamePage.tsx          # 游戏组件
│   │   ├── CompletePage.tsx      # 完成页面组件
│   │   └── BadgesPage.tsx        # 徽章页面组件
│   │
│   └── ui/                       # 通用UI组件
│       ├── Button.tsx            # 按钮组件
│       ├── Card.tsx              # 卡片组件
│       ├── ProgressBar.tsx       # 进度条组件
│       ├── Stars.tsx             # 星星评分组件
│       └── Confetti.tsx          # 庆祝动画组件
│
├── store/                        # 状态管理
│   └── gameStore.ts              # 全局游戏状态
│
├── types/                        # TypeScript类型定义
│   └── index.ts                  # 所有类型定义
│
├── lib/                          # 工具库
│   └── data.ts                   # 静态数据和配置
│
├── utils/                        # 工具函数
│   └── cn.ts                     # className合并工具
│
├── public/                       # 静态资源（待添加）
│   └── sounds/                   # 音效文件
│
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript配置
├── tailwind.config.ts            # Tailwind配置
├── next.config.js                # Next.js配置
└── README.md                     # 项目说明
```

## 核心功能模块

### 1. 年级选择模块

**位置**: `components/pages/HomePage.tsx`

**功能**:
- 显示6个年级选项
- 每个年级有独特的颜色、图标和描述
- 显示当前选择的年级
- 点击跳转到难度选择页面

**数据结构**:
```typescript
Grade enum: 1-6
gradeConfig: {
  name: string,
  color: string,
  icon: string,
  description: string
}
```

### 2. 难度选择模块

**位置**: `components/pages/DifficultyPage.tsx`

**功能**:
- 显示三个难度等级：基础、进阶、奥数
- 不同难度有不同的积分倍率
- 显示难度描述和图标
- 点击跳转到关卡选择页面

**数据结构**:
```typescript
Difficulty enum: 'basic' | 'advanced' | 'olympiad'
difficultyConfig: {
  name: string,
  color: string,
  icon: string,
  description: string,
  pointsMultiplier: number
}
```

### 3. 关卡选择模块

**位置**: `components/pages/LevelsPage.tsx`

**功能**:
- 显示当前年级和难度的所有关卡
- 显示关卡状态（锁定/解锁/已完成）
- 显示每关的星级评价
- 显示最高分记录
- 关卡解锁逻辑（完成前一关解锁下一关）

**数据结构**:
```typescript
Level: {
  id: string,
  grade: Grade,
  difficulty: Difficulty,
  levelNumber: number,
  title: string,
  description: string,
  questions: Question[],
  totalStars: number,
  earnedStars: number,
  status: LevelStatus,
  requiredScore: number,
  timeLimit?: number
}
```

### 4. 游戏答题模块

**位置**: `components/pages/GamePage.tsx`

**功能**:
- 显示当前题目
- 提供多个选项供选择
- 实时反馈（正确/错误动画）
- 计时器功能
- 进度条显示
- 连击奖励机制
- 提示系统
- 暂停/继续功能

**游戏流程**:
1. 初始化游戏状态
2. 显示题目和选项
3. 用户选择答案
4. 验证答案并显示反馈
5. 更新分数和连击
6. 进入下一题或完成关卡

**数据结构**:
```typescript
GameState: {
  currentQuestionIndex: number,
  score: number,
  correctAnswers: number,
  wrongAnswers: number,
  streak: number,
  isPaused: boolean,
  timeRemaining?: number,
  hintsUsed: number
}
```

### 5. 关卡完成模块

**位置**: `components/pages/CompletePage.tsx`

**功能**:
- 显示获得星星数量
- 显示总分和正确率
- 显示特殊成就（如连击）
- 庆祝动画效果
- 提供返回关卡或查看徽章的选项

### 6. 徽章收集模块

**位置**: `components/pages/BadgesPage.tsx`

**功能**:
- 显示所有徽章（网格布局）
- 按类别筛选徽章
- 显示徽章稀有度
- 显示解锁进度
- 点击查看徽章详情

**徽章类别**:
- 成就徽章
- 进度徽章
- 特殊徽章
- 挑战徽章

**稀有度等级**:
- 普通（Common）
- 稀有（Uncommon）
- 史诗（Rare）
- 传说（Epic）
- 神话（Legendary）

## 状态管理架构

### Zustand Store结构

**文件**: `store/gameStore.ts`

**状态模块**:

1. **进度状态** (progress)
   - 当前年级
   - 当前难度
   - 当前关卡
   - 总分
   - 各关卡完成情况

2. **游戏状态** (currentGameState)
   - 当前题目索引
   - 分数
   - 正确/错误答题数
   - 连击数
   - 暂停状态
   - 剩余时间
   - 使用提示次数

3. **关卡和题目** (currentLevel, currentQuestion)
   - 当前关卡信息
   - 当前题目信息

4. **徽章系统** (badges, unlockedBadges)
   - 所有徽章列表
   - 已解锁徽章ID列表
   - 徽章进度

5. **用户统计** (stats)
   - 总游戏次数
   - 总答题数
   - 正确率
   - 最高连击
   - 获得星星总数
   - 解锁徽章总数

6. **设置** (settings)
   - 音效开关
   - 音乐开关
   - 震动反馈
   - 动画效果
   - 计时器开关

### 状态持久化

使用 Zustand 的 persist 中间件将关键状态保存到 localStorage：
- 游戏进度
- 徽章解锁情况
- 用户统计
- 设置选项

## UI组件系统

### 通用UI组件

**1. Button组件**
- 支持多种变体（primary, secondary, success, danger, ghost）
- 支持多种尺寸（sm, md, lg, xl）
- 加载状态
- 全宽选项
- 悬停和点击动画

**2. Card组件**
- 支持多种变体（default, grade, level, badge）
- 悬停效果
- 点击事件

**3. ProgressBar组件**
- 进度显示
- 支持显示标签
- 多种颜色选项
- 多种尺寸

**4. Stars组件**
- 显示1-3颗星
- 支持半星显示
- 动画效果

**5. Confetti组件**
- 庆祝动画
- 可配置持续时间和触发条件

## 样式系统

### Tailwind CSS配置

**自定义颜色**:
- 年级主题色（grade1-grade6）
- 主色调（primary系列）
- 成功/错误色

**自定义动画**:
- bounce-slow: 慢速弹跳
- pulse-slow: 慢速脉冲
- wiggle: 摇摆
- float: 浮动

**全局CSS类**（globals.css）:
- 按钮样式（btn-primary, btn-secondary）
- 卡片样式（card, grade-card, level-card）
- 题目样式（question-text, answer-option）
- 反馈样式（feedback-correct, feedback-wrong）
- 动画类（animation-shake, animation-bounce-in等）

## 路由设计

### 页面路由表

| 路径 | 页面 | 组件 |
|------|------|------|
| `/` | 首页 | HomePage |
| `/difficulty` | 难度选择 | DifficultyPage |
| `/levels` | 关卡选择 | LevelsPage |
| `/game/[levelId]` | 游戏页面 | GamePage |
| `/complete` | 完成页面 | CompletePage |
| `/badges` | 徽章收集 | BadgesPage |

### 路由导航流程

```
首页（年级选择）
  ↓
难度选择
  ↓
关卡选择
  ↓
游戏答题
  ↓
关卡完成
  ↓ (返回或查看徽章)
关卡选择 / 徽章收集
```

## 数据流设计

### 游戏开始流程

1. 用户选择年级 → 更新 progress.currentGrade
2. 用户选择难度 → 更新 progress.currentDifficulty
3. 用户选择关卡 → 检查解锁状态
4. 初始化游戏状态 → startGame(level)
5. 加载题目 → 设置 currentQuestion

### 答题流程

1. 显示题目和选项
2. 用户点击选项
3. 验证答案 → answerQuestion()
4. 显示反馈动画
5. 更新分数和连击
6. 延迟后进入下一题 → nextQuestion()
7. 重复直到完成所有题目

### 关卡完成流程

1. 最后一题答题完成
2. 计算星星数量
3. 保存关卡数据 → completeLevel()
4. 更新统计数据
5. 检查徽章解锁
6. 跳转到完成页面

## 性能优化策略

### 1. 组件优化
- 使用 React.memo 避免不必要的重渲染
- 组件懒加载（动态导入）
- 合理的组件拆分

### 2. 动画优化
- 使用 CSS transforms 而非 position
- 限制同时运行的动画数量
- 使用 will-change 提示浏览器

### 3. 状态管理优化
- 选择性订阅状态（避免全局更新）
- 状态持久化（避免重复计算）

### 4. 图片和资源优化
- 使用 Next.js Image 组件
- 响应式图片
- 资源预加载

## 响应式设计

### 断点设置

- mobile: < 640px
- tablet: 640px - 1024px
- desktop: > 1024px

### 适配策略

- 使用 Tailwind 的响应式类
- 网格布局自适应（grid-cols-1 → grid-cols-2 → grid-cols-3）
- 字体大小自适应（text-4xl → text-6xl）
- 间距和内边距自适应

## 可访问性

### 键盘导航
- 所有交互元素支持键盘操作
- 清晰的焦点指示器

### 屏幕阅读器
- 语义化HTML标签
- ARIA标签

### 色彩对比
- 符合WCAG AA标准
- 考虑色盲用户

## 未来扩展计划

### 1. 音效系统
- 答对/答错音效
- 背景音乐
- 按钮点击音效

### 2. 多人模式
- 实时对战
- 排行榜

### 3. AI功能
- 智能题目推荐
- 学习路径规划
- 错题分析

### 4. 家长功能
- 学习报告
- 进度监控
- 设置管理

### 5. 社交功能
- 成就分享
- 好友系统
- 每日挑战

## 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 代码规范

- 使用 TypeScript 类型注解
- 遵循 React Hooks 规范
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase（组件）或 kebab-case（工具）

### Git提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链更新
```

## 总结

这是一个完整的小学数学游戏前端应用，采用了现代化的技术栈和最佳实践。项目结构清晰，代码组织良好，易于维护和扩展。通过精心设计的UI和丰富的交互体验，为小学生提供了一个有趣的学习平台。
