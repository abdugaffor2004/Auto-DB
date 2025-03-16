import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface PostgresqlPostRouteOptionsParams {
  brand: string;
  modelName: string;
  year: string;
  price: string;
  seatingCapacity: string;
  bodyType: string;
  manufacturerId: string;
  specificationId: string;
}

export const postgresqlPostRouteOptions = async (params: PostgresqlPostRouteOptionsParams) => {
  const {
    brand,
    modelName,
    year,
    price,
    seatingCapacity,
    bodyType,
    manufacturerId,
    specificationId,
  } = params;

  if (!manufacturerId || !specificationId || !year) {
    return NextResponse.json(
      { error: 'Missing required fields: manufactureId, specificationId, year' },
      { status: 400 },
    );
  }

  if (isNaN(parseInt(year))) {
    return NextResponse.json({ error: 'Invalid year format' }, { status: 400 });
  }

  const newVehicle = await prisma.vehicleP.create({
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

  return newVehicle;
};
