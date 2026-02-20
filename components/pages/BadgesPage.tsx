'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Badge, BadgeCategory, BadgeRarity } from '@/types';
import { badgeRarityConfig, sampleBadges } from '@/lib/data';
import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const BadgesPage: React.FC = () => {
  const router = useRouter();
  const { badges, unlockedBadges } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // 使用示例数据
  const allBadges = sampleBadges;

  const filteredBadges = selectedCategory === 'all'
    ? allBadges
    : allBadges.filter(badge => badge.category === selectedCategory);

  const categories: (BadgeCategory | 'all')[] = [
    'all',
    BadgeCategory.Achievement,
    BadgeCategory.Progress,
    BadgeCategory.Special,
    BadgeCategory.Challenge,
  ];

  const categoryNames: Record<string, string> = {
    all: '全部',
    achievement: '成就',
    progress: '进度',
    special: '特殊',
    challenge: '挑战',
    collectible: '收集',
    seasonal: '季节',
  };

  const categoryIcons: Record<string, string> = {
    all: '🎯',
    achievement: '🏆',
    progress: '📈',
    special: '⭐',
    challenge: '💪',
    collectible: '🎁',
    seasonal: '🌸',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 funny-font rainbow-text">
            徽章收藏馆
          </h1>
          <p className="text-2xl text-gray-600 font-semibold">
            收集所有徽章，成为数学大师！
          </p>
          <div className="mt-6 inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg">
            <span className="text-3xl">🏆</span>
            <span className="text-2xl font-bold text-purple-600">
              已解锁: {unlockedBadges.length} / {allBadges.length}
            </span>
          </div>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {categoryNames[category]}
            </motion.button>
          ))}
        </motion.div>

        {/* 稀有度图例 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          {Object.values(BadgeRarity).map((rarity) => {
            const config = badgeRarityConfig[rarity];
            return (
              <div key={rarity} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${config.color} ${config.glowColor}`} />
                <span className="text-sm font-medium text-gray-600">{config.name}</span>
              </div>
            );
          })}
        </motion.div>

        {/* 徽章网格 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="badge-grid"
        >
          {filteredBadges.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const rarityConfig = badgeRarityConfig[badge.rarity];

            return (
              <motion.div key={badge.id} variants={itemVariants}>
                <Card
                  variant="badge"
                  onClick={() => setSelectedBadge(badge)}
                  className={`relative overflow-hidden ${
                    isUnlocked ? rarityConfig.glowColor : 'grayscale opacity-60'
                  }`}
                >
                  {/* 徽章图标 */}
                  <motion.div
                    className={`text-6xl mb-3 ${isUnlocked ? 'animate-float' : ''}`}
                    animate={isUnlocked ? { y: [0, -10, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {badge.icon}
                  </motion.div>

                  {/* 徽章名称 */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    {badge.name}
                  </h3>

                  {/* 稀有度标签 */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded ${rarityConfig.color} text-white text-xs font-bold`}>
                    {rarityConfig.name}
                  </div>

                  {/* 解锁状态 */}
                  {isUnlocked && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}

                  {/* 进度条 */}
                  {!isUnlocked && badge.maxProgress && badge.progress !== undefined && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        {badge.progress} / {badge.maxProgress}
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 徽章详情弹窗 */}
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedBadge(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                {/* 徽章图标 */}
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedBadge.icon}
                </motion.div>

                {/* 徽章名称 */}
                <h2 className="text-3xl font-bold mb-4 funny-font text-gray-800">
                  {selectedBadge.name}
                </h2>

                {/* 稀有度 */}
                <div className={`inline-block px-4 py-2 rounded-full mb-4 ${badgeRarityConfig[selectedBadge.rarity].color} text-white font-bold`}>
                  {badgeRarityConfig[selectedBadge.rarity].name}
                </div>

                {/* 描述 */}
                <p className="text-lg text-gray-600 mb-6">
                  {selectedBadge.description}
                </p>

                {/* 解锁条件 */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <h3 className="font-bold text-gray-700 mb-2">解锁条件</h3>
                  <p className="text-gray-600">
                    {selectedBadge.requirement.type === 'questions_answered' && `完成 ${selectedBadge.requirement.value} 道题目`}
                    {selectedBadge.requirement.type === 'perfect_level' && '任意关卡获得3星评价'}
                    {selectedBadge.requirement.type === 'streak' && `连续答对 ${selectedBadge.requirement.value} 道题`}
                    {selectedBadge.requirement.type === 'speed' && '30秒内完成一道题'}
                    {selectedBadge.requirement.type === 'play_time' && '在特定时间游戏'}
                  </p>
                </div>

                {/* 进度 */}
                {selectedBadge.maxProgress && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">进度</span>
                      <span className="text-sm font-bold text-purple-600">
                        {selectedBadge.progress || 0} / {selectedBadge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                        style={{
                          width: `${((selectedBadge.progress || 0) / selectedBadge.maxProgress) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* 关闭按钮 */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setSelectedBadge(null)}
                  className="w-full"
                >
                  关闭
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
