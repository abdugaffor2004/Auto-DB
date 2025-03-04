'use client';
import { Group, Loader, TagsInput } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { useManufacturerFilterQuery } from './hooks/useManufacturerFilterQuery';
import { ManufacturerSelectedFilters } from './types/ManufacturerSelectedFilters';
import { SelectAsync } from '@/app/components/SelectAsync';
import { useToggle } from '@mantine/hooks';
import { useManufacturerSearch } from './hooks/useManufacturerSearch';
import { SearchGroup } from '@/app/components/SearchGroup/SearchGroup';
import { CustomTable } from '@/app/components/ManufacturerTable/ManufacturerTable';

const ManufacturerSearchPage: FC = () => {
  const [isMultiSelectLoading, setisMultiSelectLoading] = useState(false);
  const [isMultiSelectDropdownOpened, setIsMultiSelectDropdownOpened] = useToggle();
  const [searchValue, setSearchValue] = useState('');
  const [manufacturerSelectedFilters, setManufacturerSelectedFilters] =
    useState<ManufacturerSelectedFilters>({
      selectedName: '',
      selectedAssembleCountries: [],
      selectedHeadquarters: '',
      selectedModel: '',
    });

  const { data: options, mutateAsync: getManufacturerFilterOptions } = useManufacturerFilterQuery();
  const {
    data: searchedManufacturers,
    mutateAsync: searchManufacturer,
    isPending: isSearching,
  } = useManufacturerSearch();

  const manufacturerFilterOptionsParams = {
    name: manufacturerSelectedFilters.selectedName,
    assembleCountries: manufacturerSelectedFilters.selectedAssembleCountries,
    headquarters: manufacturerSelectedFilters.selectedHeadquarters,
    model: manufacturerSelectedFilters.selectedModel,
  };

  const handleSearch = async () => {
    searchManufacturer({
      search: searchValue,
      ...manufacturerFilterOptionsParams,
    });
    setManufacturerSelectedFilters({
      selectedAssembleCountries: [],
      selectedHeadquarters: '',
      selectedModel: '',
      selectedName: '',
    });
  };

  return (
    <>
      <Group justify="space-between" className="bg-white mt-10 py-10 pl-8 pr-8">
        <SearchGroup value={searchValue} onChange={setSearchValue} onSubmit={handleSearch} />

        <div className="flex gap-3">
          <TagsInput
            className="w-[250px] max-w-[300px]"
            placeholder="Страна сборки"
            data={options?.assembleCountries || []}
            value={manufacturerSelectedFilters.selectedAssembleCountries}
            onChange={value => {
              setManufacturerSelectedFilters(prev => ({
                ...prev,
                selectedAssembleCountries: value,
              }));
            }}
            onDropdownClose={() => setIsMultiSelectDropdownOpened(false)}
            onDropdownOpen={async () => {
              setIsMultiSelectDropdownOpened(true);
              try {
                setisMultiSelectLoading(true);
                await getManufacturerFilterOptions({
                  ...manufacturerFilterOptionsParams,
                  assembleCountries: [],
                });
              } finally {
                setisMultiSelectLoading(false);
              }
            }}
            rightSection={
              isMultiSelectLoading ? (
                <Loader size={18} />
              ) : isMultiSelectDropdownOpened ? (
                <IconChevronUp size={'18px'} />
              ) : (
                <IconChevronDown size={18} />
              )
            }
          />

          <SelectAsync
            className="min-w-[180px]"
            placeholder="Название компании"
            options={options?.names || []}
            fetchData={() =>
              getManufacturerFilterOptions({
                ...manufacturerFilterOptionsParams,
                name: '',
              })
            }
            value={manufacturerSelectedFilters.selectedName}
            onChange={value =>
              setManufacturerSelectedFilters(prev => ({ ...prev, selectedName: value }))
            }
          />

          <SelectAsync
            className="min-w-[180px]"
            placeholder="Штаб-квартира"
            options={options?.headquarters || []}
            fetchData={async () =>
              getManufacturerFilterOptions({
                ...manufacturerFilterOptionsParams,
                headquarters: '',
              })
            }
            value={manufacturerSelectedFilters.selectedHeadquarters}
            onChange={value =>
              setManufacturerSelectedFilters(prev => ({ ...prev, selectedHeadquarters: value }))
            }
          />

          <SelectAsync
            className="min-w-[130px]"
            placeholder="Модель автомобиля"
            options={options?.models || []}
            fetchData={async () =>
              getManufacturerFilterOptions({
                ...manufacturerFilterOptionsParams,
                model: '',
              })
            }
            value={manufacturerSelectedFilters.selectedModel}
            onChange={value =>
              setManufacturerSelectedFilters(prev => ({ ...prev, selectedModel: value }))
            }
          />
        </div>
      </Group>

      {searchedManufacturers?.length === undefined && !isSearching && (
        <div className="w-[99.2vw] flex justify-center items-center mt-10 text-xl">
          Ничего не найдено
        </div>
      )}
      {isSearching && (
        <div className="w-[99.2vw] flex justify-center items-center mt-10">
          <Loader />
        </div>
      )}

      {!isSearching && !!searchedManufacturers && (
        <CustomTable data={searchedManufacturers || []} />
      )}
    </>
  );
};

export default ManufacturerSearchPage;
