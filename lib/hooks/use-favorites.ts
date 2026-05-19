'use client';

import { useLocalStorage } from './use-local-storage';

const FAVORITES_KEY = 'forza-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(FAVORITES_KEY, []);

  const isFavorite = (carId: string): boolean => {
    return favorites.includes(carId);
  };

  const addFavorite = (carId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(carId)) {
        return [...prev, carId];
      }
      return prev;
    });
  };

  const removeFavorite = (carId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== carId));
  };

  const toggleFavorite = (carId: string) => {
    if (isFavorite(carId)) {
      removeFavorite(carId);
    } else {
      addFavorite(carId);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    count: favorites.length,
  };
}
