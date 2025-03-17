import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id') || '';
  const currentDbSchema = searchParams.get('schema');

  if (currentDbSchema === 'mysql') {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
      include: {
        history: true,
        manufacturer: true,
        safety: true,
        specification: true,
      },
    });

    return NextResponse.json(vehicle, { status: 200 });
  }

  if (currentDbSchema === 'postgresql') {
    const vehicle = await prisma.vehicleP.findUnique({
      where: {
        id: id,
      },
      include: {
        history: true,
        manufacturer: true,
        safety: true,
        specification: true,
      },
    });

    return NextResponse.json(vehicle, { status: 200 });
  }
};
