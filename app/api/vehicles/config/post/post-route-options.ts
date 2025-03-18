import { History } from '@prisma/client';

export interface PostRouteOptionsParams {
  brand: string;
  modelName: string;
  year: string;
  price: string;
  seatingCapacity: string;
  bodyType: string;
  manufacturerId: string;
  specificationId: string;
  history: Omit<History, 'id'>;
}
