import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'grade' | 'level' | 'badge';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  onClick,
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-white rounded-3xl shadow-xl p-6',
    grade: 'bg-white rounded-3xl shadow-xl p-8 cursor-pointer transform transition-all duration-300',
    level: 'bg-white rounded-3xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transform transition-all duration-300',
    badge: 'bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transform transition-all duration-300',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={cn(
        variants[variant],
        hover && 'hover:shadow-2xl',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
