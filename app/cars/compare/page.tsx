'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCarsById, getAllCars } from '@/lib/cars-data';
import { useCompare } from '@/lib/hooks/use-compare';
import { CompareTable } from '@/components/compare-table';
import { CarCard } from '@/components/car-card';
import { ArrowLeft, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const compare = useCompare();
  const [selectedCars, setSelectedCars] = useState(getCarsById(compare.selectedCars));
  const allCars = getAllCars();

  useEffect(() => {
    setSelectedCars(getCarsById(compare.selectedCars));
  }, [compare.selectedCars]);

  const handleRemoveCar = (carId: string) => {
    compare.removeFromCompare(carId);
  };

  const availableCars = allCars.filter((car) => !compare.selectedCars.includes(car.id));

  if (selectedCars.length === 0) {
    return (
      <main className="w-full min-h-screen">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Link
              href="/cars"
              className="flex items-center gap-2 text-text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Cars
            </Link>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">No Cars Selected</h1>
          <p className="text-text-muted text-center max-w-md mb-6">
            Select 2-4 cars from the database to compare them side-by-side.
          </p>
          <Link
            href="/cars"
            className={cn(
              'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
              'bg-accent text-background hover:bg-accent-secondary',
              'flex items-center justify-center gap-2'
            )}
          >
            Browse Cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/cars"
              className="flex items-center gap-2 text-text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Cars
            </Link>
            <h1 className="text-xl font-bold text-foreground">
              Comparing {selectedCars.length} Cars
            </h1>
            <div className="w-12" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Comparison Table */}
        <div className="rounded-lg border border-border bg-card p-6 mb-12 overflow-auto">
          <CompareTable cars={selectedCars} onRemoveCar={handleRemoveCar} />
        </div>

        {/* Add More Cars */}
        {compare.canAddMore() && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Add More Cars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableCars.slice(0, 12).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {availableCars.length > 12 && (
              <div className="text-center mt-8">
                <Link
                  href="/cars"
                  className={cn(
                    'inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200',
                    'bg-card border border-border hover:border-accent'
                  )}
                >
                  View All Cars
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Clear Comparison */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <button
            onClick={compare.clearCompare}
            className={cn(
              'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
              'bg-card-hover text-foreground hover:text-accent-secondary'
            )}
          >
            Clear Comparison
          </button>
        </div>
      </div>
    </main>
  );
}
