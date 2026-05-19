import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="text-8xl">🏎️</div>
        <h1 className="text-5xl font-bold text-foreground">404</h1>
        <p className="text-2xl text-text-muted">Car Not Found</p>
        <p className="text-lg text-text-muted max-w-md mx-auto">
          The car you are looking for doesn't exist or has been removed from the database.
        </p>
        <Link
          href="/cars"
          className={cn(
            'inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200',
            'bg-accent text-background hover:bg-accent-secondary',
            'mt-6'
          )}
        >
          Browse All Cars
        </Link>
      </div>
    </main>
  );
}
