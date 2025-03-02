'use client';
import { Button, Group, Input, Select, SimpleGrid } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { useAutoSearch } from './useAutoSearch';
import { addMarkToPrice } from '@/utils/formatters';
import { VehicleCard } from '@/app/components/VehicleCard/VehicleCard';
import { Vehicle } from '@/common-types/Vehicle';

const AutoSearchPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>('');
  const [selectedModelName, setSelectedModelName] = useState<string | null>('');
  const [selectedYear, setSelectedYear] = useState<string | null>('');
  const [selectedPrice, setSelectedPrice] = useState<string | null>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { searchVehicles, fetchOptions, options } = useAutoSearch();

  const handleSearch = async () => {
    const response = await searchVehicles({
      search: searchValue,
      brand: selectedBrandName,
      model: selectedModelName,
      price: selectedPrice,
      year: selectedYear,
    });
    setVehicles([...response]);
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
          <Select
            placeholder="Брэнд"
            onFocus={async () =>
              await fetchOptions({
                brand: '',
                year: selectedYear || '',
                model: selectedModelName || '',
                price: selectedPrice || '',
              })
            }
            onChange={value => setSelectedBrandName(value)}
            data={options.brands}
          />

          <Select
            placeholder="Модель"
            onFocus={() =>
              fetchOptions({
                model: '',
                year: selectedYear || '',
                brand: selectedBrandName || '',
                price: selectedPrice || '',
              })
            }
            onChange={value => setSelectedModelName(value)}
            data={options.models}
          />

          <Select
            className="max-w-[130px]"
            placeholder="Год выпуска"
            onFocus={() =>
              fetchOptions({
                year: '',
                price: selectedPrice || '',
                brand: selectedBrandName || '',
                model: selectedModelName || '',
              })
            }
            value={selectedYear}
            onChange={value => setSelectedYear(value)}
            data={options.year}
          />

          <Select
            className="max-w-[125px]"
            placeholder="Стоимость"
            onFocus={() =>
              fetchOptions({
                price: '',
                year: selectedYear || '',
                brand: selectedBrandName || '',
                model: selectedModelName || '',
              })
            }
            onChange={value => setSelectedPrice(value)}
            data={options.price.map(item => addMarkToPrice(item))}
          />
        </div>
      </Group>

      <SimpleGrid cols={4} className="px-8 pt-10">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AutoSearchPage;
