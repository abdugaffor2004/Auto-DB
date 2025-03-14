import { NameType } from '../../manufacturer/types/ManufacturerFilterOptions';

export interface SpecificationFilterOptions {
  engineVolumes: string[];
  horsepowers: string[];
  fuelTypes: string[];
  engineTypes: string[];
  transmissions: string[];
  prices: string[];
  names: NameType[];
}

export interface SpecificationFetchFilterOptionsParams {
  engineVolume?: string | null;
  horsepower?: string | null;
  fuelType?: string | null;
  engineType?: string | null;
  transmission?: string | null;
  price?: string | null;
}
