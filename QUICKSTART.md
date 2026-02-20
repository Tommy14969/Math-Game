# 快速开始指南

## 项目安装和运行

### 1. 安装依赖

```bash
cd D:\ClaudeCodeProjects\math-game-frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构说明

```
math-game-frontend/
├── app/                    # Next.js 页面路由
│   ├── page.tsx           # 首页（年级选择）
│   ├── difficulty/        # 难度选择
│   ├── levels/            # 关卡选择
│   ├── game/[levelId]/    # 游戏页面
│   ├── complete/          # 完成页面
│   └── badges/            # 徽章页面
├── components/
│   ├── pages/            # 页面组件
│   └── ui/               # 通用UI组件
├── store/                # 状态管理
├── types/                # TypeScript类型
└── lib/                  # 工具和数据
```

## 主要功能

### 1. 年级选择（首页）
- 6个年级选项（1-6年级）
- 每个年级有独特的颜色和图标
- 点击跳转到难度选择

### 2. 难度选择
- 基础（⭐）：适合初学者
- 进阶（⭐⭐）：有一定挑战性
- 奥数（⭐⭐⭐）：高难度挑战

### 3. 关卡选择
- 显示所有关卡
- 关卡解锁机制
- 星级评价显示
- 最高分记录

### 4. 游戏答题
- 大字体题目显示
- 互动式选项按钮
- 实时反馈动画
- 计时器功能
- 连击奖励
- 提示系统

### 5. 关卡完成
- 星星数量显示
- 分数统计
- 正确率计算
- 庆祝动画

### 6. 徽章收集
- 徽章网格展示
- 分类筛选
- 稀有度显示
- 解锁进度

## 开发说明

### 添加新页面

1. 在 `app/` 目录创建新文件夹和 `page.tsx`
2. 在 `components/pages/` 创建对应的页面组件
3. 使用 `useRouter` 进行导航

### 添加新组件

1. 在 `components/ui/` 创建通用组件
2. 使用 TypeScript 定义 Props 类型
3. 使用 Framer Motion 添加动画

### 状态管理

使用 Zustand store（`store/gameStore.ts`）：

```typescript
// 读取状态
const { progress, currentGameState } = useGameStore();

// 更新状态
const { updateProgress, startGame } = useGameStore();
```

### 样式使用

使用 Tailwind CSS 工具类：

```tsx
<div className="bg-white rounded-3xl shadow-xl p-6">
  <h1 className="text-4xl font-bold text-gray-800">
    标题
  </h1>
</div>
```

### 动画使用

使用 Framer Motion：

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>
```

## 调试技巧

### 1. 查看状态

```typescript
console.log('Current state:', useGameStore.getState());
```

### 2. 清除本地存储

打开浏览器开发者工具 → Application → Local Storage → 删除相关项

### 3. 重置游戏进度

在浏览器控制台执行：

```javascript
localStorage.clear();
location.reload();
```

## 常见问题

### Q: 页面显示空白？
A: 检查浏览器控制台是否有错误，确保所有依赖已安装

### Q: 样式不生效？
A: 检查 Tailwind 配置，确保 `globals.css` 已引入

### Q: 状态没有保存？
A: 检查浏览器是否允许 localStorage

### Q: 动画不流畅？
A: 检查设备性能，可以在设置中关闭动画

## 扩展建议

### 1. 添加音效

在 `public/sounds/` 添加音效文件：

```
public/
└── sounds/
    ├── correct.mp3
    ├── wrong.mp3
    ├── click.mp3
    └── complete.mp3
```

### 2. 添加更多题目

在 `lib/data.ts` 扩展题目数据：

```typescript
const questions: Question[] = [
  {
    id: '1',
    grade: Grade.Grade1,
    difficulty: Difficulty.Basic,
    type: QuestionType.Addition,
    question: '2 + 3 = ?',
    options: [4, 5, 6, 7],
    answer: 5,
    points: 10,
  },
  // 添加更多题目...
];
```

### 3. 自定义主题

修改 `tailwind.config.ts` 中的颜色配置：

```typescript
theme: {
  extend: {
    colors: {
      custom: {
        light: '#颜色值',
        DEFAULT: '#颜色值',
        dark: '#颜色值',
      },
    },
  },
}
```

### 4. 添加新徽章

在 `lib/data.ts` 的 `sampleBadges` 数组添加：

```typescript
{
  id: 'new_badge',
  name: '新徽章',
  description: '徽章描述',
  icon: '🎖️',
  rarity: BadgeRarity.Common,
  category: BadgeCategory.Achievement,
  requirement: { type: 'custom', value: 1 },
  unlocked: false,
}
```

## 性能优化建议

1. 使用 React.memo 避免不必要的重渲染
2. 图片使用 Next.js Image 组件
3. 路由级别的代码分割
4. 懒加载非关键组件

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 部署建议

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 联系方式

如有问题，请查看项目文档或提交 Issue。

## 许可证

MIT License
