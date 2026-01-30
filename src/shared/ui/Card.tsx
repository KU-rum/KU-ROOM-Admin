import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
