'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllCars } from '@/lib/cars-data';
import { filterCars, sortCars } from '@/lib/utils';
import { useFilters } from '@/lib/hooks/use-filters';
import { useCompare } from '@/lib/hooks/use-compare';
import { CarGrid } from '@/components/car-grid';
import { SearchBar } from '@/components/search-bar';
import { SortDropdown } from '@/components/sort-dropdown';
import { FilterSidebar } from '@/components/filter-sidebar';
import { FilterChips } from '@/components/filter-chips';
import { Filter, BarChart3, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CarsPage() {
  const allCars = getAllCars();
  const filters = useFilters();
  const compare = useCompare();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let cars = filterCars(allCars, filters.filters);
    cars = sortCars(cars, filters.filters.sortBy);
    return cars;
  }, [filters.filters]);

  const handleOpenCompare = () => {
    if (compare.count > 0) {
      window.location.href = '/cars/compare';
    }
  };

  return (
    <main className="w-full">
      {/* Header with navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-foreground">Car Database</h1>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-text-muted hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-foreground font-medium">Cars</span>
            </div>
          </div>

          {/* Search and Sort Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-4">
            <SearchBar
              onSearch={filters.setSearchQuery}
              placeholder="Search by car name or manufacturer..."
            />
            <SortDropdown
              value={filters.filters.sortBy}
              onChange={filters.setSortBy}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={cn(
                  'sm:hidden flex-1 px-4 py-2.5 rounded-lg border transition-all duration-200',
                  'flex items-center justify-center gap-2 font-medium',
                  showMobileFilters
                    ? 'bg-accent text-background border-accent'
                    : 'bg-card border-border hover:border-accent'
                )}
              >
                <Filter size={18} />
                Filters
              </button>
              {compare.count > 0 && (
                <button
                  onClick={handleOpenCompare}
                  className={cn(
                    'px-4 py-2.5 rounded-lg bg-accent-secondary text-white font-medium',
                    'flex items-center justify-center gap-2 transition-all hover:scale-105'
                  )}
                >
                  <BarChart3 size={18} />
                  Compare ({compare.count})
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          {filters.isFiltered() && (
            <FilterChips
              filters={filters.filters}
              onRemoveManufacturer={filters.toggleManufacturer}
              onRemoveCountry={filters.toggleCountry}
              onRemoveClass={filters.toggleClass}
              onRemoveDivision={filters.toggleDivision}
              onRemoveUnlock={filters.toggleUnlock}
              onRemoveLayout={filters.toggleLayout}
              onClearAll={filters.clearAllFilters}
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters.filters}
                filterOptions={filters.filterOptions}
                onToggleManufacturer={filters.toggleManufacturer}
                onToggleCountry={filters.toggleCountry}
                onSetYears={filters.setYears}
                onToggleClass={filters.toggleClass}
                onSetPiRange={filters.setPiRange}
                onToggleDivision={filters.toggleDivision}
                onToggleUnlock={filters.toggleUnlock}
                onToggleLayout={filters.toggleLayout}
                onSetPowerRange={filters.setPowerRange}
                onSetWeightRange={filters.setWeightRange}
                onSetHasImage={filters.setHasImage}
                onSetHasFullStats={filters.setHasFullStats}
                onClearAll={filters.clearAllFilters}
              />
            </div>

            {/* Sidebar - Mobile */}
            {showMobileFilters && (
              <div className="lg:hidden col-span-1 fixed inset-0 z-50 bg-black/50">
                <div className="bg-background h-screen overflow-y-auto sm:max-w-sm w-full">
                  <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                    <h2 className="font-bold text-foreground">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="hover:text-accent transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters.filters}
                    filterOptions={filters.filterOptions}
                    onToggleManufacturer={filters.toggleManufacturer}
                    onToggleCountry={filters.toggleCountry}
                    onSetYears={filters.setYears}
                    onToggleClass={filters.toggleClass}
                    onSetPiRange={filters.setPiRange}
                    onToggleDivision={filters.toggleDivision}
                    onToggleUnlock={filters.toggleUnlock}
                    onToggleLayout={filters.toggleLayout}
                    onSetPowerRange={filters.setPowerRange}
                    onSetWeightRange={filters.setWeightRange}
                    onSetHasImage={filters.setHasImage}
                    onSetHasFullStats={filters.setHasFullStats}
                    onClearAll={filters.clearAllFilters}
                  />
                </div>
              </div>
            )}

            {/* Cars Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-text-muted text-sm">
                  Showing <span className="text-accent font-semibold">{filteredCars.length}</span> cars
                </p>
              </div>
              <CarGrid
                cars={filteredCars}
                emptyMessage={
                  filters.isFiltered()
                    ? 'No cars found matching your filters. Try adjusting your search criteria.'
                    : 'No cars found. This is unexpected!'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
