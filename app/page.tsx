import Link from 'next/link';
import { getAllCars, getCarStats } from '@/lib/cars-data';
import { sortCars, classComparator, cn } from '@/lib/utils';
import { HomeFeaturedCars } from '@/components/home-featured-cars';
import { ThreeDHero } from '@/components/three-d-hero';

export const metadata = {
  title: 'Forza Horizon 6 - Car Database',
  description: 'Premium interactive car database for Forza Horizon 6 with advanced filtering, comparison, and performance visualization.',
};

export default async function HomePage() {
  const allCars = await getAllCars();
  const stats = await getCarStats();

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
      {/* 3D Hero Section */}
      <ThreeDHero />

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
      <HomeFeaturedCars
        topPICars={topPICars}
        fastestCars={fastestCars}
        mostPowerfulCars={mostPowerfulCars}
        randomCar={randomCar}
      />

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
              'bg-accent text-background hover:bg-accent-secondary hover:shadow-lg',
            )}
          >
            Explore All Cars
          </Link>
        </div>
      </section>
    </main>
  );
}
