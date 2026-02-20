import { Grade, Difficulty, Level, Badge, BadgeRarity, BadgeCategory, QuestionType } from '@/types';

// 年级配置数据
export const gradeConfig = {
  [Grade.Grade1]: {
    name: '一年级',
    color: 'bg-grade1',
    textColor: 'text-grade1',
    borderColor: 'border-grade1',
    bgColor: 'bg-red-100',
    icon: '🎒',
    description: '基础加减法，认识数字',
  },
  [Grade.Grade2]: {
    name: '二年级',
    color: 'bg-grade2',
    textColor: 'text-grade2',
    borderColor: 'border-grade2',
    bgColor: 'bg-teal-100',
    icon: '📚',
    description: '乘法口诀，简单应用题',
  },
  [Grade.Grade3]: {
    name: '三年级',
    color: 'bg-grade3',
    textColor: 'text-grade3',
    borderColor: 'border-grade3',
    bgColor: 'bg-blue-100',
    icon: '✏️',
    description: '除法运算，分数入门',
  },
  [Grade.Grade4]: {
    name: '四年级',
    color: 'bg-grade4',
    textColor: 'text-grade4',
    borderColor: 'border-grade4',
    bgColor: 'bg-green-100',
    icon: '🎨',
    description: '混合运算，小数运算',
  },
  [Grade.Grade5]: {
    name: '五年级',
    color: 'bg-grade5',
    textColor: 'text-grade5',
    borderColor: 'border-grade5',
    bgColor: 'bg-yellow-100',
    icon: '🔬',
    description: '方程解法，几何图形',
  },
  [Grade.Grade6]: {
    name: '六年级',
    color: 'bg-grade6',
    textColor: 'text-grade6',
    borderColor: 'border-grade6',
    bgColor: 'bg-purple-100',
    icon: '🚀',
    description: '综合应用，奥数入门',
  },
};

// 难度配置数据
export const difficultyConfig = {
  [Difficulty.Basic]: {
    name: '基础',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    icon: '⭐',
    description: '适合初学者，循序渐进',
    pointsMultiplier: 1,
  },
  [Difficulty.Advanced]: {
    name: '进阶',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    icon: '⭐⭐',
    description: '有一定挑战性',
    pointsMultiplier: 1.5,
  },
  [Difficulty.Olympiad]: {
    name: '奥数',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    icon: '⭐⭐⭐',
    description: '高难度挑战',
    pointsMultiplier: 2,
  },
};

// 题目类型配置
export const questionTypeConfig = {
  [QuestionType.Addition]: {
    name: '加法',
    icon: '➕',
    color: 'bg-green-500',
  },
  [QuestionType.Subtraction]: {
    name: '减法',
    icon: '➖',
    color: 'bg-red-500',
  },
  [QuestionType.Multiplication]: {
    name: '乘法',
    icon: '✖️',
    color: 'bg-blue-500',
  },
  [QuestionType.Division]: {
    name: '除法',
    icon: '➗',
    color: 'bg-purple-500',
  },
  [QuestionType.Mixed]: {
    name: '混合运算',
    icon: '🔀',
    color: 'bg-orange-500',
  },
  [QuestionType.WordProblem]: {
    name: '应用题',
    icon: '📝',
    color: 'bg-pink-500',
  },
  [QuestionType.Fraction]: {
    name: '分数',
    icon: '🥧',
    color: 'bg-teal-500',
  },
  [QuestionType.Decimal]: {
    name: '小数',
    icon: '🔢',
    color: 'bg-cyan-500',
  },
  [QuestionType.Equation]: {
    name: '方程',
    icon: '⚖️',
    color: 'bg-indigo-500',
  },
  [QuestionType.Geometry]: {
    name: '几何',
    icon: '📐',
    color: 'bg-amber-500',
  },
};

// 示例关卡数据 - 使用真实的题库
import { generateAllLevels } from './questionBankLoader';

export const sampleLevels: Level[] = generateAllLevels();

// 徽章配置数据
export const badgeRarityConfig = {
  [BadgeRarity.Common]: {
    name: '普通',
    color: 'bg-gray-400',
    borderColor: 'border-gray-400',
    glowColor: 'shadow-gray-400/50',
  },
  [BadgeRarity.Uncommon]: {
    name: '稀有',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    glowColor: 'shadow-green-500/50',
  },
  [BadgeRarity.Rare]: {
    name: '史诗',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    glowColor: 'shadow-blue-500/50',
  },
  [BadgeRarity.Epic]: {
    name: '传说',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/50',
  },
  [BadgeRarity.Legendary]: {
    name: '神话',
    color: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
    borderColor: 'border-yellow-500',
    glowColor: 'shadow-yellow-500/50',
  },
};

