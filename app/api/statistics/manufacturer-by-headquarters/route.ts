import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema');

  if (schema === 'postgresql') {
    const data = await prisma.manufacturerP.groupBy({
      by: ['headquarters'],
      _count: {
        _all: true,
      },
    });
    return NextResponse.json(data);
  }

  if (schema === 'mysql') {
    const data = await prisma.manufacturer.groupBy({
      by: ['headquarters'],
      _count: {
        _all: true,
      },
    });
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};
