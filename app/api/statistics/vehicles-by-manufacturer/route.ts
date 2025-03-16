import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParasm = request.nextUrl.searchParams;
  const schema = searchParasm.get('schema');

  if (schema === 'postgresql') {
    const vehiclesByManufacturer = await prisma.manufacturerP.findMany({
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

  if (schema === 'mysql') {
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

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
}
