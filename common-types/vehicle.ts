import { Manufacturer } from '@prisma/client';
import { Specification } from './specification';
import { History } from './history';
import { Safety } from './safety';

export interface Vehicle {
  id: string;
  brand: string;
  modelName: string;
  year: number;
  bodyType: string;
  price: number;
  manufacturer: Manufacturer;
  specification: Specification;
  history: History;
  safety: Safety;
}
