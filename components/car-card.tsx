'use client';

import Link from 'next/link';
import { Car } from '@/lib/types';
import { CarImage } from './car-image';
import { StatsBars } from './stats-bars';
import { FavoriteButton } from './favorite-button';
import { CompareButton } from './compare-button';
import { formatPrice, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  compact?: boolean;
}

export function CarCard({ car, compact = false }: CarCardProps) {
  const stats = [
    {
      label: 'Speed',
      value: car.stats?.speed,
      maxValue: 250,
      color: 'bg-accent',
    },
    {
      label: 'Handling',
      value: car.stats?.handling,
      maxValue: 10,
      color: 'bg-accent',
    },
    {
      label: 'Acceleration',
      value: car.stats?.acceleration,
      maxValue: 10,
      color: 'bg-accent-secondary',
    },
  ];

  return (
    <Link href={`/cars/${car.id}`}>
      <div className={cn(
        'group relative rounded-lg border border-border transition-all duration-300',
        'hover:border-accent hover:shadow-neon-cyan',
        'bg-card hover:bg-card-hover',
        'hover-lift cursor-pointer h-full',
        compact ? 'overflow-hidden' : 'flex flex-col'
      )}>
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-card-hover rounded-t-lg">
          <div className="absolute inset-0">
            <CarImage
              car={car}
              alt={car.name}
              width={400}
              height={300}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Overlay Buttons */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <FavoriteButton carId={car.id} size="md" />
            <CompareButton carId={car.id} size="md" />
          </div>

          {/* Class Badge */}
          <div className="absolute top-2 left-2 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold">
            {car.class}
          </div>

          {/* PI Badge */}
          {car.rating_pi && (
            <div className="absolute top-2 right-2 bg-accent-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
              {formatNumber(car.rating_pi)} PI
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          'flex-1 flex flex-col p-4',
          compact ? 'p-3' : ''
        )}>
          {/* Title and Year */}
          <div className="mb-3">
            <h3 className="font-bold text-foreground group-hover:text-accent transition-colors duration-300 text-balance">
              {car.name}
            </h3>
            <p className="text-sm text-text-muted">{car.year} • {car.manufacturer}</p>
          </div>

          {/* Stats Bars */}
          {!compact && (
            <div className="mb-4 flex-1">
              <StatsBars stats={stats} variant="compact" animated={false} />
            </div>
          )}

          {/* Bottom Info */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              {car.power_bhp && (
                <p className="text-sm text-accent font-semibold">
                  {Math.round(car.power_bhp)} hp
                </p>
              )}
              {car.price_cr && (
                <p className="text-xs text-text-muted">
                  {formatPrice(car.price_cr)}
                </p>
              )}
            </div>
            <div className="text-right text-xs text-text-muted">
              <p className="font-medium text-foreground">{car.layout}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
