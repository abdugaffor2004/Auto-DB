'use client';
import { Center, Loader } from '@mantine/core';
import { useEntitiesCountQuery } from './hooks/useEntitiesCountQuery';
import { useManufacturerByHeadquatersQuery } from './hooks/useManufacturerByHeadquatersQuery';
import { useVehiclesByManufacturerQuery } from './hooks/useVehiclesByManufacturerQuery';
export default function Statistics() {
  const { data: entitiesCount, isLoading: entitiesCountLoading } = useEntitiesCountQuery();
  const { data: manufacturerByHeadquaters, isLoading: manufacturerByHeadquatersLoading } =
    useManufacturerByHeadquatersQuery();

  const { data: vehiclesByManufacturer, isLoading: vehiclesByManufacturerLoading } =
    useVehiclesByManufacturerQuery();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-blue-600">📊 Общая статистика</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Значение
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Производителей
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entitiesCountLoading ? (
                  <Loader size={20} type="dots" />
                ) : (
                  entitiesCount?.manufacturersCount
                )}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Автомобилей
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entitiesCountLoading ? (
                  <Loader size={20} type="dots" />
                ) : (
                  entitiesCount?.vehiclesCount
                )}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Технических спецификаций
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entitiesCountLoading ? (
                  <Loader size={20} type="dots" />
                ) : (
                  entitiesCount?.specificationsCount
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Статистика по странам */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-3 text-purple-600">🌍 Производители по странам</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Страна
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Количество
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manufacturerByHeadquatersLoading ? (
              <tr>
                <td colSpan={2}>
                  <Center>
                    <Loader type="dots" />
                  </Center>
                </td>
              </tr>
            ) : (
              manufacturerByHeadquaters?.map(stat => (
                <tr key={stat.headquarters}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stat.headquarters || 'Неизвестно'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat._count._all}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Топ производителей по количеству моделей */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-3 text-orange-600">
          🏭 Топ производителей по моделям
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Производитель
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Моделей
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehiclesByManufacturerLoading ? (
              <tr>
                <td colSpan={2}>
                  <Center>
                    <Loader type="dots" />
                  </Center>
                </td>
              </tr>
            ) : (
              vehiclesByManufacturer?.map(manufacturer => (
                <tr key={manufacturer.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {manufacturer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {manufacturer._count.vehicles}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
