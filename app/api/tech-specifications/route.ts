import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const engineVolume = searchParams.get('ev');
  const horsepower = searchParams.get('hp');
  const fuelType = searchParams.get('ft');
  const engineType = searchParams.get('et');
  const price = searchParams.get('p');

  const where: Prisma.SpecificationWhereInput = {};

  if (search) {
    where.OR = [
      { engineVolume: { equals: parseInt(search) } },
      { horsepower: { equals: parseInt(search) } },
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

  if (price) {
    where.vehicles = {
      some: {
        price: price,
      },
    };
  }

  const manufacturer = await prisma.specification.findMany({
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

  return NextResponse.json(manufacturer);
};
