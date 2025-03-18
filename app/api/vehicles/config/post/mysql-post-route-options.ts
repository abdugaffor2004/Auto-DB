import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PostRouteOptionsParams } from './post-route-options';

export const mysqlPostRouteOptions = async (params: PostRouteOptionsParams) => {
  const {
    brand,
    modelName,
    year,
    price,
    seatingCapacity,
    bodyType,
    manufacturerId,
    specificationId,
    history,
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

  const newHistory = await prisma.history.create({
    data: { ...history, vehicleId: newVehicle.id },
  });

  return { ...newVehicle, ...newHistory };
};
