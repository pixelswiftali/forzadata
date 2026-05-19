import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getCarById, getAllCars } from '@/lib/cars-data';
import {
  formatPrice,
  formatPower,
  formatWeight,
  formatDrivetrain,
  cn,
  sortCars,
} from '@/lib/utils';
import { CarImage } from '@/components/car-image';
import { StatsBars } from '@/components/stats-bars';
import { StatsChart } from '@/components/stats-chart';
import { FavoriteButton } from '@/components/favorite-button';
import { CompareButton } from '@/components/compare-button';
import { CarCard } from '@/components/car-card';
import { ArrowLeft } from 'lucide-react';

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) {
    return {
      title: 'Car Not Found',
      description: 'The car you are looking for could not be found.',
    };
  }

  return {
    title: `${car.name} - Forza Horizon 6 Car Database`,
    description: `${car.year} ${car.manufacturer} ${car.name}. PI: ${car.rating_pi || 'N/A'}, Power: ${car.power_bhp || 'N/A'} hp. Compare and explore specs on the Forza database.`,
    openGraph: {
      title: `${car.name} - ${car.year}`,
      description: `${car.manufacturer} ${car.name} - Class ${car.class}, PI ${car.rating_pi || 'N/A'}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const cars = getAllCars();
  return cars.map((car) => ({
    id: car.id,
  }));
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) {
    notFound();
  }

  const allCars = getAllCars();
  const carsInClass = allCars.filter((c) => c.class === car.class);
  const classAverage = {
    pi: carsInClass.reduce((sum, c) => sum + (c.rating_pi || 0), 0) / carsInClass.length,
    speed: carsInClass.reduce((sum, c) => sum + (c.stats?.speed || 0), 0) / carsInClass.length,
    power: carsInClass.reduce((sum, c) => sum + (c.power_bhp || 0), 0) / carsInClass.length,
  };

  const similarCars = sortCars(
    allCars.filter(
      (c) =>
        c.class === car.class &&
        c.id !== car.id &&
        (!car.rating_pi ||
          (c.rating_pi &&
            Math.abs(c.rating_pi - car.rating_pi) <= 50))
    ),
    'pi'
  ).slice(0, 3);

  const statBars = [
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
    {
      label: 'Launch',
      value: car.stats?.launch,
      maxValue: 10,
      color: 'bg-accent',
    },
    {
      label: 'Braking',
      value: car.stats?.braking_100_to_0_mph,
      maxValue: 10,
      color: 'bg-accent-secondary',
    },
    {
      label: 'Offroad',
      value: car.stats?.offroad,
      maxValue: 10,
      color: 'bg-accent',
    },
  ];

  return (
    <main className="w-full">
      {/* Breadcrumb */}
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

      {/* Header */}
      <div className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden border border-border h-96 bg-card-hover">
                <CarImage car={car} alt={car.name} width={500} height={500} priority />
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <p className="text-sm text-text-muted mb-2">
                  {car.manufacturer} • {car.year}
                </p>
                <h1 className="text-4xl font-bold text-foreground mb-3">{car.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 rounded-full bg-accent text-background text-xs font-semibold">
                    Class {car.class}
                  </div>
                  {car.rating_pi && (
                    <div className="px-3 py-1 rounded-full bg-accent-secondary text-white text-xs font-semibold">
                      PI {car.rating_pi}
                    </div>
                  )}
                  <div className="px-3 py-1 rounded-full bg-card-hover text-text-muted text-xs font-medium">
                    {car.layout}
                  </div>
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {car.power_bhp && (
                  <div className="p-3 rounded-lg bg-card-hover border border-border">
                    <p className="text-xs text-text-muted mb-1">Power</p>
                    <p className="font-bold text-accent">{formatPower(car.power_bhp)}</p>
                  </div>
                )}
                {car.torque_lb_ft && (
                  <div className="p-3 rounded-lg bg-card-hover border border-border">
                    <p className="text-xs text-text-muted mb-1">Torque</p>
                    <p className="font-bold text-accent">{car.torque_lb_ft} lb-ft</p>
                  </div>
                )}
                {car.weight_lb && (
                  <div className="p-3 rounded-lg bg-card-hover border border-border">
                    <p className="text-xs text-text-muted mb-1">Weight</p>
                    <p className="font-bold text-accent">{formatWeight(car.weight_lb)}</p>
                  </div>
                )}
                {car.price_cr && (
                  <div className="p-3 rounded-lg bg-card-hover border border-border">
                    <p className="text-xs text-text-muted mb-1">Price</p>
                    <p className="font-bold text-accent">{formatPrice(car.price_cr)}</p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <FavoriteButton carId={car.id} variant="button" />
                <CompareButton carId={car.id} variant="button" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Performance Stats */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Performance Stats</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <StatsBars stats={statBars} variant="detailed" animated />
              </div>
              <div>
                <StatsChart car={car} />
              </div>
            </div>
          </section>

          {/* Specifications */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <table className="w-full">
                <tbody>
                  {[
                    { label: 'Name', value: car.name },
                    { label: 'Manufacturer', value: car.manufacturer },
                    { label: 'Year', value: car.year },
                    { label: 'Country', value: car.country },
                    { label: 'Type', value: car.type },
                    { label: 'Class', value: car.class },
                    { label: 'PI Rating', value: car.rating_pi || 'N/A' },
                    { label: 'Power', value: formatPower(car.power_bhp) },
                    { label: 'Torque', value: `${car.torque_lb_ft || 'N/A'} lb-ft` },
                    { label: 'Weight', value: formatWeight(car.weight_lb) },
                    { label: 'Layout', value: formatDrivetrain(car.layout) },
                    { label: 'Price', value: formatPrice(car.price_cr) },
                    { label: 'Division', value: car.division },
                    { label: 'Tier', value: car.tier },
                    { label: 'Unlock', value: car.unlock },
                  ].map((spec, i) => (
                    <tr
                      key={i}
                      className={cn(
                        'border-b border-border',
                        i % 2 === 0 ? 'bg-background' : 'bg-card-hover'
                      )}
                    >
                      <td className="px-6 py-3 font-medium text-foreground">{spec.label}</td>
                      <td className="px-6 py-3 text-text-muted">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Class Comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {car.class} Class Average Comparison
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg bg-card border border-border">
                <p className="text-sm text-text-muted mb-2">PI Rating</p>
                <p className="text-2xl font-bold text-accent mb-2">{car.rating_pi || 'N/A'}</p>
                <p className="text-xs text-text-muted">
                  Class avg: {Math.round(classAverage.pi)}
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <p className="text-sm text-text-muted mb-2">Speed</p>
                <p className="text-2xl font-bold text-accent mb-2">
                  {car.stats?.speed || 'N/A'}
                </p>
                <p className="text-xs text-text-muted">
                  Class avg: {Math.round(classAverage.speed)}
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <p className="text-sm text-text-muted mb-2">Power</p>
                <p className="text-2xl font-bold text-accent mb-2">
                  {car.power_bhp || 'N/A'}
                </p>
                <p className="text-xs text-text-muted">
                  Class avg: {Math.round(classAverage.power)}
                </p>
              </div>
            </div>
          </section>

          {/* Similar Cars */}
          {similarCars.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Similar {car.class} Class Cars
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarCars.map((similar) => (
                  <CarCard key={similar.id} car={similar} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
