'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger, onComplete }) => {
  useEffect(() => {
    if (trigger) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          onComplete?.();
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // 从两侧发射
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger, onComplete]);

  return null;
};

// 简单版本的庆祝动画（减少粒子数量，避免遮挡）
export const Celebration: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      const end = Date.now() + 800;

      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 40,
          origin: { x: 0, y: 0.8 }, // 从底部发射
          colors: colors,
          zIndex: 100, // 降低zIndex
          scalar: 0.5, // 减小粒子尺寸
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 40,
          origin: { x: 1, y: 0.8 }, // 从底部发射
          colors: colors,
          zIndex: 100,
          scalar: 0.5,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [trigger]);

  return null;
};
