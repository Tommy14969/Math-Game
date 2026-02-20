import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number; // 0-100
  total?: number;
  current?: number;
  showLabel?: boolean;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  current,
  showLabel = false,
  color = 'green',
  size = 'md',
  className,
}) => {
  const colors = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    pink: 'from-pink-400 to-pink-600',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const displayProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (total || current) && (
        <div className="flex justify-between items-center mb-2 text-sm font-bold text-gray-600">
          <span>进度</span>
          <span>
            {current || 0} / {total || 0}
          </span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'h-full bg-gradient-to-r transition-all duration-500',
            colors[color]
          )}
        />
      </div>
      {showLabel && !total && !current && (
        <div className="text-center mt-2 text-sm font-bold text-gray-600">
          {displayProgress.toFixed(0)}%
        </div>
      )}
    </div>
  );
};
