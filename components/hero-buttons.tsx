'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroButtons() {
  return (
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
  );
}