// 示例徽章数据
export const sampleBadges: Badge[] = [
  // 进度徽章
  {
    id: 'first_game',
    name: '初次尝试',
    description: '完成你的第一道题目',
    icon: '🎮',
    rarity: BadgeRarity.Common,
    category: BadgeCategory.Progress,
    requirement: { type: 'questions_answered', value: 1 },
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'ten_games',
    name: '渐入佳境',
    description: '完成10道题目',
    icon: '🌟',
    rarity: BadgeRarity.Common,
    category: BadgeCategory.Progress,
    requirement: { type: 'questions_answered', value: 10 },
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'hundred_games',
    name: '数学达人',
    description: '完成100道题目',
    icon: '🏆',
    rarity: BadgeRarity.Rare,
    category: BadgeCategory.Progress,
    requirement: { type: 'questions_answered', value: 100 },
    unlocked: false,
    progress: 0,
    maxProgress: 100,
  },
  // 成就徽章
  {
    id: 'perfect_score',
    name: '满分王者',
    description: '在任意关卡获得3星评价',
    icon: '👑',
    rarity: BadgeRarity.Epic,
    category: BadgeCategory.Achievement,
    requirement: { type: 'perfect_level', value: 1 },
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'streak_10',
    name: '连胜达人',
    description: '连续答对10道题',
    icon: '🔥',
    rarity: BadgeRarity.Uncommon,
    category: BadgeCategory.Achievement,
    requirement: { type: 'streak', value: 10 },
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'streak_50',
    name: '答题机器',
    description: '连续答对50道题',
    icon: '⚡',
    rarity: BadgeRarity.Legendary,
    category: BadgeCategory.Achievement,
    requirement: { type: 'streak', value: 50 },
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  // 特殊徽章
  {
    id: 'early_bird',
    name: '早起鸟',
    description: '在早上6-8点完成游戏',
    icon: '🐦',
    rarity: BadgeRarity.Uncommon,
    category: BadgeCategory.Special,
    requirement: { type: 'play_time', value: 'morning' },
    unlocked: false,
  },
  {
    id: 'night_owl',
    name: '夜猫子',
    description: '在晚上10-12点完成游戏',
    icon: '🦉',
    rarity: BadgeRarity.Uncommon,
    category: BadgeCategory.Special,
    requirement: { type: 'play_time', value: 'night' },
    unlocked: false,
  },
  // 挑战徽章
  {
    id: 'speed_demon',
    name: '闪电侠',
    description: '在30秒内完成一道题',
    icon: '💨',
    rarity: BadgeRarity.Rare,
    category: BadgeCategory.Challenge,
    requirement: { type: 'speed', value: 30 },
    unlocked: false,
  },
  {
    id: 'no_hints',
    name: '独立自主',
    description: '不使用任何提示完成一个关卡',
    icon: '🎯',
    rarity: BadgeRarity.Epic,
    category: BadgeCategory.Challenge,
    requirement: { type: 'hints_used', value: 0 },
    unlocked: false,
  },
];

// 动画配置
export const animations = {
  correct: [
    'scale-100',
    'scale-110',
    'scale-100',
  ],
  wrong: [
    'translate-x-0',
    '-translate-x-2',
    'translate-x-2',
    '-translate-x-2',
    'translate-x-2',
    'translate-x-0',
  ],
  fadeIn: 'animate-fade-in',
  bounceIn: 'animate-bounce-in',
  slideUp: 'animate-slide-up',
};

// 颜色主题
export const colorThemes = {
  primary: {
    light: '#4ECDC4',
    DEFAULT: '#44A08D',
    dark: '#2E7D6B',
  },
  secondary: {
    light: '#FFEAA7',
    DEFAULT: '#FDCA40',
    dark: '#E5B330',
  },
  accent: {
    light: '#FF6B6B',
    DEFAULT: '#E65555',
    dark: '#C74444',
  },
  success: {
    light: '#56C596',
    DEFAULT: '#38B87A',
    dark: '#2D9663',
  },
  error: {
    light: '#FF8A80',
    DEFAULT: '#F55C56',
    dark: '#D9423C',
  },
};

// 音效配置
export const soundEffects = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  click: '/sounds/click.mp3',
  levelComplete: '/sounds/level-complete.mp3',
  starEarned: '/sounds/star-earned.mp3',
  badgeUnlock: '/sounds/badge-unlock.mp3',
  buttonHover: '/sounds/button-hover.mp3',
};

// 星级评分标准
export const starRatingThresholds = {
  three: 90, // 90分以上3星
  two: 70,   // 70-89分2星
  one: 60,   // 60-69分1星
};

// 计算星星数量
export function calculateStars(score: number, totalQuestions: number): number {
  const percentage = (score / (totalQuestions * 10)) * 100;
  if (percentage >= starRatingThresholds.three) return 3;
  if (percentage >= starRatingThresholds.two) return 2;
  if (percentage >= starRatingThresholds.one) return 1;
  return 0;
}

// 格式化时间
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 生成随机数
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 打乱数组
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
