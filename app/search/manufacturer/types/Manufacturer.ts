export interface Manufacturer {
  id: string;
  name: string;
  assembleCountries: string[];
  headquarters: string;
  vehicles: ReducedVehicle[];
}

export interface ReducedVehicle {
  id: string;
  website: string;
  brand: string;
  modelName: string;
}
