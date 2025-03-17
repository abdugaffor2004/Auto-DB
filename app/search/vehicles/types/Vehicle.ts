import { History, Manufacturer, Safety, Specification } from '@prisma/client';

export interface Vehicle {
  id: string;
  brand: string;
  modelName: string;
  year: number;
  bodyType: string;
  seatingCapacity: number;
  price: string;
  history: History | null;
  manufacturer: Manufacturer | null;
  specification: Specification | null;
  safety: Safety | null;
}
