import { CarsData, Car, FilterOptions } from './types';

let carsCache: Car[] | null = null;
let carsPromise: Promise<Car[]> | null = null;

async function fetchCars(): Promise<Car[]> {
  try {
    const response = await fetch('/cars.json');
    if (!response.ok) throw new Error('Failed to fetch cars.json');
    const data = (await response.json()) as CarsData;
    return data.cars || [];
  } catch (error) {
    console.error('Error loading cars.json:', error);
    return [];
  }
}

export async function loadCars(): Promise<Car[]> {
  if (carsCache) {
    return carsCache;
  }

  if (!carsPromise) {
    carsPromise = fetchCars().then((cars) => {
      carsCache = cars;
      return cars;
    });
  }

  return carsPromise;
}

export async function getCarById(id: string): Promise<Car | null> {
  const cars = await loadCars();
  return cars.find((car) => car.id === id) || null;
}

export async function getCarsById(ids: string[]): Promise<Car[]> {
  const cars = await loadCars();
  return ids
    .map((id) => cars.find((car) => car.id === id))
    .filter((car): car is Car => Boolean(car));
}

export async function getAllCars(): Promise<Car[]> {
  return loadCars();
}

export async function generateFilterOptions(): Promise<FilterOptions> {
  const cars = await loadCars();

  const manufacturers = Array.from(new Set(cars.map((c) => c.manufacturer))).sort();
  const countries = Array.from(new Set(cars.map((c) => c.country))).filter(Boolean).sort();
  const types = Array.from(new Set(cars.map((c) => c.type))).filter(Boolean).sort();
  const classes = Array.from(new Set(cars.map((c) => c.class))).sort();
  const divisions = Array.from(new Set(cars.map((c) => c.division))).sort();
  const tiers = Array.from(new Set(cars.map((c) => c.tier))).sort();
  const unlocks = Array.from(new Set(cars.map((c) => c.unlock))).filter(Boolean).sort();
  const layouts = Array.from(new Set(cars.map((c) => c.layout))).filter(Boolean).sort();

  const piValues = cars
    .map((c) => c.rating_pi)
    .filter((pi): pi is number => pi !== null && pi !== undefined);
  const piMin = piValues.length > 0 ? Math.min(...piValues) : 0;
  const piMax = piValues.length > 0 ? Math.max(...piValues) : 1000;

  const powerValues = cars
    .map((c) => c.power_bhp)
    .filter((p): p is number => p !== null && p !== undefined);
  const powerMin = powerValues.length > 0 ? Math.min(...powerValues) : 0;
  const powerMax = powerValues.length > 0 ? Math.max(...powerValues) : 1000;

  const weightValues = cars
    .map((c) => c.weight_lb)
    .filter((w): w is number => w !== null && w !== undefined);
  const weightMin = weightValues.length > 0 ? Math.min(...weightValues) : 0;
  const weightMax = weightValues.length > 0 ? Math.max(...weightValues) : 5000;

  const years = cars
    .map((c) => c.year)
    .filter((y): y is number => y !== null && y !== undefined);
  const yearMin = years.length > 0 ? Math.min(...years) : 1900;
  const yearMax = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

  return {
    manufacturers,
    countries,
    types,
    classes,
    divisions,
    tiers,
    unlocks,
    layouts,
    years: { min: yearMin, max: yearMax },
    pi: { min: piMin, max: piMax },
    power: { min: powerMin, max: powerMax },
    weight: { min: weightMin, max: weightMax },
  };
}

export async function getCarStats() {
  const cars = await loadCars();

  return {
    totalCars: cars.length,
    totalManufacturers: new Set(cars.map((c) => c.manufacturer)).size,
    carsWithImages: cars.filter((c) => c.image?.local_path).length,
    carsWithFullStats: cars.filter(
      (c) =>
        c.stats?.acceleration !== null &&
        c.stats?.speed !== null &&
        c.stats?.handling !== null &&
        c.stats?.acceleration !== null
    ).length,
    carsWithPrice: cars.filter((c) => c.price_cr !== null).length,
  };
}
