import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, className, id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors',
            'placeholder:text-gray-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:bg-gray-50 disabled:text-gray-500',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
