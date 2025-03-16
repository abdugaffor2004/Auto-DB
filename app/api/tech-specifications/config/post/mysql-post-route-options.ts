import prisma from '@/lib/prisma';

interface PostMysqlRouteOptionsProps {
  driveType: string;
  engineType: string;
  engineVolume: number;
  fuelType: string;
  horsepower: number;
  transmission: string;
  weight: number;
}

export const postMysqlRouteOptions = async ({
  driveType,
  engineType,
  engineVolume,
  fuelType,
  horsepower,
  transmission,
  weight,
}: PostMysqlRouteOptionsProps) => {
  const newManufacturer = await prisma.specification.create({
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
