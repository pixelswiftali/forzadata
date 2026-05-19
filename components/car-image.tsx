'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Car } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CarImageProps {
  car: Car;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallbackClassName?: string;
}

export function CarImage({
  car,
  alt,
  width = 400,
  height = 300,
  priority = false,
  className,
  fallbackClassName,
}: CarImageProps) {
  const [imageError, setImageError] = useState(false);

  const imagePath = car.image?.local_path;
  const hasImage = imagePath && !imageError;

  if (!hasImage) {
    return (
      <div
        className={cn(
          'w-full h-full bg-gradient-to-br from-card to-card-hover flex items-center justify-center rounded-lg',
          fallbackClassName
        )}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">🏎️</div>
          <p className="text-sm text-text-muted">
            {car.name}
          </p>
          <p className="text-xs text-gray-600 mt-1">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden rounded-lg', className)}>
      <Image
        src={imagePath}
        alt={alt || car.name}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
