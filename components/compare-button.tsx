'use client';

import { BarChart3 } from 'lucide-react';
import { useCompare } from '@/lib/hooks/use-compare';
import { cn } from '@/lib/utils';

interface CompareButtonProps {
  carId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  onToggle?: (isSelected: boolean) => void;
}

export function CompareButton({
  carId,
  size = 'md',
  variant = 'icon',
  onToggle,
}: CompareButtonProps) {
  const { isSelected, toggleCompare, canAddMore } = useCompare();
  const isSelected_ = isSelected(carId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSelected_ && !canAddMore()) {
      return;
    }

    toggleCompare(carId);
    onToggle?.(!isSelected_);
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        disabled={!isSelected_ && !canAddMore()}
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200',
          'hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          isSelected_ ? 'bg-accent' : 'bg-card-hover hover:bg-card',
          sizeClasses[size]
        )}
        aria-label={isSelected_ ? 'Remove from comparison' : 'Add to comparison'}
      >
        <BarChart3
          size={iconSizes[size]}
          className={cn(
            'transition-all duration-200',
            isSelected_ ? 'text-background fill-background' : 'text-text-muted'
          )}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isSelected_ && !canAddMore()}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
        'hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected_
          ? 'bg-accent text-background'
          : 'bg-card hover:bg-card-hover text-foreground'
      )}
    >
      <BarChart3 size={iconSizes[size]} />
      {isSelected_ ? 'Comparing' : 'Compare'}
    </button>
  );
}
