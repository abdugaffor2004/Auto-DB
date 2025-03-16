import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface PostPostgresqlRouteOptionsProps {
  name: string;
  assembleCountries: string[];
  headquarters: string;
  website: string;
}

export const postPostgresqlRouteOptions = async ({
  name,
  assembleCountries,
  headquarters,
  website,
}: PostPostgresqlRouteOptionsProps) => {
  if (!name) {
    return NextResponse.json(
      { error: 'Missing required fields: name, vehicleId' },
      { status: 400 },
    );
  }

  const newManufacturer = await prisma.manufacturerP.create({
    data: {
      name,
      assembleCountries,
      headquarters,
      website,
    },
  });

  return newManufacturer;
};
