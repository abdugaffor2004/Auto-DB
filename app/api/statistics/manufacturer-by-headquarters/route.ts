import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const data = await prisma.manufacturer.groupBy({
    by: ['headquarters'],
    _count: {
      _all: true,
    },
  });
  return NextResponse.json(data);
};
