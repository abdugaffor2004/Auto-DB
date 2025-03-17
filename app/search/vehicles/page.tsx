'use client';
import { ActionIcon, Group, Loader, SimpleGrid } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { VehicleCard } from '@/app/components/VehicleCard/VehicleCard';
import { SelectAsync } from '@/app/components/SelectAsync';
import { useVehicleSearch } from './hooks/useVehicleSearch';
import { useVehicleFilterQuery } from './hooks/useVehicleFilterQuery';
import { VehicleSelectedFilters } from './types/VehicleSelectedFilters';
import { SearchGroup } from '@/app/components/SearchGroup/SearchGroup';
import { formatPrice } from '@/utils/formatters';
import { IconLink } from '@tabler/icons-react';

const VehcileSearchPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [vehicleSelectedFilters, setVehicleSelectedFilters] = useState<VehicleSelectedFilters>({
    selectedBrandName: '',
    selectedModelName: '',
    selectedYear: '',
    selectedPrice: '',
  });

  const {
    mutateAsync: searchVehicles,
    data: searchResults,
    isPending: isSearching,
  } = useVehicleSearch();

  const { data: options, mutateAsync: getVehicleFilterOptions } = useVehicleFilterQuery();

  const handleSearch = async () => {
    searchVehicles({
      search: searchValue,
      brand: vehicleSelectedFilters.selectedBrandName,
      model: vehicleSelectedFilters.selectedModelName,
      price: vehicleSelectedFilters.selectedPrice,
      year: vehicleSelectedFilters.selectedYear,
    });
    setVehicleSelectedFilters({
      selectedBrandName: '',
      selectedModelName: '',
      selectedYear: '',
      selectedPrice: '',
    });
  };

  const vehicleFilterOptionsParams = {
    brand: vehicleSelectedFilters.selectedBrandName,
    year: vehicleSelectedFilters.selectedYear,
    model: vehicleSelectedFilters.selectedModelName,
    price: vehicleSelectedFilters.selectedPrice,
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <Group justify="space-between" className="bg-white mt-10 py-10 pl-8 pr-8">
        <SearchGroup value={searchValue} onChange={setSearchValue} onSubmit={handleSearch} />

        <div className="flex gap-3">
          <SelectAsync
            className="min-w-[180px]"
            placeholder="Брэнд"
            options={options?.brands || []}
            fetchData={() =>
              getVehicleFilterOptions({
                ...vehicleFilterOptionsParams,
                brand: '',
              })
            }
            value={vehicleSelectedFilters.selectedBrandName}
            onChange={value =>
              setVehicleSelectedFilters(prev => ({ ...prev, selectedBrandName: value }))
            }
          />

          <SelectAsync
            className="min-w-[180px]"
            placeholder="Модель"
            options={options?.models || []}
            fetchData={async () =>
              getVehicleFilterOptions({
                ...vehicleFilterOptionsParams,
                model: '',
              })
            }
            value={vehicleSelectedFilters.selectedModelName}
            onChange={value =>
              setVehicleSelectedFilters(prev => ({ ...prev, selectedModelName: value }))
            }
          />

          <SelectAsync
            className="min-w-[130px]"
            placeholder="Год выпуска"
            options={options?.years || []}
            fetchData={async () =>
              getVehicleFilterOptions({
                ...vehicleFilterOptionsParams,
                year: '',
              })
            }
            value={vehicleSelectedFilters.selectedYear}
            onChange={value =>
              setVehicleSelectedFilters(prev => ({ ...prev, selectedYear: value }))
            }
          />

          <SelectAsync
            className="min-w-[130px]"
            placeholder="Стоимость"
            options={options?.prices?.map(item => formatPrice(item)) || []}
            fetchData={async () =>
              getVehicleFilterOptions({
                ...vehicleFilterOptionsParams,
                price: '',
              })
            }
            value={vehicleSelectedFilters.selectedPrice}
            onChange={value =>
              setVehicleSelectedFilters(prev => ({ ...prev, selectedPrice: value }))
            }
          />
        </div>
      </Group>

      <SimpleGrid cols={4} className="px-8 pt-10">
        {searchResults?.length === undefined && !isSearching && (
          <div className="w-[95vw] flex justify-center items-center text-xl">Ничего не найдено</div>
        )}
        {isSearching && (
          <div className="w-[95vw] flex justify-center items-center">
            <Loader />
          </div>
        )}

        {searchResults?.map(vehicle => (
          <VehicleCard
            rightSection={() => (
              <ActionIcon
                component="a"
                href={vehicle.manufacturer?.website}
                target="_blank"
                variant="subtle"
              >
                <IconLink size={20} />
              </ActionIcon>
            )}
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default VehcileSearchPage;
