// Car Statistics Interface
export interface CarStats {
  acceleration: number | null;
  braking_100_to_0_mph: number | null;
  launch: number | null;
  offroad: number | null;
  handling: number | null;
  speed: number | null;
  lateral_g_60_mph: number | null;
  lateral_g_100_mph: number | null;
  lateral_g_120_mph: number | null;
}

// Car Image Interface
export interface CarImage {
  wiki_filename: string;
  local_path: string;
  source_url: string;
  license: string | null;
  attribution: string | null;
  width: number;
  height: number;
}

// Car Sources Interface
export interface CarSources {
  wiki_page: string;
  car_list: string;
  local_game_install: string;
}

// Main Car Interface
export interface Car {
  id: string;
  name: string;
  year: number;
  manufacturer: string;
  country: string;
  type: string;
  class: string;
  rating_pi: number | null;
  power_bhp: number | null;
  torque_lb_ft: number | null;
  weight_lb: number | null;
  layout: string;
  stats: CarStats;
  price_cr: number | null;
  division: string;
  tier: string;
  unlock: string;
  wheelspin: string | null;
  image: CarImage;
  sources: CarSources;
}

// Root Data Structure
export interface CarsData {
  cars: Car[];
}

// Filter Options Type
export interface FilterOptions {
  manufacturers: string[];
  countries: string[];
  types: string[];
  classes: string[];
  divisions: string[];
  tiers: string[];
  unlocks: string[];
  layouts: string[];
  years: { min: number; max: number };
  pi: { min: number; max: number };
  power: { min: number; max: number };
  weight: { min: number; max: number };
}

// Filter State Type
export interface FilterState {
  searchQuery: string;
  manufacturers: string[];
  countries: string[];
  years: [number, number];
  classes: string[];
  piRange: [number, number];
  divisions: string[];
  unlocks: string[];
  layouts: string[];
  powerRange: [number, number];
  weightRange: [number, number];
  hasImage: boolean | null;
  hasFullStats: boolean | null;
  sortBy: SortOption;
}

// Sort Options
export type SortOption =
  | 'name'
  | 'year'
  | 'pi'
  | 'speed'
  | 'handling'
  | 'acceleration'
  | 'power'
  | 'weight'
  | 'price';

// Compare State Type
export interface CompareState {
  selectedCars: string[]; // Array of car IDs
}

// Favorites State Type
export interface FavoritesState {
  favoriteCarIds: string[];
}
