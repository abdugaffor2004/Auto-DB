import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prismaPublic = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?schema=public`,
    },
  },
});

const prismaMysql = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?schema=mysql`,
    },
  },
});

async function copyData() {
  try {
    // Копирование данных из таблицы Manufacturer в ManufacturerP
    // const manufacturers = await prismaPublic.manufacturer.findMany();
    // for (const manufacturer of manufacturers) {
    //   await prismaMysql.manufacturerP.create({
    //     data: {
    //       ...manufacturer,
    //       id: uuidv4(), // Генерация нового уникального идентификатора
    //     },
    //   });
    // }

    // Копирование данных из таблицы Vehicle в VehicleP
    const vehicles = await prismaPublic.vehicle.findMany();
    for (const vehicle of vehicles) {
      await prismaMysql.vehicleP.create({
        data: {
          ...vehicle,
          id: uuidv4(), // Генерация нового уникального идентификатора
        },
      });
    }

    // // Копирование данных из таблицы Specification в SpecificationP
    // const specifications = await prismaPublic.specification.findMany();
    // for (const specification of specifications) {
    //   await prismaMysql.specificationP.create({
    //     data: {
    //       ...specification,
    //       id: uuidv4(), // Генерация нового уникального идентификатора
    //     },
    //   });
    // }

    // Копирование данных из таблицы History в HistoryP
    const histories = await prismaPublic.history.findMany();
    for (const history of histories) {
      await prismaMysql.historyP.create({
        data: {
          ...history,
          id: uuidv4(), // Генерация нового уникального идентификатора
        },
      });
    }

    // // Копирование данных из таблицы Safety в SafetyP
    // const safeties = await prismaPublic.safety.findMany();
    // for (const safety of safeties) {
    //   await prismaMysql.safetyP.create({
    //     data: {
    //       ...safety,
    //       id: uuidv4(), // Генерация нового уникального идентификатора

    //     },
    //   });
    // }

    console.log('Данные успешно скопированы из схемы public в схему mysql.');
  } catch (error) {
    console.error('Ошибка при копировании данных:', error);
  } finally {
    await prismaPublic.$disconnect();
    await prismaMysql.$disconnect();
  }
}

copyData();
