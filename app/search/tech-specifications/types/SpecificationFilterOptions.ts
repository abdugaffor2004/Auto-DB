export interface SpecificationFilterOptions {
  engineVolumes: string[];
  horsepowers: string[];
  fuelTypes: string[];
  engineTypes: string[];
  prices: string[];
}

export interface SpecificationFetchFilterOptionsParams {
  engineVolume?: string | null;
  horsepower?: string | null;
  fuelType?: string | null;
  engineType?: string | null;
  price?: string | null;
}
