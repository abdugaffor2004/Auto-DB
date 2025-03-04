export interface ManufacturerFilterOptions {
  names: string[];
  assembleCountries: string[];
  headquarters: string[];
  models: string[];
}

export interface ManufacturerFetchFilterOptionsParams {
  name?: string | null;
  assembleCoutries?: string[] | [];
  headquarters?: string | null;
  model?: string | null;
}
