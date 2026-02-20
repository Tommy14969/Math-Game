import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Grade, Difficulty, Level, Question, GameProgress, GameState, Badge, UserStats, GameSettings, LevelStatus, BadgeRarity } from '@/types';

interface GameStore {
  // 游戏进度
  progress: GameProgress;
  updateProgress: (progress: Partial<GameProgress>) => void;
  unlockLevel: (levelId: string) => void;
  completeLevel: (levelId: string, stars: number, score: number) => void;

  // 当前游戏状态
  currentGameState: GameState | null;
  startGame: (level: Level) => void;
  answerQuestion: (questionId: string, answer: number | string, isCorrect: boolean) => void;
  nextQuestion: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  updateStreak: (streak: number) => void;
  useHint: () => void;

  // 当前关卡和题目
  currentLevel: Level | null;
  currentQuestion: Question | null;
  setCurrentLevel: (level: Level) => void;
  setCurrentQuestion: (question: Question) => void;

  // 徽章
  badges: Badge[];
  unlockedBadges: string[];
  unlockBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
  checkBadgeUnlock: () => void;

  // 用户统计
  stats: UserStats;
  updateStats: (stats: Partial<UserStats>) => void;

  // 设置
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;

  // UI状态
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
}

const initialProgress: GameProgress = {
  currentGrade: Grade.Grade1,
  currentDifficulty: Difficulty.Basic,
  currentLevel: '',
  totalScore: 0,
  levels: {},
};

const initialStats: UserStats = {
  totalGamesPlayed: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  totalStarsEarned: 0,
  totalBadgesUnlocked: 0,
  highestStreak: 0,
  averageScore: 0,
  totalTimeSpent: 0,
  favoriteGrade: Grade.Grade1,
  favoriteDifficulty: Difficulty.Basic,
};

const initialSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  animationsEnabled: true,
  timerEnabled: true,
  difficulty: Difficulty.Basic,
  language: 'zh-CN',
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // 游戏进度
      progress: initialProgress,
      updateProgress: (newProgress) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgress },
        })),

      unlockLevel: (levelId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            levels: {
              ...state.progress.levels,
              [levelId]: {
                stars: 0,
                highScore: 0,
                attempts: (state.progress.levels[levelId]?.attempts || 0) + 1,
              },
            },
          },
        })),

      completeLevel: (levelId, stars, score) =>
        set((state) => {
          const currentLevelData = state.progress.levels[levelId] || {
            stars: 0,
            highScore: 0,
            attempts: 0,
          };

          return {
            progress: {
              ...state.progress,
              levels: {
                ...state.progress.levels,
                [levelId]: {
                  stars: Math.max(currentLevelData.stars, stars),
                  highScore: Math.max(currentLevelData.highScore, score),
                  completedAt: currentLevelData.completedAt || new Date().toISOString(),
                  attempts: currentLevelData.attempts + 1,
                },
              },
            },
            totalScore: state.progress.totalScore + score,
          };
        }),

      // 当前游戏状态
      currentGameState: null,
      startGame: (level) =>
        set({
          currentGameState: {
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streak: 0,
            isPaused: false,
            timeRemaining: level.timeLimit,
            hintsUsed: 0,
          },
          currentLevel: level,
          currentQuestion: level.questions[0],
        }),

      answerQuestion: (questionId, answer, isCorrect) =>
        set((state) => {
          if (!state.currentGameState) return state;

          const points = isCorrect ? 10 + (state.currentGameState.streak * 2) : 0;
          return {
            currentGameState: {
              ...state.currentGameState,
              score: state.currentGameState.score + points,
              correctAnswers: state.currentGameState.correctAnswers + (isCorrect ? 1 : 0),
              wrongAnswers: state.currentGameState.wrongAnswers + (isCorrect ? 0 : 1),
              streak: isCorrect ? state.currentGameState.streak + 1 : 0,
            },
          };
        }),

      nextQuestion: () =>
        set((state) => {
          if (!state.currentGameState || !state.currentLevel) return state;

          const nextIndex = state.currentGameState.currentQuestionIndex + 1;
          if (nextIndex >= state.currentLevel.questions.length) {
            return state;
          }

          return {
            currentGameState: {
              ...state.currentGameState,
              currentQuestionIndex: nextIndex,
            },
            currentQuestion: state.currentLevel.questions[nextIndex],
          };
        }),

      pauseGame: () =>
        set((state) => ({
          currentGameState: state.currentGameState
            ? { ...state.currentGameState, isPaused: true }
            : null,
        })),

      resumeGame: () =>
        set((state) => ({
          currentGameState: state.currentGameState
            ? { ...state.currentGameState, isPaused: false }
            : null,
        })),

      resetGame: () =>
        set({
          currentGameState: null,
          currentLevel: null,
          currentQuestion: null,
        }),

      updateStreak: (streak) =>
        set((state) => ({
          currentGameState: state.currentGameState
            ? { ...state.currentGameState, streak }
            : null,
        })),

      useHint: () =>
        set((state) => ({
          currentGameState: state.currentGameState
            ? { ...state.currentGameState, hintsUsed: state.currentGameState.hintsUsed + 1 }
            : null,
        })),

      // 当前关卡和题目
      currentLevel: null,
      currentQuestion: null,
      setCurrentLevel: (level) => set({ currentLevel: level }),
      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      // 徽章
      badges: [],
      unlockedBadges: [],
      unlockBadge: (badgeId) =>
        set((state) => ({
          unlockedBadges: [...new Set([...state.unlockedBadges, badgeId])],
          stats: {
            ...state.stats,
            totalBadgesUnlocked: state.stats.totalBadgesUnlocked + 1,
          },
        })),

      updateBadgeProgress: (badgeId, progress) =>
        set((state) => ({
          badges: state.badges.map((badge) =>
            badge.id === badgeId ? { ...badge, progress } : badge
          ),
        })),

      checkBadgeUnlock: () => {
        // 这个函数会在游戏过程中检查是否满足徽章解锁条件
        const state = get();
        // 实现徽章解锁逻辑
        // TODO: 添加具体的徽章解锁条件检查
      },

      // 用户统计
      stats: initialStats,
      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),

      // 设置
      settings: initialSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // UI状态
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      showConfetti: false,
      setShowConfetti: (show) => set({ showConfetti: show }),
    }),
    {
      name: 'math-game-storage',
      partialize: (state) => ({
        progress: state.progress,
        badges: state.badges,
        unlockedBadges: state.unlockedBadges,
        stats: state.stats,
        settings: state.settings,
      }),
    }
  )
);
