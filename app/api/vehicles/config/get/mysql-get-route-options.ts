import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface MysqlGetRouteOptionsParams {
  search?: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  bodyType?: string;
}
export const mysqlGetRouteOptions = async (params: MysqlGetRouteOptionsParams) => {
  const { search, brand, model, year, price, bodyType } = params;

  const where: {
    OR?: Prisma.VehicleWhereInput[];
    brand?: string;
    modelName?: string;
    price?: string;
    year?: number;
    bodyType?: string;
  } = {};

  if (search) {
    where.OR = [
      { brand: { contains: search, mode: 'insensitive' } },
      { modelName: { contains: search, mode: 'insensitive' } },
      {
        manufacturer: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  if (brand) {
    where.brand = brand;
  }

  if (model) {
    where.modelName = model;
  }

  if (year) {
    where.year = year;
  }

  if (price) {
    where.price = price;
  }

  if (bodyType) {
    where.bodyType = bodyType;
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { manufacturer: true, history: true, specification: true },
    // select:{
    //   manufacturer:{
    //     where
    //   }
    // }
  });

  return vehicles;
};
