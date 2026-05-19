'use client';

import { Car } from '@/lib/types';
import { CarCard } from './car-card';
import { cn } from '@/lib/utils';

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: number;
}

export function CarGrid({
  cars,
  loading = false,
  emptyMessage = 'No cars found matching your filters.',
  columns = 4,
}: CarGridProps) {
  if (loading) {
    return (
      <div className={cn(
        'grid gap-6',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      )}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-card-hover h-96 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No cars found</h3>
        <p className="text-text-muted text-center max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(
      'grid gap-6 animate-fade-in',
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    )}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
