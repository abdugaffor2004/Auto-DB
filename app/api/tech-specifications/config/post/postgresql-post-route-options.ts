import prisma from '@/lib/prisma';

interface PostPostgresqlRouteOptionsProps {
  driveType: string;
  engineType: string;
  engineVolume: number;
  fuelType: string;
  horsepower: number;
  transmission: string;
  weight: number;
}

export const postPostgresqlRouteOptions = async ({
  driveType,
  engineType,
  engineVolume,
  fuelType,
  horsepower,
  transmission,
  weight,
}: PostPostgresqlRouteOptionsProps) => {
  const newManufacturer = await prisma.specificationP.create({
    data: {
      driveType,
      engineType,
      engineVolume,
      fuelType,
      horsepower,
      transmission,
      weight,
    },
  });
  return newManufacturer;
};
