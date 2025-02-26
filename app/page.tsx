import prisma from '@/lib/prisma';

export default async function Home() {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      manufacturer: true,
      history: true,
      safety: true,
      specification: true,
    },
  });
  console.log(vehicles);

  return <div>home</div>;
}
