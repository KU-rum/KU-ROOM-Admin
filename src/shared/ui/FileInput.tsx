import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  required?: boolean;
  helperText?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, required, helperText, className, id, ...props }, ref) => {
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
          type="file"
          id={id}
          className={cn(
            'mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors',
            'file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-700',
            'file:transition-colors file:hover:bg-primary-100',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            className,
          )}
          {...props}
        />
        {helperText && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
