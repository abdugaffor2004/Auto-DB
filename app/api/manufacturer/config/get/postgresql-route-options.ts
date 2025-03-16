import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetPostgresqlRouteOptionsProps {
  search: string;
  name: string;
  assembleCountries: string[];
  headquarters: string;
  model: string;
}

export const getPostgresqlRouteOptions = async ({
  search,
  name,
  assembleCountries,
  headquarters,
  model,
}: GetPostgresqlRouteOptionsProps) => {
  const where: Prisma.ManufacturerPWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { headquarters: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (name) {
    where.name = name;
  }

  if (assembleCountries.length > 0) {
    where.assembleCountries = {
      hasSome: assembleCountries,
    };
  }

  if (headquarters) {
    where.headquarters = headquarters;
  }

  if (model) {
    where.vehicles = {
      some: {
        modelName: {
          contains: model,
          mode: 'insensitive',
        },
      },
    };
  }

  const manufacturer = await prisma.manufacturerP.findMany({
    where,
    select: {
      id: true,
      name: true,
      assembleCountries: true,
      headquarters: true,
      website: true,
      vehicles: {
        select: {
          id: true,
          brand: true,
          modelName: true,
          price: true,
          year: true,
        },
      },
    },
  });

  return manufacturer;
};
