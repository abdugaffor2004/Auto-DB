import { ReducedVehicle } from '../../vehicle/types/ReducedVehicle';

export interface Specification {
  id: string;
  engineVolume: number;
  horsepower: number;
  fuelType: string;
  engineType: string;
  driveType: string;
  transmission: string;
  weight: number;

  vehicles: ReducedVehicle[];
}
