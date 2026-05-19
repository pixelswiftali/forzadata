'use client';

import { formatNumber, normalizeStatValue } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatsBarItem {
  label: string;
  value: number | null | undefined;
  maxValue: number;
  color?: string;
}

interface StatsBarsProps {
  stats: StatsBarItem[];
  variant?: 'compact' | 'detailed';
  animated?: boolean;
}

export function StatsBars({ stats, variant = 'compact', animated = true }: StatsBarsProps) {
  return (
    <div className="space-y-3">
      {stats.map((stat, index) => {
        const normalized = normalizeStatValue(stat.value, stat.maxValue);
        const displayValue = formatNumber(stat.value);

        return (
          <div key={`${stat.label}-${index}`} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={cn(
                'text-sm font-medium',
                variant === 'compact' ? 'text-text-muted' : 'text-foreground'
              )}>
                {stat.label}
              </span>
              <span className="text-xs text-accent font-semibold">
                {displayValue}
              </span>
            </div>
            <div className="w-full bg-card-hover rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  stat.color || 'bg-accent',
                  animated && 'animate-stat-fill'
                )}
                style={{
                  width: `${normalized}%`,
                  ...(animated && {
                    '--stat-width': `${normalized}%`,
                  } as React.CSSProperties),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
