import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface PostMysqlRouteOptionsProps {
  name: string;
  assembleCountries: string[];
  headquarters: string;
  website: string;
}

export const postMysqlRouteOptions = async ({
  name,
  assembleCountries,
  headquarters,
  website,
}: PostMysqlRouteOptionsProps) => {
  if (!name) {
    return NextResponse.json(
      { error: 'Missing required fields: name, vehicleId' },
      { status: 400 },
    );
  }

  const newManufacturer = await prisma.manufacturer.create({
    data: {
      name,
      assembleCountries,
      headquarters,
      website,
    },
  });

  return newManufacturer;
};
