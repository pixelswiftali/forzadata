'use client';

import { useState, useCallback } from 'react';
import { FilterState, SortOption } from '../types';
import { generateFilterOptions } from '../cars-data';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  manufacturers: [],
  countries: [],
  years: [1900, 2024],
  classes: [],
  piRange: [0, 1000],
  divisions: [],
  unlocks: [],
  layouts: [],
  powerRange: [0, 1000],
  weightRange: [0, 5000],
  hasImage: null,
  hasFullStats: null,
  sortBy: 'name',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const filterOptions = generateFilterOptions();

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const toggleManufacturer = useCallback((manufacturer: string) => {
    setFilters((prev) => ({
      ...prev,
      manufacturers: prev.manufacturers.includes(manufacturer)
        ? prev.manufacturers.filter((m) => m !== manufacturer)
        : [...prev.manufacturers, manufacturer],
    }));
  }, []);

  const toggleCountry = useCallback((country: string) => {
    setFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter((c) => c !== country)
        : [...prev.countries, country],
    }));
  }, []);

  const setYears = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, years: range }));
  }, []);

  const toggleClass = useCallback((carClass: string) => {
    setFilters((prev) => ({
      ...prev,
      classes: prev.classes.includes(carClass)
        ? prev.classes.filter((c) => c !== carClass)
        : [...prev.classes, carClass],
    }));
  }, []);

  const setPiRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, piRange: range }));
  }, []);

  const toggleDivision = useCallback((division: string) => {
    setFilters((prev) => ({
      ...prev,
      divisions: prev.divisions.includes(division)
        ? prev.divisions.filter((d) => d !== division)
        : [...prev.divisions, division],
    }));
  }, []);

  const toggleUnlock = useCallback((unlock: string) => {
    setFilters((prev) => ({
      ...prev,
      unlocks: prev.unlocks.includes(unlock)
        ? prev.unlocks.filter((u) => u !== unlock)
        : [...prev.unlocks, unlock],
    }));
  }, []);

  const toggleLayout = useCallback((layout: string) => {
    setFilters((prev) => ({
      ...prev,
      layouts: prev.layouts.includes(layout)
        ? prev.layouts.filter((l) => l !== layout)
        : [...prev.layouts, layout],
    }));
  }, []);

  const setPowerRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, powerRange: range }));
  }, []);

  const setWeightRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, weightRange: range }));
  }, []);

  const setHasImage = useCallback((value: boolean | null) => {
    setFilters((prev) => ({ ...prev, hasImage: value }));
  }, []);

  const setHasFullStats = useCallback((value: boolean | null) => {
    setFilters((prev) => ({ ...prev, hasFullStats: value }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const isFiltered = useCallback(() => {
    return (
      filters.searchQuery !== '' ||
      filters.manufacturers.length > 0 ||
      filters.countries.length > 0 ||
      filters.years[0] !== DEFAULT_FILTERS.years[0] ||
      filters.years[1] !== DEFAULT_FILTERS.years[1] ||
      filters.classes.length > 0 ||
      filters.piRange[0] !== DEFAULT_FILTERS.piRange[0] ||
      filters.piRange[1] !== DEFAULT_FILTERS.piRange[1] ||
      filters.divisions.length > 0 ||
      filters.unlocks.length > 0 ||
      filters.layouts.length > 0 ||
      filters.powerRange[0] !== DEFAULT_FILTERS.powerRange[0] ||
      filters.powerRange[1] !== DEFAULT_FILTERS.powerRange[1] ||
      filters.weightRange[0] !== DEFAULT_FILTERS.weightRange[0] ||
      filters.weightRange[1] !== DEFAULT_FILTERS.weightRange[1] ||
      filters.hasImage !== null ||
      filters.hasFullStats !== null
    );
  }, [filters]);

  return {
    filters,
    filterOptions,
    setSearchQuery,
    toggleManufacturer,
    toggleCountry,
    setYears,
    toggleClass,
    setPiRange,
    toggleDivision,
    toggleUnlock,
    toggleLayout,
    setPowerRange,
    setWeightRange,
    setHasImage,
    setHasFullStats,
    setSortBy,
    clearAllFilters,
    isFiltered,
  };
}
