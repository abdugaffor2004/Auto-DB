export interface AutoFilterOptions {
  brands: string[];
  models: string[];
  price: string[];
  year: string[];
}

export interface FetchFilterOptionsParams {
  brand?: string;
  model?: string;
  price?: string;
  year?: string;
}
