export interface VehicleFilterOptions {
  brands: string[];
  models: string[];
  prices: string[];
  years: string[];
}

export interface VehiclesFetchFilterOptionsParams {
  brand?: string | null;
  model?: string | null;
  price?: string | null;
  year?: string | null;
}
