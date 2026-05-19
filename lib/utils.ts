import { Car, FilterState, SortOption } from './types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterCars(cars: Car[], filters: FilterState): Car[] {
  return cars.filter((car) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        car.name.toLowerCase().includes(query) ||
        car.manufacturer.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Manufacturer filter
    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(car.manufacturer)) {
      return false;
    }

    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(car.country)) {
      return false;
    }

    // Year filter
    if (car.year < filters.years[0] || car.year > filters.years[1]) {
      return false;
    }

    // Class filter
    if (filters.classes.length > 0 && !filters.classes.includes(car.class)) {
      return false;
    }

    // PI Range filter
    if (car.rating_pi !== null) {
      if (car.rating_pi < filters.piRange[0] || car.rating_pi > filters.piRange[1]) {
        return false;
      }
    }

    // Division filter
    if (filters.divisions.length > 0 && !filters.divisions.includes(car.division)) {
      return false;
    }

    // Unlock filter
    if (filters.unlocks.length > 0 && !filters.unlocks.includes(car.unlock)) {
      return false;
    }

    // Layout filter
    if (filters.layouts.length > 0 && !filters.layouts.includes(car.layout)) {
      return false;
    }

    // Power Range filter
    if (car.power_bhp !== null) {
      if (
        car.power_bhp < filters.powerRange[0] ||
        car.power_bhp > filters.powerRange[1]
      ) {
        return false;
      }
    }

    // Weight Range filter
    if (car.weight_lb !== null) {
      if (
        car.weight_lb < filters.weightRange[0] ||
        car.weight_lb > filters.weightRange[1]
      ) {
        return false;
      }
    }

    // Has Image filter
    if (filters.hasImage === true && !car.image?.local_path) {
      return false;
    }
    if (filters.hasImage === false && car.image?.local_path) {
      return false;
    }

    // Has Full Stats filter
    if (filters.hasFullStats === true) {
      const hasAllStats =
        car.stats?.acceleration !== null &&
        car.stats?.speed !== null &&
        car.stats?.handling !== null &&
        car.stats?.braking_100_to_0_mph !== null;
      if (!hasAllStats) return false;
    }
    if (filters.hasFullStats === false) {
      const hasAllStats =
        car.stats?.acceleration !== null &&
        car.stats?.speed !== null &&
        car.stats?.handling !== null &&
        car.stats?.braking_100_to_0_mph !== null;
      if (hasAllStats) return false;
    }

    return true;
  });
}

export function sortCars(cars: Car[], sortBy: SortOption): Car[] {
  const sorted = [...cars];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'year':
      return sorted.sort((a, b) => b.year - a.year);

    case 'pi':
      return sorted.sort((a, b) => (b.rating_pi || 0) - (a.rating_pi || 0));

    case 'speed':
      return sorted.sort((a, b) => (b.stats?.speed || 0) - (a.stats?.speed || 0));

    case 'handling':
      return sorted.sort((a, b) => (b.stats?.handling || 0) - (a.stats?.handling || 0));

    case 'acceleration':
      return sorted.sort((a, b) => (b.stats?.acceleration || 0) - (a.stats?.acceleration || 0));

    case 'power':
      return sorted.sort((a, b) => (b.power_bhp || 0) - (a.power_bhp || 0));

    case 'weight':
      return sorted.sort((a, b) => (a.weight_lb || 0) - (b.weight_lb || 0));

    case 'price':
      return sorted.sort((a, b) => (b.price_cr || 0) - (a.price_cr || 0));

    default:
      return sorted;
  }
}

export function getBestValueInCategory(
  cars: Car[],
  category: keyof Car | `stats.${keyof Car['stats']}`
): Car | null {
  if (cars.length === 0) return null;

  let bestCar = cars[0];

  if (category === 'price_cr' || category === 'weight_lb') {
    // Lower is better
    for (const car of cars) {
      const carValue = category === 'stats.acceleration'
        ? car.stats.acceleration
        : car[category as keyof Car];
      const bestValue = category === 'stats.acceleration'
        ? bestCar.stats.acceleration
        : bestCar[category as keyof Car];

      if (
        carValue !== null &&
        carValue !== undefined &&
        (bestValue === null || bestValue === undefined || carValue < (bestValue as number))
      ) {
        bestCar = car;
      }
    }
  } else {
    // Higher is better
    for (const car of cars) {
      const carValue = category.startsWith('stats.')
        ? car.stats[category.split('.')[1] as keyof Car['stats']]
        : car[category as keyof Car];
      const bestValue = category.startsWith('stats.')
        ? bestCar.stats[category.split('.')[1] as keyof Car['stats']]
        : bestCar[category as keyof Car];

      if (
        carValue !== null &&
        carValue !== undefined &&
        (bestValue === null || bestValue === undefined || carValue > (bestValue as number))
      ) {
        bestCar = car;
      }
    }
  }

  return bestCar;
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  return value.toFixed(2);
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return 'N/A';
  return `${Math.round(price).toLocaleString()} CR`;
}

export function formatPower(power: number | null | undefined): string {
  if (power === null || power === undefined) return 'N/A';
  return `${Math.round(power)} hp`;
}

export function formatWeight(weight: number | null | undefined): string {
  if (weight === null || weight === undefined) return 'N/A';
  return `${Math.round(weight)} lb`;
}

export function formatDrivetrain(layout: string): string {
  const drivetrainMap: Record<string, string> = {
    'FWD': 'Front-wheel drive',
    'RWD': 'Rear-wheel drive',
    'AWD': 'All-wheel drive',
    'MR': 'Mid-engine RWD',
  };
  return drivetrainMap[layout] || layout;
}

export function classComparator(classStr: string): number {
  const order: Record<string, number> = {
    'D': 1,
    'C': 2,
    'B': 3,
    'A': 4,
    'S1': 5,
    'S2': 6,
    'X': 7,
  };
  return order[classStr] || 0;
}

export function normalizeStatValue(value: number | null | undefined, max: number): number {
  if (value === null || value === undefined) return 0;
  return Math.min((value / max) * 100, 100);
}
