import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetPostgresqlRouteOptionsParams {
  search: string;
  engineVolume: string;
  horsepower: string;
  fuelType: string;
  engineType: string;
  transmission: string;
  price: string;
}

export const getPostgresqlRouteOptions = async ({
  search,
  engineVolume,
  horsepower,
  fuelType,
  engineType,
  transmission,
  price,
}: GetPostgresqlRouteOptionsParams) => {
  const where: Prisma.SpecificationPWhereInput = {};

  if (search) {
    where.OR = [
      { engineVolume: { equals: parseInt(search) } },
      { horsepower: { equals: parseInt(search) } },
      { weight: { equals: parseInt(search) } },
    ];
  }

  if (engineVolume) {
    where.engineVolume = parseFloat(engineVolume);
  }

  if (horsepower) {
    where.horsepower = parseInt(horsepower);
  }

  if (horsepower) {
    where.horsepower = parseInt(horsepower);
  }

  if (fuelType) {
    where.fuelType = fuelType;
  }

  if (engineType) {
    where.engineType = engineType;
  }

  if (transmission) {
    where.transmission = transmission;
  }

  if (price) {
    where.vehicles = {
      some: {
        price: price,
      },
    };
  }

  const manufacturer = await prisma.specificationP.findMany({
    where,
    include: {
      vehicles: {
        select: {
          id: true,
          brand: true,
          modelName: true,
          price: true,
        },
      },
    },  
  });

  return manufacturer;
};
