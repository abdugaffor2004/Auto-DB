import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const manufacturersCount = await prisma.manufacturer.count();
  const vehiclesCount = await prisma.vehicle.count();
  const specificationsCount = await prisma.specification.count();

  return NextResponse.json({ manufacturersCount, vehiclesCount, specificationsCount });
}
