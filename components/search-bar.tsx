'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search cars by name or manufacturer...',
  initialValue = '',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-10 py-2.5 rounded-lg',
          'bg-card border border-border',
          'text-foreground placeholder:text-text-muted',
          'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50',
          'transition-all duration-200'
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
