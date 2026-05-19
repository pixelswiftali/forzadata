'use client';

import { useLocalStorage } from './use-local-storage';

const COMPARE_KEY = 'forza-compare';
const MAX_COMPARE = 4;

export function useCompare() {
  const [selectedCars, setSelectedCars] = useLocalStorage<string[]>(COMPARE_KEY, []);

  const isSelected = (carId: string): boolean => {
    return selectedCars.includes(carId);
  };

  const addToCompare = (carId: string) => {
    setSelectedCars((prev) => {
      if (!prev.includes(carId) && prev.length < MAX_COMPARE) {
        return [...prev, carId];
      }
      return prev;
    });
  };

  const removeFromCompare = (carId: string) => {
    setSelectedCars((prev) => prev.filter((id) => id !== carId));
  };

  const toggleCompare = (carId: string) => {
    if (isSelected(carId)) {
      removeFromCompare(carId);
    } else {
      addToCompare(carId);
    }
  };

  const clearCompare = () => {
    setSelectedCars([]);
  };

  const canAddMore = (): boolean => {
    return selectedCars.length < MAX_COMPARE;
  };

  return {
    selectedCars,
    isSelected,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    canAddMore,
    count: selectedCars.length,
    maxCompare: MAX_COMPARE,
  };
}
