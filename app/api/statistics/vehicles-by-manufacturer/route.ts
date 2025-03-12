import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const vehiclesByManufacturer = await prisma.manufacturer.findMany({
    select: {
      name: true,
      _count: {
        select: { vehicles: true },
      },
    },
    orderBy: {
      vehicles: {
        _count: 'desc',
      },
    },
  });
  return NextResponse.json(vehiclesByManufacturer);
}
