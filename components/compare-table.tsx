'use client';

import { Car } from '@/lib/types';
import {
  formatNumber,
  formatPrice,
  formatPower,
  formatWeight,
  formatDrivetrain,
  getBestValueInCategory,
  cn,
} from '@/lib/utils';
import Link from 'next/link';
import { X } from 'lucide-react';
import { CarImage } from './car-image';

interface CompareTableProps {
  cars: Car[];
  onRemoveCar?: (carId: string) => void;
}

type ComparisonMetric = {
  label: string;
  key: string;
  format?: (car: Car) => string;
  isBetter?: (a: number, b: number) => boolean; // true if first is better
};

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    label: 'Class',
    key: 'class',
    format: (car) => car.class,
  },
  {
    label: 'PI',
    key: 'rating_pi',
    format: (car) => formatNumber(car.rating_pi),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Speed',
    key: 'stats.speed',
    format: (car) => formatNumber(car.stats?.speed),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Handling',
    key: 'stats.handling',
    format: (car) => formatNumber(car.stats?.handling),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Acceleration',
    key: 'stats.acceleration',
    format: (car) => formatNumber(car.stats?.acceleration),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Launch',
    key: 'stats.launch',
    format: (car) => formatNumber(car.stats?.launch),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Braking',
    key: 'stats.braking_100_to_0_mph',
    format: (car) => formatNumber(car.stats?.braking_100_to_0_mph),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Offroad',
    key: 'stats.offroad',
    format: (car) => formatNumber(car.stats?.offroad),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Power',
    key: 'power_bhp',
    format: (car) => formatPower(car.power_bhp),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Torque (lb-ft)',
    key: 'torque_lb_ft',
    format: (car) => formatNumber(car.torque_lb_ft),
    isBetter: (a, b) => a > b,
  },
  {
    label: 'Weight',
    key: 'weight_lb',
    format: (car) => formatWeight(car.weight_lb),
    isBetter: (a, b) => a < b, // Lower is better
  },
  {
    label: 'Layout',
    key: 'layout',
    format: (car) => formatDrivetrain(car.layout),
  },
  {
    label: 'Price',
    key: 'price_cr',
    format: (car) => formatPrice(car.price_cr),
    isBetter: (a, b) => a < b, // Lower is better
  },
];

function getMetricValue(car: Car, metricKey: string): number | null {
  if (metricKey.startsWith('stats.')) {
    const statKey = metricKey.split('.')[1] as keyof Car['stats'];
    return car.stats[statKey];
  }

  const value = car[metricKey as keyof Car];
  if (typeof value === 'number') return value;
  return null;
}

export function CompareTable({ cars, onRemoveCar }: CompareTableProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏎️</div>
        <h3 className="text-xl font-semibold mb-2">No cars selected</h3>
        <p className="text-text-muted">Select 2-4 cars to compare them.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header with car images and names */}
        <thead>
          <tr className="border-b-2 border-border">
            <th className="p-4 text-left sticky left-0 bg-card z-10 w-32 flex-shrink-0">
              <span className="text-sm font-semibold text-foreground">Spec</span>
            </th>
            {cars.map((car) => (
              <th
                key={car.id}
                className="p-4 text-center border-l border-border bg-card-hover hover:bg-card transition-colors"
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Car Image */}
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-card border border-border flex-shrink-0">
                    <CarImage car={car} alt={car.name} width={200} height={150} />
                  </div>

                  {/* Car Info */}
                  <div className="min-w-0">
                    <Link
                      href={`/cars/${car.id}`}
                      className="text-sm font-bold text-accent hover:text-accent-secondary transition-colors truncate block"
                    >
                      {car.name}
                    </Link>
                    <p className="text-xs text-text-muted">{car.year}</p>
                  </div>

                  {/* Remove Button */}
                  {onRemoveCar && (
                    <button
                      onClick={() => onRemoveCar(car.id)}
                      className="text-text-muted hover:text-accent-secondary transition-colors"
                      aria-label={`Remove ${car.name}`}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Metrics */}
        <tbody>
          {COMPARISON_METRICS.map((metric) => {
            const values = cars.map((car) => getMetricValue(car, metric.key));
            const bestCar = metric.isBetter
              ? cars.reduce((best, car, index) => {
                  const carValue = values[index];
                  const bestValue = values[cars.indexOf(best)];
                  if (carValue === null || bestValue === null) return best;
                  return metric.isBetter!(carValue, bestValue) ? car : best;
                })
              : null;

            return (
              <tr
                key={metric.label}
                className="border-b border-border hover:bg-card-hover/50 transition-colors"
              >
                <td className="p-4 font-medium text-foreground sticky left-0 bg-card z-10 w-32 flex-shrink-0 text-sm">
                  {metric.label}
                </td>
                {cars.map((car, index) => {
                  const isBestInCategory = bestCar?.id === car.id;
                  const value = metric.format ? metric.format(car) : '';

                  return (
                    <td
                      key={`${car.id}-${metric.label}`}
                      className={cn(
                        'p-4 text-center text-sm border-l border-border',
                        isBestInCategory && 'bg-accent/10 border-l-2 border-accent'
                      )}
                    >
                      <span
                        className={cn(
                          'font-semibold',
                          isBestInCategory && 'text-accent'
                        )}
                      >
                        {value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
