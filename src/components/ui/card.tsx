'use client';

import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

const cardVariants = {
  default: 'bg-white/80 backdrop-blur-sm',
  elevated:
    'bg-white shadow-xl shadow-black/5',
  bordered: 'bg-white border border-beige-200',
};

export function Card({
  variant = 'default',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl ${cardVariants[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
