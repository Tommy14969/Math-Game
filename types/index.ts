// 年级枚举
export enum Grade {
  Grade1 = 1,
  Grade2 = 2,
  Grade3 = 3,
  Grade4 = 4,
  Grade5 = 5,
  Grade6 = 6,
}

// 难度枚举
export enum Difficulty {
  Basic = 'basic',      // 基础
  Advanced = 'advanced', // 进阶
  Olympiad = 'olympiad', // 奥数
}

// 题目类型枚举
export enum QuestionType {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
  Mixed = 'mixed',
  WordProblem = 'word_problem',
  Fraction = 'fraction',
  Decimal = 'decimal',
  Equation = 'equation',
  Geometry = 'geometry',
}

// 题目接口
export interface Question {
  id: string;
  grade: Grade;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options?: number[];
  answer: number | string;
  points: number;
  timeLimit?: number; // 秒
  hint?: string;
  explanation?: string;
}

// 关卡状态枚举
export enum LevelStatus {
  Locked = 'locked',
  Unlocked = 'unlocked',
  Completed = 'completed',
  Perfect = 'perfect', // 三星完美通关
}

// 关卡接口
export interface Level {
  id: string;
  grade: Grade;
  difficulty: Difficulty;
  levelNumber: number;
  title: string;
  description: string;
  questions: Question[];
  totalStars: number;
  earnedStars: number;
  status: LevelStatus;
  requiredScore: number;
  timeLimit?: number;
}

// 游戏进度接口
export interface GameProgress {
  currentGrade: Grade;
  currentDifficulty: Difficulty;
  currentLevel: string;
  totalScore: number;
  levels: {
    [levelId: string]: {
      stars: number;
      highScore: number;
      completedAt?: string;
      attempts: number;
    };
  };
}

// 游戏状态接口
export interface GameState {
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  streak: number; // 连续答对次数
  isPaused: boolean;
  timeRemaining?: number;
  hintsUsed: number;
}

// 徽章稀有度枚举
export enum BadgeRarity {
  Common = 'common',      // 普通
  Uncommon = 'uncommon',  // 稀有
  Rare = 'rare',          // 史诗
  Epic = 'epic',          // 传说
  Legendary = 'legendary',// 神话
}

// 徽章类别枚举
export enum BadgeCategory {
  Achievement = 'achievement',    // 成就
  Progress = 'progress',          // 进度
  Special = 'special',            // 特殊
  Challenge = 'challenge',        // 挑战
  Collectible = 'collectible',    // 收集
  Seasonal = 'seasonal',          // 季节限定
}

// 徽章接口
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: BadgeCategory;
  requirement: {
    type: string;
    value: number | string;
    condition?: string;
  };
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

// 用户统计数据接口
export interface UserStats {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalStarsEarned: number;
  totalBadgesUnlocked: number;
  highestStreak: number;
  averageScore: number;
  totalTimeSpent: number; // 分钟
  favoriteGrade: Grade;
  favoriteDifficulty: Difficulty;
}

// 排行榜条目接口
export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar?: string;
  score: number;
  grade?: Grade;
  badges?: number;
}

// 成就类型
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: {
    type: 'badge' | 'points' | 'title';
    value: string | number;
  };
}

// 设置接口
export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  animationsEnabled: boolean;
  timerEnabled: boolean;
  difficulty: Difficulty;
  language: 'zh-CN' | 'en-US';
}
