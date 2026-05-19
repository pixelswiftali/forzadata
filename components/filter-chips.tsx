'use client';

import { X } from 'lucide-react';
import { FilterState } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterChipsProps {
  filters: FilterState;
  onRemoveManufacturer: (manufacturer: string) => void;
  onRemoveCountry: (country: string) => void;
  onRemoveClass: (carClass: string) => void;
  onRemoveDivision: (division: string) => void;
  onRemoveUnlock: (unlock: string) => void;
  onRemoveLayout: (layout: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  filters,
  onRemoveManufacturer,
  onRemoveCountry,
  onRemoveClass,
  onRemoveDivision,
  onRemoveUnlock,
  onRemoveLayout,
  onClearAll,
}: FilterChipsProps) {
  const activeFilters = [
    ...filters.manufacturers.map((m) => ({ type: 'manufacturer', value: m })),
    ...filters.countries.map((c) => ({ type: 'country', value: c })),
    ...filters.classes.map((cl) => ({ type: 'class', value: cl })),
    ...filters.divisions.map((d) => ({ type: 'division', value: d })),
    ...filters.unlocks.map((u) => ({ type: 'unlock', value: u })),
    ...filters.layouts.map((l) => ({ type: 'layout', value: l })),
  ];

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemove = (type: string, value: string) => {
    switch (type) {
      case 'manufacturer':
        onRemoveManufacturer(value);
        break;
      case 'country':
        onRemoveCountry(value);
        break;
      case 'class':
        onRemoveClass(value);
        break;
      case 'division':
        onRemoveDivision(value);
        break;
      case 'unlock':
        onRemoveUnlock(value);
        break;
      case 'layout':
        onRemoveLayout(value);
        break;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {activeFilters.map((filter) => (
        <div
          key={`${filter.type}-${filter.value}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent-secondary/20 border border-accent-secondary/50 text-accent-secondary text-sm"
        >
          <span>{filter.value}</span>
          <button
            onClick={() => handleRemove(filter.type, filter.value)}
            className="hover:text-accent-secondary transition-colors"
            aria-label={`Remove ${filter.value} filter`}
          >
            <X size={16} />
          </button>
        </div>
      ))}

      {activeFilters.length > 0 && (
        <button
          onClick={onClearAll}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium',
            'bg-card hover:bg-card-hover border border-border',
            'text-text-muted hover:text-foreground',
            'transition-colors'
          )}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
