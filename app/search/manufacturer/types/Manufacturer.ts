import { ReducedVehicle } from '../../vehicles/types/ReducedVehicle';

export interface Manufacturer {
  id: string;
  name: string;
  assembleCountries: string[];
  headquarters: string;
  website: string;
  vehicles: ReducedVehicle[];
}
