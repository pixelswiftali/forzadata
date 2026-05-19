'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState, FilterOptions } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: FilterState;
  filterOptions: FilterOptions;
  onToggleManufacturer: (manufacturer: string) => void;
  onToggleCountry: (country: string) => void;
  onSetYears: (range: [number, number]) => void;
  onToggleClass: (carClass: string) => void;
  onSetPiRange: (range: [number, number]) => void;
  onToggleDivision: (division: string) => void;
  onToggleUnlock: (unlock: string) => void;
  onToggleLayout: (layout: string) => void;
  onSetPowerRange: (range: [number, number]) => void;
  onSetWeightRange: (range: [number, number]) => void;
  onSetHasImage: (value: boolean | null) => void;
  onSetHasFullStats: (value: boolean | null) => void;
  onClearAll: () => void;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 flex items-center justify-between hover:bg-card-hover transition-colors"
      >
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-200',
            !isOpen && '-rotate-90'
          )}
        />
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-2">{children}</div>}
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
}

function Checkbox({ label, checked, onChange, count }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded accent-accent cursor-pointer"
      />
      <span className="text-sm text-foreground flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-text-muted">({count})</span>
      )}
    </label>
  );
}

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  step?: number;
}

function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
}: RangeSliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground block">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className={cn(
            'w-20 px-2 py-1 rounded text-sm',
            'bg-card border border-border text-foreground',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50'
          )}
        />
        <span className="flex items-center text-text-muted">-</span>
        <input
          type="number"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className={cn(
            'w-20 px-2 py-1 rounded text-sm',
            'bg-card border border-border text-foreground',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50'
          )}
        />
      </div>
    </div>
  );
}

export function FilterSidebar({
  filters,
  filterOptions,
  onToggleManufacturer,
  onToggleCountry,
  onSetYears,
  onToggleClass,
  onSetPiRange,
  onToggleDivision,
  onToggleUnlock,
  onToggleLayout,
  onSetPowerRange,
  onSetWeightRange,
  onSetHasImage,
  onSetHasFullStats,
  onClearAll,
}: FilterSidebarProps) {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden h-fit sticky top-4">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-bold text-foreground">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-xs text-accent hover:text-accent-secondary transition-colors font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-border max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Manufacturer */}
        <CollapsibleSection title={`Manufacturer (${filters.manufacturers.length})`}>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterOptions.manufacturers.map((manufacturer) => (
              <Checkbox
                key={manufacturer}
                label={manufacturer}
                checked={filters.manufacturers.includes(manufacturer)}
                onChange={() => onToggleManufacturer(manufacturer)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Country */}
        <CollapsibleSection title={`Country (${filters.countries.length})`}>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterOptions.countries.map((country) => (
              <Checkbox
                key={country}
                label={country}
                checked={filters.countries.includes(country)}
                onChange={() => onToggleCountry(country)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Year Range */}
        <CollapsibleSection title="Year">
          <RangeSlider
            label="Year Range"
            min={filterOptions.years.min}
            max={filterOptions.years.max}
            value={filters.years}
            onChange={onSetYears}
          />
        </CollapsibleSection>

        {/* Class */}
        <CollapsibleSection title={`Class (${filters.classes.length})`}>
          <div className="space-y-2">
            {filterOptions.classes.map((carClass) => (
              <Checkbox
                key={carClass}
                label={carClass}
                checked={filters.classes.includes(carClass)}
                onChange={() => onToggleClass(carClass)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* PI Range */}
        <CollapsibleSection title="PI Rating">
          <RangeSlider
            label="PI Range"
            min={filterOptions.pi.min}
            max={filterOptions.pi.max}
            value={filters.piRange}
            onChange={onSetPiRange}
            step={10}
          />
        </CollapsibleSection>

        {/* Power Range */}
        <CollapsibleSection title="Power">
          <RangeSlider
            label="Power (hp)"
            min={filterOptions.power.min}
            max={filterOptions.power.max}
            value={filters.powerRange}
            onChange={onSetPowerRange}
            step={10}
          />
        </CollapsibleSection>

        {/* Weight Range */}
        <CollapsibleSection title="Weight">
          <RangeSlider
            label="Weight (lb)"
            min={filterOptions.weight.min}
            max={filterOptions.weight.max}
            value={filters.weightRange}
            onChange={onSetWeightRange}
            step={100}
          />
        </CollapsibleSection>

        {/* Division */}
        <CollapsibleSection title={`Division (${filters.divisions.length})`} defaultOpen={false}>
          <div className="space-y-2">
            {filterOptions.divisions.map((division) => (
              <Checkbox
                key={division}
                label={division.toUpperCase()}
                checked={filters.divisions.includes(division)}
                onChange={() => onToggleDivision(division)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Unlock */}
        <CollapsibleSection title={`Unlock (${filters.unlocks.length})`} defaultOpen={false}>
          <div className="space-y-2">
            {filterOptions.unlocks.map((unlock) => (
              <Checkbox
                key={unlock}
                label={unlock}
                checked={filters.unlocks.includes(unlock)}
                onChange={() => onToggleUnlock(unlock)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Layout */}
        <CollapsibleSection title={`Layout (${filters.layouts.length})`} defaultOpen={false}>
          <div className="space-y-2">
            {filterOptions.layouts.map((layout) => (
              <Checkbox
                key={layout}
                label={layout}
                checked={filters.layouts.includes(layout)}
                onChange={() => onToggleLayout(layout)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Image and Stats */}
        <CollapsibleSection title="Data Completeness" defaultOpen={false}>
          <div className="space-y-2">
            <Checkbox
              label="Has image"
              checked={filters.hasImage === true}
              onChange={(checked) => onSetHasImage(checked ? true : null)}
            />
            <Checkbox
              label="Full stats available"
              checked={filters.hasFullStats === true}
              onChange={(checked) => onSetHasFullStats(checked ? true : null)}
            />
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
