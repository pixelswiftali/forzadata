import Link from 'next/link';
import { getAllCars, getCarStats } from '@/lib/cars-data';
import { sortCars, classComparator, cn } from '@/lib/utils';
import { CarCard } from '@/components/car-card';
import { ArrowRight, Zap } from 'lucide-react';

export const metadata = {
  title: 'Forza Horizon 6 - Car Database',
  description: 'Premium interactive car database for Forza Horizon 6 with advanced filtering, comparison, and performance visualization.',
};

export default function HomePage() {
  const allCars = getAllCars();
  const stats = getCarStats();

  // Get featured cars
  const topPICars = sortCars([...allCars], 'pi').slice(0, 3);
  const fastestCars = sortCars([...allCars], 'speed').slice(0, 3);
  const mostPowerfulCars = sortCars([...allCars], 'power').slice(0, 3);
  const randomCar = allCars[Math.floor(Math.random() * allCars.length)];

  // Get class showcase
  const classes = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
  const classCars = classes.map((carClass) => {
    const carsInClass = allCars.filter((car) => car.class === carClass);
    return { class: carClass, count: carsInClass.length };
  });

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/50 mb-4">
              <span className="text-accent text-sm font-semibold flex items-center gap-2">
                <Zap size={16} />
                Forza Horizon 6 Car Database
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
              Explore & Compare
              <br />
              <span className="gradient-text">Every Car</span>
            </h1>

            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              The ultimate interactive car database for Forza Horizon 6. Filter, compare, and discover the perfect car for your racing style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/cars"
                className={cn(
                  'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
                  'bg-accent text-background hover:bg-accent-secondary',
                  'flex items-center justify-center gap-2'
                )}
              >
                Explore All Cars <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('stats');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
                  'bg-card border border-border hover:border-accent',
                  'flex items-center justify-center'
                )}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Cars', value: stats.totalCars },
              { label: 'Manufacturers', value: stats.totalManufacturers },
              { label: 'Cars with Images', value: stats.carsWithImages },
              { label: 'Full FH6 Stats', value: stats.carsWithFullStats },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-card border border-border hover:border-accent transition-colors"
              >
                <p className="text-text-muted text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-accent">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Class</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {classCars.map(({ class: carClass, count }) => (
              <Link
                key={carClass}
                href={`/cars?class=${carClass}`}
                className={cn(
                  'p-4 rounded-lg border border-border',
                  'hover:border-accent hover:bg-card-hover transition-all duration-200',
                  'text-center cursor-pointer'
                )}
              >
                <p className="text-2xl font-bold text-accent mb-1">{carClass}</p>
                <p className="text-sm text-text-muted">{count} cars</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Find Your Car?</h2>
          <p className="text-lg text-text-muted">
            Use our advanced filters and comparison tools to find the perfect car for your racing style.
          </p>
          <Link
            href="/cars"
            className={cn(
              'inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200',
              'bg-accent text-background hover:bg-accent-secondary',
              'flex items-center justify-center gap-2'
            )}
          >
            Explore All Cars <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
