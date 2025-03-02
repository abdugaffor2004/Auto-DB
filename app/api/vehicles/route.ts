import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const brand = searchParams.get('b');
  const model = searchParams.get('md');
  const price = searchParams.get('p');
  const yearStr = searchParams.get('y');
  const year = yearStr ? parseInt(yearStr, 10) : null;

  const where: {
    OR?: Prisma.VehicleWhereInput[];
    brand?: string;
    modelName?: string;
    price?: string;
    year?: number;
  } = {};

  if (search) {
    where.OR = [
      { brand: { contains: search, mode: 'insensitive' } },
      { modelName: { contains: search, mode: 'insensitive' } },
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

  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { manufacturer: true, history: true, specification: true },
    // select:{
    //   manufacturer:{
    //     where
    //   }
    // }
  });

  return NextResponse.json(vehicles);
};
