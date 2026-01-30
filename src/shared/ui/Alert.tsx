import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface AlertProps {
  variant: 'success' | 'error';
  children: ReactNode;
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variant === 'success' && 'bg-green-50',
        variant === 'error' && 'bg-red-50',
      )}
    >
      <div className="flex items-center gap-2">
        {variant === 'success' && (
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {variant === 'error' && (
          <svg
            className="h-5 w-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <p
          className={cn(
            'text-sm font-medium',
            variant === 'success' && 'text-green-800',
            variant === 'error' && 'text-red-800',
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
