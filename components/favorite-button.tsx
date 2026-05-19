'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  carId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  onToggle?: (isFavorite: boolean) => void;
}

export function FavoriteButton({
  carId,
  size = 'md',
  variant = 'icon',
  onToggle,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(carId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(carId);
    onToggle?.(!isFav);
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
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200',
          'hover:scale-110 active:scale-95',
          isFav ? 'bg-accent-secondary' : 'bg-card-hover hover:bg-card',
          sizeClasses[size]
        )}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={iconSizes[size]}
          className={cn(
            'transition-all duration-200',
            isFav ? 'fill-white text-white' : 'text-text-muted'
          )}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
        'hover:scale-105 active:scale-95',
        isFav
          ? 'bg-accent-secondary text-white'
          : 'bg-card hover:bg-card-hover text-foreground'
      )}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(isFav && 'fill-white')}
      />
      {isFav ? 'Favorited' : 'Favorite'}
    </button>
  );
}
