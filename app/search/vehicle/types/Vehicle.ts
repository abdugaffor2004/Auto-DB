import { History, Manufacturer, Specification } from '@prisma/client';

export interface Vehicle {
  id: string;
  brand: string;
  modelName: string;
  year: number;
  bodyType: string;
  seatingCapacity: number;
  price: string;
  history: History;
  manufacturer: Manufacturer;
  specification: Specification;
}
