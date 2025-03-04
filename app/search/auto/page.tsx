'use client';
import { Button, Group, Input, Loader, SimpleGrid } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { useAutoSearch } from './useAutoSearch';
import { VehicleCard } from '@/app/components/VehicleCard/VehicleCard';
import { SelectAsync } from '@/app/components/SelectAsync';
import { addMarkToPrice } from '@/utils/formatters';

const AutoSearchPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>('');
  const [selectedModelName, setSelectedModelName] = useState<string | null>('');
  const [selectedYear, setSelectedYear] = useState<string | null>('');
  const [selectedPrice, setSelectedPrice] = useState<string | null>('');
  const { searchVehicles, getVehicleFilterOptions, options, searchResults, isSearching } =
    useAutoSearch();

  const handleSearch = async () => {
    searchVehicles({
      search: searchValue,
      brand: selectedBrandName,
      model: selectedModelName,
      price: selectedPrice,
      year: selectedYear,
    });
  };

  const vehicleFilterOptionsParams = {
    brand: selectedBrandName || '',
    year: selectedYear || '',
    model: selectedModelName || '',
    price: selectedPrice || '',
  };

  return (
    <div>
      <Group justify="space-between" className="bg-white mt-10 py-10 pl-8 pr-8">
        <div className="flex gap-5">
          <Input
            className="w-[300px]"
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
            leftSection={<IconSearch size="1.2rem" />}
            placeholder="Поиск"
          />
          <Button onClick={handleSearch}>Поиск</Button>
        </div>

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
            value={selectedBrandName}
            onChange={value => setSelectedBrandName(value)}
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
            value={selectedModelName}
            onChange={value => setSelectedModelName(value)}
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
            value={selectedYear}
            onChange={value => setSelectedYear(value)}
          />

          <SelectAsync
            className="min-w-[130px]"
            placeholder="Стоимость"
            options={options?.prices.map(item => addMarkToPrice(item)) || []}
            fetchData={async () =>
              getVehicleFilterOptions({
                ...vehicleFilterOptionsParams,
                price: '',
              })
            }
            value={selectedPrice}
            onChange={value => setSelectedPrice(value)}
          />
        </div>
      </Group>

      <SimpleGrid cols={4} className="px-8 pt-10">
        {searchResults?.length === undefined && !isSearching && (
          <div className="w-[95vw] flex justify-center items-center">Ничего не найдено</div>
        )}
        {isSearching && (
          <div className="w-[95vw] flex justify-center items-center">
            <Loader />
          </div>
        )}

        {searchResults?.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AutoSearchPage;
