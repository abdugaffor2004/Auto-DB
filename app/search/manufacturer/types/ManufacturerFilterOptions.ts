export interface ManufacturerFilterOptions {
  names: NameType[];
  assembleCountries: string[];
  headquarters: string[];
  models: string[];
}

export interface ManufacturerFetchFilterOptionsParams {
  name?: string | null;
  assembleCountries?: string[] | [];
  headquarters?: string | null;
  model?: string | null;
}

export interface NameType {
  value: string;
  label: string;
}
