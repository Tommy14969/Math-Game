'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Stars } from '@/components/ui/Stars';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/ui/Confetti';

export const CompletePage: React.FC = () => {
  const router = useRouter();
  const { progress, setShowConfetti } = useGameStore();
  const [showConfetti, setShowConfettiLocal] = React.useState(false);
  const [gameState, setGameState] = React.useState<any>(null);

  useEffect(() => {
    // 从 sessionStorage 读取游戏结果
    const savedResult = sessionStorage.getItem('lastGameResult');
    if (savedResult) {
      try {
        setGameState(JSON.parse(savedResult));
        setShowConfettiLocal(true);
        const timer = setTimeout(() => {
          setShowConfettiLocal(false);
        }, 5000);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error('Failed to parse saved game result:', e);
      }
    }
    // 如果没有保存的数据，返回首页
    else {
      router.push('/');
    }
  }, [router]);

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-600">加载中...</div>
      </div>
    );
  }

  const score = gameState.score;
  const correctAnswers = gameState.correctAnswers;
  const totalQuestions = gameState.correctAnswers + gameState.wrongAnswers;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // 计算星星
  const calculateStars = (score: number, total: number): number => {
    const maxScore = total * 10;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 60) return 1;
    return 0;
  };

  const earnedStars = calculateStars(score, totalQuestions);

  return (
    <div className="min-h-screen py-12 px-4">
      <Confetti trigger={showConfetti} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center"
        >
          {/* 庆祝图标 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>

          {/* 标题 */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold mb-8 funny-font text-gray-800"
          >
            关卡完成！
          </motion.h1>

          {/* 星星评分 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
            className="mb-12"
          >
            <Stars count={earnedStars} size={64} animate />
          </motion.div>

          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-yellow-700 mb-1">
                {score}
              </div>
              <div className="text-gray-600">总分</div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-gray-600">答对题数</div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {accuracy}%
              </div>
              <div className="text-gray-600">正确率</div>
            </div>
          </motion.div>

          {/* 额外成就 */}
          {gameState.streak >= 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="mb-8 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl"
            >
              <div className="text-5xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-700">
                连续答对 {gameState.streak} 题！
              </div>
            </motion.div>
          )}

          {/* 按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="secondary"
              size="xl"
              onClick={() => router.push('/')}
            >
              🏠 返回首页
            </Button>
            <Button
              variant="primary"
              size="xl"
              onClick={() => router.push('/levels')}
            >
              📚 返回关卡
            </Button>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => router.push('/badges')}
            >
              🏆 查看徽章
            </Button>
          </motion.div>

          {/* 新解锁徽章提示 */}
          {earnedStars === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl"
            >
              <div className="text-3xl mb-2">🎖️</div>
              <div className="text-xl font-bold text-purple-700">
                完美通关！解锁新徽章！
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
