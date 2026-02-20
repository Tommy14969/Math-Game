'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Level, LevelStatus } from '@/types';
import { useGameStore } from '@/store/gameStore';
import { gradeConfig, difficultyConfig, sampleLevels } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { Stars } from '@/components/ui/Stars';
import { Button } from '@/components/ui/Button';
import { Lock, Play } from 'lucide-react';

export const LevelsPage: React.FC = () => {
  const router = useRouter();
  const { progress, completeLevel } = useGameStore();
  const currentGrade = progress.currentGrade;
  const currentDifficulty = progress.currentDifficulty;

  const gradeInfo = gradeConfig[currentGrade];
  const difficultyInfo = difficultyConfig[currentDifficulty];

  // 过滤当前年级和难度的关卡
  const levels = sampleLevels.filter(
    (level) => level.grade === currentGrade && level.difficulty === currentDifficulty
  );

  const handleLevelClick = (level: Level) => {
    if (level.status === LevelStatus.Locked) {
      return; // 锁定的关卡不能点击
    }
    router.push(`/game/${level.id}`);
  };

  const getLevelStatus = (levelNumber: number): LevelStatus => {
    // 简单的解锁逻辑：完成前一关才能解锁下一关
    if (levelNumber === 1) return LevelStatus.Unlocked;

    const prevLevel = levels.find((l) => l.levelNumber === levelNumber - 1);
    if (prevLevel && progress.levels[prevLevel.id]?.stars) {
      return LevelStatus.Unlocked;
    }
    return LevelStatus.Locked;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/')}
          >
            🏠 返回首页
          </Button>
        </motion.div>

        {/* 标题区域 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <span className="text-6xl">{gradeInfo.icon}</span>
            <span className="text-5xl">📚</span>
            <span className="text-6xl">{difficultyInfo.icon}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 funny-font text-gray-800">
            {gradeInfo.name} - {difficultyInfo.name}
          </h1>
          <p className="text-xl text-gray-600 font-semibold">
            选择关卡，开始挑战！
          </p>
        </motion.div>

        {/* 关卡网格 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {levels.map((level, index) => {
            const status = getLevelStatus(level.levelNumber);
            const levelData = progress.levels[level.id];
            const earnedStars = levelData?.stars || 0;
            const isLocked = status === LevelStatus.Locked;

            return (
              <motion.div key={level.id} variants={itemVariants}>
                <Card
                  variant="level"
                  onClick={() => handleLevelClick({ ...level, status })}
                  className={`relative overflow-hidden ${
                    isLocked
                      ? 'opacity-60 cursor-not-allowed'
                      : 'cursor-pointer hover:scale-105'
                  }`}
                >
                  {/* 关卡编号 */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {level.levelNumber}
                  </div>

                  {/* 锁定图标 */}
                  {isLocked && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                      <Lock size={24} className="text-white" />
                    </div>
                  )}

                  {/* 内容 */}
                  <div className="pt-16 pb-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 funny-font">
                      {level.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-medium">
                      {level.description}
                    </p>

                    {/* 星星评分 */}
                    {!isLocked && (
                      <div className="mb-4">
                        <Stars count={earnedStars} size={32} />
                      </div>
                    )}

                    {/* 进度信息 */}
                    {levelData?.highScore && (
                      <div className="mb-4 px-4 py-2 bg-yellow-50 rounded-full">
                        <span className="text-sm font-bold text-yellow-700">
                          最高分: {levelData.highScore}
                        </span>
                      </div>
                    )}

                    {/* 开始按钮 */}
                    {!isLocked && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold text-lg shadow-lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Play size={20} />
                          开始挑战
                        </span>
                      </motion.button>
                    )}

                    {isLocked && (
                      <div className="w-full py-3 bg-gray-300 text-gray-500 rounded-full font-bold text-lg">
                        完成上一关解锁
                      </div>
                    )}
                  </div>

                  {/* 彩色边框 */}
                  <div className={`absolute bottom-0 left-0 w-full h-2 ${gradeInfo.color.replace('bg-', 'bg-gradient-to-r from-')} to-purple-500`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 统计信息 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <Card className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-yellow-500 mb-1">
              {Object.values(progress.levels).reduce((sum, level) => sum + level.stars, 0)}
            </div>
            <div className="text-gray-600">获得星星</div>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold text-purple-500 mb-1">
              {Object.values(progress.levels).filter((level) => level.stars === 3).length}
            </div>
            <div className="text-gray-600">完美通关</div>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-green-500 mb-1">
              {progress.totalScore}
            </div>
            <div className="text-gray-600">总分</div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
