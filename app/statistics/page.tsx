'use client';
import { useEntitiesCountQuery } from './hooks/useEntitiesCountQuery';
import { useManufacturerByHeadquatersQuery } from './hooks/useManufacturerByHeadquatersQuery';
import { useVehiclesByManufacturerQuery } from './hooks/useVehiclesByManufacturerQuery';
import { StatisticsTable } from '../components/StatisticsTable/StatisticsTable';
import { Grid } from '@mantine/core';

export default function Statistics() {
  const { data: entitiesStats, isLoading: entitiesStatsLoading } = useEntitiesCountQuery();

  const { data: manufacturerByHeadquaters, isLoading: manufacturerByHeadquatersLoading } =
    useManufacturerByHeadquatersQuery();

  const { data: vehiclesByManufacturer, isLoading: vehiclesByManufacturerLoading } =
    useVehiclesByManufacturerQuery();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Grid>
        <Grid.Col span={6}>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-orange-600">
              🏭 Топ производителей по моделям
            </h2>
            <StatisticsTable
              statistics={vehiclesByManufacturer}
              isLoading={vehiclesByManufacturerLoading}
            />
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-blue-600">
              🌍 Производители по странам
            </h2>
            <StatisticsTable
              statistics={manufacturerByHeadquaters}
              isLoading={manufacturerByHeadquatersLoading}
            />
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-purple-600">📊 Общая статистика</h2>
            <StatisticsTable
              withPagination={false}
              statistics={entitiesStats}
              isLoading={entitiesStatsLoading}
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
