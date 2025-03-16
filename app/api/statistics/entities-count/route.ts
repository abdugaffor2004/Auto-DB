import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  if (schema === 'postgresql') {
    const manufacturersCount = await prisma.manufacturerP.count();
    const vehiclesCount = await prisma.vehicleP.count();
    const specificationsCount = await prisma.specificationP.count();

    return NextResponse.json({ manufacturersCount, vehiclesCount, specificationsCount });
  }

  if (schema === 'mysql') {
    const manufacturersCount = await prisma.manufacturer.count();
    const vehiclesCount = await prisma.vehicle.count();
    const specificationsCount = await prisma.specification.count();

    return NextResponse.json({ manufacturersCount, vehiclesCount, specificationsCount });
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
}
