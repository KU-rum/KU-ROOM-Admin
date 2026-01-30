import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  id,
  label,
  required,
  options,
  placeholder,
  value,
  onChange,
  disabled,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'mt-2 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm transition-colors',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          isOpen && 'border-primary-500 ring-2 ring-primary-500/20',
        )}
      >
        <span className={cn(!selectedOption && 'text-gray-400')}>
          {selectedOption?.label ?? placeholder ?? '선택하세요'}
        </span>
        <svg
          className={cn(
            'h-5 w-5 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              옵션이 없습니다
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors',
                  'hover:bg-primary-50 hover:text-primary-700',
                  option.value === value &&
                    'bg-primary-50 font-medium text-primary-700',
                )}
              >
                {option.label}
                {option.value === value && (
                  <svg
                    className="ml-auto h-4 w-4 text-primary-600"
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
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
