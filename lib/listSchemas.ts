import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listSchemas() {
  const schemas = await prisma.$queryRaw`SELECT schema_name FROM information_schema.schemata;`;
  console.log('Схемы в базе данных:', schemas);
}

listSchemas()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
