export interface AutoFilterOptions {
  brands: string[];
  models: string[];
  prices: string[];
  years: string[];
}

export interface FetchFilterOptionsParams {
  brand?: string;
  model?: string;
  price?: string;
  year?: string;
}
