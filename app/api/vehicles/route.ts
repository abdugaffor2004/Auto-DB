import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      manufacturer: true,
      configuration: true,
      history: true,
      safety: true,
      specification: true,
    },
  });
  return NextResponse.json(vehicles, { status: 200 });
};
