import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const name = searchParams.get('n');
  const assembleCountries = searchParams.getAll('ac').join(',').split(',').filter(Boolean);
  const headquarters = searchParams.get('h');
  const model = searchParams.get('md');

  const where: Prisma.ManufacturerWhereInput = {};

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

  const manufacturer = await prisma.manufacturer.findMany({
    where,
    include: {
      vehicles: {
        select: {
          id: true,
          brand: true,
          modelName: true,
        },
      },
    },
  });

  return NextResponse.json(manufacturer);
};
