import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Генерация 50 записей для каждой таблицы
  const manufacturers = await generateManufacturers(10); // 10 производителей
  const specifications = await generateSpecifications(50); // 50 технических характеристик
  const histories = await generateHistories(50); // 50 исторических данных
  const safeties = await generateSafeties(50); // 50 характеристик безопасности
  const configurations = await generateConfigurations(50); // 50 конфигураций

  // Генерация автомобилей с связью к другим таблицам
  for (let i = 0; i < 50; i++) {
    const randomManufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const randomSpecification = specifications[Math.floor(Math.random() * specifications.length)];
    const randomHistory = histories[Math.floor(Math.random() * histories.length)];
    const randomSafety = safeties[Math.floor(Math.random() * safeties.length)];
    const randomConfiguration = configurations[Math.floor(Math.random() * configurations.length)];

    await prisma.vehicle.create({
      data: {
        brand: faker.vehicle.manufacturer(),
        modelName: faker.vehicle.model(),
        year: faker.number.int({ min: 1886, max: new Date().getFullYear() }),
        bodyType: faker.helpers.arrayElement(['Sedan', 'SUV', 'Hatchback', 'Truck']),
        price: faker.number.float({ min: 10000, max: 100000 }),
        manufacturer: { connect: { id: randomManufacturer.id } },
        specification: { connect: { id: randomSpecification.id } },
        history: { connect: { id: randomHistory.id } },
        safety: { connect: { id: randomSafety.id } },
        configuration: { connect: { id: randomConfiguration.id } },
      },
    });
  }

  console.log('Seeding completed!');
}

// Генерация производителей
async function generateManufacturers(count: number) {
  const manufacturers = [];
  for (let i = 0; i < count; i++) {
    const manufacturer = await prisma.manufacturer.create({
      data: {
        name: faker.company.name(),
        assembleCountries: JSON.stringify([faker.location.country(), faker.location.country()]),
        headquarters: `${faker.location.city()}, ${faker.location.country()}`,
        website: faker.internet.url(),
      },
    });
    manufacturers.push(manufacturer);
  }
  return manufacturers;
}

// Генерация технических характеристик
async function generateSpecifications(count: number) {
  const specifications = [];
  for (let i = 0; i < count; i++) {
    const specification = await prisma.specification.create({
      data: {
        engineVolume: faker.number.float({ min: 1.0, max: 30.0 }),
        horsepower: faker.number.int({ min: 1, max: 60000 }),
        fuelType: faker.helpers.arrayElement(['Gasoline', 'Diesel', 'Electric', 'Hybrid']),
        engineType: faker.helpers.arrayElement(['Inline-4', 'V6', 'V8', 'Flat-6']),
        driveType: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD', '4WD']),
        weight: faker.number.int({ min: 100, max: 10000 }),
      },
    });
    specifications.push(specification);
  }
  return specifications;
}

// Генерация исторических данных
async function generateHistories(count: number) {
  const histories = [];
  for (let i = 0; i < count; i++) {
    const startYear = faker.number.int({ min: 1886, max: new Date().getFullYear() - 1 });
    const endYear = faker.number.int({ min: startYear + 1, max: new Date().getFullYear() });

    const history = await prisma.history.create({
      data: {
        generation: faker.number.int({ min: 1, max: 50 }),
        startYear,
        endYear,
        changes: faker.lorem.paragraph(),
      },
    });
    histories.push(history);
  }
  return histories;
}

// Генерация характеристик безопасности
async function generateSafeties(count: number) {
  const safeties = [];
  for (let i = 0; i < count; i++) {
    const safety = await prisma.safety.create({
      data: {
        crashTestingRating: faker.number.int({ min: 0, max: 5 }),
        airbagsCount: faker.number.int({ min: 0, max: 20 }),
        abs: faker.datatype.boolean(),
        esp: faker.datatype.boolean(),
        emergencyBreaking: faker.datatype.boolean(),
        adaptiveCruiseControl: faker.datatype.boolean(),
      },
    });
    safeties.push(safety);
  }
  return safeties;
}

// Генерация конфигураций
async function generateConfigurations(count: number) {
  const configurations = [];
  for (let i = 0; i < count; i++) {
    const configuration = await prisma.configuration.create({
      data: {
        transmission: faker.helpers.arrayElement(['Manual', 'Automatic', 'CVT', 'Dual Clutch']),
        driveType: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD', '4WD']),
        seatingCapacity: faker.number.int({ min: 1, max: 30 }),
        interiorMaterial: faker.helpers.arrayElement([
          'Leather',
          'Fabric',
          'Alcantara',
          'Synthetic Leather',
        ]),
      },
    });
    configurations.push(configuration);
  }
  return configurations;
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
