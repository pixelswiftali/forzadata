'use client';

import { ChevronDown } from 'lucide-react';
import { SortOption } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Year (Newest)', value: 'year' },
  { label: 'PI Rating (Highest)', value: 'pi' },
  { label: 'Speed (Fastest)', value: 'speed' },
  { label: 'Handling (Best)', value: 'handling' },
  { label: 'Acceleration (Fastest)', value: 'acceleration' },
  { label: 'Power (Most)', value: 'power' },
  { label: 'Weight (Lightest)', value: 'weight' },
  { label: 'Price (Highest)', value: 'price' },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === value)?.label || 'Sort by';

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full sm:w-auto px-4 py-2.5 rounded-lg',
          'bg-card border border-border',
          'text-foreground text-sm font-medium',
          'flex items-center justify-between gap-2',
          'hover:bg-card-hover focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50',
          'transition-all duration-200'
        )}
      >
        {currentLabel}
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className={cn(
          'absolute top-full left-0 right-0 mt-2 w-full sm:w-64 z-50',
          'bg-card border border-border rounded-lg shadow-lg',
          'animate-slide-up'
        )}>
          <div className="max-h-64 overflow-y-auto">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm',
                  'hover:bg-card-hover transition-colors',
                  value === option.value && 'bg-card-hover border-l-2 border-accent'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
