import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const brand = searchParams.get('b');
  const model = searchParams.get('md');
  const price = searchParams.get('p');
  const bodyType = searchParams.get('bt');
  const yearStr = searchParams.get('y');
  const year = yearStr ? parseInt(yearStr, 10) : null;

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

  return NextResponse.json(vehicles);
};

export const POST = async (request: NextRequest) => {
  const {
    brand,
    modelName,
    year,
    price,
    seatingCapacity,
    bodyType,
    manufacturerId,
    specificationId,
  } = await request.json();

  if (!manufacturerId || !specificationId || !year) {
    return NextResponse.json(
      { error: 'Missing required fields: manufactureId, specificationId, year' },
      { status: 400 },
    );
  }

  if (isNaN(parseInt(year))) {
    return NextResponse.json({ error: 'Invalid year format' }, { status: 400 });
  }

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        brand,
        modelName,
        bodyType,
        year: parseInt(year),
        price: parseInt(price),
        seatingCapacity: parseInt(seatingCapacity),
        manufacturerId: manufacturerId,
        specificationId: specificationId,
      },
    });
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
