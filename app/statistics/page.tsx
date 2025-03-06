import prisma from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export default async function Statistics() {
  // Получаем данные для статистики
  const mostPowerfulSpec = await prisma.specification.findFirst({
    orderBy: { horsepower: 'desc' },
  });

  const mostPowerfulVehicle = mostPowerfulSpec
    ? await prisma.vehicle.findFirst({
        where: { specificationId: mostPowerfulSpec.id },
        include: { manufacturer: true, specification: true },
      })
    : null;

  const mostExpensiveVehicle = await prisma.vehicle.findFirst({
    orderBy: { price: 'desc' },
    include: { manufacturer: true },
  });

  const yearStats = await prisma.vehicle.aggregate({
    _min: { year: true },
    _max: { year: true },
  });

  const priceStats = await prisma.vehicle.aggregate({
    _avg: { price: true },
    _count: { _all: true },
  });

  const bodyTypeStats = await prisma.vehicle.groupBy({
    by: ['bodyType'],
    _count: { _all: true },
    orderBy: { _count: { bodyType: 'desc' } },
  });

  // Форматируем Decimal значения
  const formatPrice = (price: Decimal | null | undefined) =>
    price ? `$${price.toNumber().toLocaleString()}` : 'N/A';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-8 text-center"></h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Самый мощный автомобиль */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">🏎️ Самый мощный автомобиль</h2>
          {mostPowerfulVehicle ? (
            <div className="space-y-2">
              <p className="font-medium">
                {mostPowerfulVehicle.brand} {mostPowerfulVehicle.modelName}
              </p>
              <p className="text-gray-600">{mostPowerfulVehicle.specification?.horsepower} л.с</p>
              <p className="text-sm text-gray-500">{mostPowerfulVehicle.manufacturer?.name}</p>
            </div>
          ) : (
            <p className="text-gray-500">Нет данных</p>
          )}
        </div>

        {/* Самый дорогой автомобиль */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-green-600">💎 Самый дорогой автомобиль</h2>
          {mostExpensiveVehicle ? (
            <div className="space-y-2">
              <p className="font-medium">
                {mostExpensiveVehicle.brand} {mostExpensiveVehicle.modelName}
              </p>
              <p className="text-gray-600">{formatPrice(mostExpensiveVehicle.price)}</p>
              <p className="text-sm text-gray-500">Год выпуска: {mostExpensiveVehicle.year}</p>
            </div>
          ) : (
            <p className="text-gray-500">Нет данных</p>
          )}
        </div>

        {/* Годы производства */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-purple-600">📅 Годы производства</h2>
          <div className="space-y-2">
            <p className="font-medium">
              Самая старая модель: <span className="text-gray-600">{yearStats._min.year || 'N/A'}</span>
            </p>
            <p className="font-medium">
              Самая новая модель: <span className="text-gray-600">{yearStats._max.year || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Средняя цена */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-orange-600">📊 Средняя стоимость авто</h2>
          <p className="text-2xl font-bold">
            {priceStats._avg.price
              ? `${priceStats._avg.price
                  .toNumber()
                  .toLocaleString(undefined, { maximumFractionDigits: 2 })} ₽`
              : 'N/A'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Всего с такой стоимостью: {priceStats._count._all} шт</p>
        </div>

        {/* Распределение по типам кузова */}
        <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-3 text-red-600">🚗 Типы кузова</h2>
          <div className="grid grid-cols-2 gap-4">
            {bodyTypeStats.map(stat => (
              <div
                key={stat.bodyType}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span className="font-medium">{stat.bodyType || 'Unknown'}</span>
                <span className="bg-blue-100 ml-2 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {stat._count._all}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
