import { getAllCars } from '@/lib/cars-data';
import { CarsPageClient } from './cars-page-client';

export default async function CarsPageWrapper() {
  const allCars = await getAllCars();

  return <CarsPageClient initialCars={allCars} />;
}
