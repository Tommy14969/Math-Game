'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Grade } from '@/types';
import { gradeConfig } from '@/lib/data';
import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const HomePage: React.FC = () => {
  const router = useRouter();
  const { progress, updateProgress } = useGameStore();

  const handleGradeSelect = (grade: Grade) => {
    updateProgress({ currentGrade: grade });
    router.push(`/difficulty`);
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
    hidden: { y: 20, opacity: 0 },
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
        {/* 标题区域 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 rainbow-text funny-font">
            数学大冒险
          </h1>
          <p className="text-2xl text-gray-600 font-semibold">
            选择你的年级，开始精彩的数学之旅！
          </p>
        </motion.div>

        {/* 年级选择卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {Object.values(Grade).filter((g) => typeof g === 'number').map((grade) => {
            const config = gradeConfig[grade as Grade];
            if (!config) return null;
            return (
              <motion.div key={grade} variants={itemVariants}>
                <Card
                  variant="grade"
                  onClick={() => handleGradeSelect(grade as Grade)}
                  className={`${config.bgColor} border-4 ${config.borderColor} hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      {config.icon}
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 funny-font">
                      {config.name}
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                      {config.description}
                    </p>

                    {/* 进度指示器 */}
                    {progress.currentGrade === grade && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4"
                      >
                        <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-purple-600 shadow-md">
                          当前年级
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 底部按钮 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/badges')}
          >
            🏆 我的徽章
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/stats')}
          >
            📊 学习统计
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/settings')}
          >
            ⚙️ 设置
          </Button>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          className="fixed top-10 left-10 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="fixed top-20 right-20 text-5xl opacity-50 pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌟
        </motion.div>
        <motion.div
          className="fixed bottom-20 left-20 text-5xl opacity-50 pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="fixed bottom-10 right-10 text-6xl opacity-50 pointer-events-none"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          💫
        </motion.div>
      </div>
    </div>
  );
};
