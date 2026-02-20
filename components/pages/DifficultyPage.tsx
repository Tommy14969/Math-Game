'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Difficulty } from '@/types';
import { difficultyConfig, gradeConfig } from '@/lib/data';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/Button';

export const DifficultyPage: React.FC = () => {
  const router = useRouter();
  const { progress, updateProgress } = useGameStore();
  const currentGrade = progress.currentGrade;
  const gradeInfo = gradeConfig[currentGrade];

  const handleDifficultySelect = (difficulty: Difficulty) => {
    updateProgress({ currentDifficulty: difficulty });
    router.push('/levels');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 返回按钮 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.back()}
          >
            ← 返回
          </Button>
        </motion.div>

        {/* 标题区域 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="text-8xl mb-4 animate-bounce-slow">
            {gradeInfo.icon}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 funny-font text-gray-800">
            {gradeInfo.name}
          </h1>
          <p className="text-2xl text-gray-600 font-semibold">
            选择难度等级，挑战自我！
          </p>
        </motion.div>

        {/* 难度选择卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {Object.values(Difficulty).map((difficulty) => {
            const config = difficultyConfig[difficulty];
            return (
              <motion.div key={difficulty} variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div
                    className={`difficulty-btn ${config.color} ${config.hoverColor} cursor-pointer min-h-[300px] flex flex-col items-center justify-center p-8`}
                    onClick={() => handleDifficultySelect(difficulty)}
                  >
                    <motion.div
                      className="text-7xl mb-6"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    >
                      {config.icon}
                    </motion.div>
                    <h2 className="text-4xl font-bold mb-4 funny-font">
                      {config.name}
                    </h2>
                    <p className="text-xl opacity-90 font-medium text-center">
                      {config.description}
                    </p>
                    <div className="mt-6 px-6 py-3 bg-white/20 rounded-full">
                      <span className="text-2xl font-bold">
                        {config.pointsMultiplier}x 积分
                      </span>
                    </div>

                    {/* 难度标签 */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1, rotate: 360 }}
                      className="absolute top-4 right-4 px-4 py-2 bg-white/30 rounded-full"
                    >
                      <span className="text-sm font-bold">
                        {difficulty === Difficulty.Basic && '🌱 入门'}
                        {difficulty === Difficulty.Advanced && '🌿 进阶'}
                        {difficulty === Difficulty.Olympiad && '🌳 挑战'}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 提示信息 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-8 py-4 bg-white rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 font-medium">
              💡 提示：选择更高的难度可以获得更多的积分和徽章！
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
