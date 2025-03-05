'use client';
import { SearchGroup } from '@/app/components/SearchGroup/SearchGroup';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Group, Loader } from '@mantine/core';
import React, { useState } from 'react';
import { useSpecificationFilterQuery } from './hooks/useSpecificationFilterQuery';
import { SpecificationFetchFilterOptionsParams } from './types/SpecificationFilterOptions';
import { SpecificationSelectedFilters } from './types/SpecificationSelectedFilters';
import { formatPrice } from '@/utils/formatters';
import { useSpecificationSearch } from './hooks/useSpecificationSearch';
import { SpecificationTable } from '@/app/components/SpecificationTable/SpecificationTable';

const TechSpecifications = () => {
  const [searchValue, setSearchValue] = useState('');
  const [specificationSelectedFilters, setSpecificationSelectedFilters] =
    useState<SpecificationSelectedFilters>({
      selectedEngineType: '',
      selectedEngineVolume: '',
      selectedFuelType: '',
      selectedHorsepower: '',
      selectedPrice: '',
    });

  const { data: options, mutateAsync: getSpecificationFilterOptions } =
    useSpecificationFilterQuery();
  const {
    mutateAsync: searchSpecification,
    data: searchedSpecifications,
    isPending: isSearching,
  } = useSpecificationSearch();

  const specificationFilterOptionsParams: SpecificationFetchFilterOptionsParams = {
    engineType: specificationSelectedFilters.selectedEngineType,
    engineVolume: specificationSelectedFilters.selectedEngineVolume,
    fuelType: specificationSelectedFilters.selectedFuelType,
    horsepower: specificationSelectedFilters.selectedHorsepower,
    price: specificationSelectedFilters.selectedPrice,
  };

  const handleSearch = async () => {
    searchSpecification({
      search: searchValue,
      ...specificationFilterOptionsParams,
    });
    setSpecificationSelectedFilters({
      selectedEngineType: '',
      selectedEngineVolume: '',
      selectedFuelType: '',
      selectedHorsepower: '',
      selectedPrice: '',
    });
  };

  return (
    <>
      <Group justify="space-between" className="bg-white mt-10 py-10 pl-8 pr-8">
        <SearchGroup value={searchValue} onChange={setSearchValue} onSubmit={handleSearch} />

        <div className="flex gap-3">
          <SelectAsync
            className="min-w-[200px]"
            placeholder="Тип двигателя"
            options={options?.engineTypes || []}
            fetchData={() =>
              getSpecificationFilterOptions({
                ...specificationFilterOptionsParams,
                engineType: '',
              })
            }
            value={specificationSelectedFilters.selectedEngineType}
            onChange={value =>
              setSpecificationSelectedFilters(prev => ({ ...prev, selectedEngineType: value }))
            }
          />

          <SelectAsync
            className="min-w-[120px]"
            placeholder="Объем"
            options={
              options?.engineVolumes.map(item => (item !== '0' ? `${item} л` : 'нет ДВС')) || []
            }
            fetchData={async () =>
              getSpecificationFilterOptions({
                ...specificationFilterOptionsParams,
                engineVolume: '',
              })
            }
            value={specificationSelectedFilters.selectedEngineVolume}
            onChange={value =>
              setSpecificationSelectedFilters(prev => ({ ...prev, selectedEngineVolume: value }))
            }
          />

          <SelectAsync
            className="w-[160px]"
            placeholder="Тип топлива"
            options={options?.fuelTypes || []}
            fetchData={async () =>
              getSpecificationFilterOptions({
                ...specificationFilterOptionsParams,
                fuelType: '',
              })
            }
            value={specificationSelectedFilters.selectedFuelType}
            onChange={value =>
              setSpecificationSelectedFilters(prev => ({ ...prev, selectedFuelType: value }))
            }
          />

          <SelectAsync
            className="w-[120px]"
            placeholder="Мощность"
            options={options?.horsepowers.map(item => `${item} л.с.`) || []}
            fetchData={async () =>
              getSpecificationFilterOptions({
                ...specificationFilterOptionsParams,
                horsepower: '',
              })
            }
            value={specificationSelectedFilters.selectedHorsepower}
            onChange={value =>
              setSpecificationSelectedFilters(prev => ({ ...prev, selectedHorsepower: value }))
            }
          />
          <SelectAsync
            className="w-[140px]"
            placeholder="Стоимость"
            options={options?.prices.map(item => formatPrice(item)) || []}
            fetchData={async () =>
              getSpecificationFilterOptions({
                ...specificationFilterOptionsParams,
                price: '',
              })
            }
            value={specificationSelectedFilters.selectedPrice}
            onChange={value =>
              setSpecificationSelectedFilters(prev => ({ ...prev, selectedPrice: value }))
            }
          />
        </div>
      </Group>

      {searchedSpecifications?.length === undefined && !isSearching && (
        <div className="w-[99.2vw] flex justify-center items-center mt-10 text-xl">
          Ничего не найдено
        </div>
      )}
      {isSearching && (
        <div className="w-[99.2vw] flex justify-center items-center mt-10">
          <Loader />
        </div>
      )}

      {!isSearching && !!searchedSpecifications && (
        <SpecificationTable data={searchedSpecifications || []} />
      )}
    </>
  );
};

export default TechSpecifications;
