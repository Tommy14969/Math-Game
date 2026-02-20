import React from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StarsProps {
  count: number; // 0-3
  size?: number;
  className?: string;
  animate?: boolean;
}

export const Stars: React.FC<StarsProps> = ({
  count,
  size = 32,
  className,
  animate = true,
}) => {
  const validCount = Math.min(Math.max(count, 0), 3);
  const fullStars = Math.floor(validCount);
  const hasHalfStar = validCount % 1 !== 0;

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <motion.div
          key={`full-${i}`}
          variants={animate ? starVariants : undefined}
          initial={animate ? 'hidden' : false}
          animate="visible"
          custom={i}
        >
          <Star
            size={size}
            className="fill-yellow-400 text-yellow-400 drop-shadow-lg"
          />
        </motion.div>
      ))}

      {hasHalfStar && (
        <motion.div
          key="half"
          variants={animate ? starVariants : undefined}
          initial={animate ? 'hidden' : false}
          animate="visible"
          custom={fullStars}
        >
          <StarHalf
            size={size}
            className="fill-yellow-400 text-yellow-400 drop-shadow-lg"
          />
        </motion.div>
      )}

      {[...Array(3 - Math.ceil(validCount))].map((_, i) => (
        <motion.div
          key={`empty-${i}`}
          variants={animate ? starVariants : undefined}
          initial={animate ? 'hidden' : false}
          animate="visible"
          custom={fullStars + (hasHalfStar ? 1 : 0) + i}
        >
          <Star
            size={size}
            className="fill-gray-300 text-gray-300"
          />
        </motion.div>
      ))}
    </div>
  );
};
