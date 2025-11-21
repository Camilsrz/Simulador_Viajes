import type { Option } from "../types/travel";

export const isEnabledForCity = (option: Option, city: string): boolean => {
  return option.availableCities?.includes(city) || option.availableCities?.includes("Todas") || false;
};