'use client';

import Link from 'next/link';
import { Car } from '@/lib/types';
import { CarCard } from './car-card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeFeaturedCarsProps {
  topPICars: Car[];
  fastestCars: Car[];
  mostPowerfulCars: Car[];
  randomCar: Car | null;
}

export function HomeFeaturedCars({
  topPICars,
  fastestCars,
  mostPowerfulCars,
  randomCar,
}: HomeFeaturedCarsProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Top PI Cars */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Top PI Cars</h2>
            <Link
              href="/cars?sort=pi"
              className="text-accent hover:text-accent-secondary transition-colors flex items-center gap-2"
            >
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPICars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>

        {/* Fastest Cars */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Fastest Cars</h2>
            <Link
              href="/cars?sort=speed"
              className="text-accent hover:text-accent-secondary transition-colors flex items-center gap-2"
            >
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastestCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>

        {/* Most Powerful Cars */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Most Powerful</h2>
            <Link
              href="/cars?sort=power"
              className="text-accent hover:text-accent-secondary transition-colors flex items-center gap-2"
            >
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostPowerfulCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>

        {/* Random Car */}
        {randomCar && (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Random Feature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CarCard key={randomCar.id} car={randomCar} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
