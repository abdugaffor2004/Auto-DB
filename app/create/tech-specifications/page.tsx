'use client';

import React, { useState } from 'react';
import { CreateSpecification } from './types/CreateSpecification';
import axios, { AxiosError } from 'axios';
import { isNotEmpty, useForm } from '@mantine/form';
import { Autocomplete, Button, Flex, Grid, Group, Loader, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconChevronUp, IconPlus } from '@tabler/icons-react';
import { useSpecificationFilterQuery } from '@/app/search/tech-specifications/hooks/useSpecificationFilterQuery';
import { CurrentDbSchema, useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

const createSpecification = async (data: CreateSpecification, schema: CurrentDbSchema) => {
  try {
    const response = await axios.post(`/api/tech-specifications?schema=${schema}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return { status: error.response.status, data: error.response.data };
    }

    return { status: 500, data: { error: 'Не удалось связаться с сервером' } };
  }
};

const Specification = () => {
  const { currentDbSchema } = useCurrentDbSchema();

  const form = useForm<CreateSpecification>({
    mode: 'controlled',
    initialValues: {
      driveType: '',
      engineType: '',
      engineVolume: 0,
      fuelType: '',
      horsepower: 0,
      transmission: '',
      weight: 0,
    },
    validate: {
      engineType: isNotEmpty(),
      driveType: isNotEmpty(),
      fuelType: isNotEmpty(),
      engineVolume: value => isNotEmpty() && value === 0,
      horsepower: value => isNotEmpty() && value === 0,
      transmission: isNotEmpty(),
      weight: value => isNotEmpty() && value === 0,
    },
  });

  const handleSubmit = async (vlaues: CreateSpecification) => {
    const response = await createSpecification(vlaues, currentDbSchema);

    if (response.status === 201) {
      notifications.show({
        title: 'Успешно',
        message: 'Запись успешно была добавлена в Базу Данных',
        color: 'green',
      });

      form.reset();
    }
  };

  const { data: options, mutateAsync: getSpecificationFilterOptions } =
    useSpecificationFilterQuery();
  const [dropdownState, setDropdownState] = useState({
    fuelTypeDropdown: { isLoading: false, isOpened: false },
    driveTypeDropdown: { isLoading: false, isOpened: false },
    engineTypeDropdown: { isLoading: false, isOpened: false },
    transmissionDropdown: { isLoading: false, isOpened: false },
  });

  return (
    <form className="flex justify-center" onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <Grid gutter={30} className="h-[62vh] w-[45vw] p-10 mt-3 bg-white rounded-lg">
        <Grid.Col span={6}>
          <NumberInput
            label="Объем двигателя"
            placeholder="Введите объем..."
            suffix=" л"
            min={0}
            {...form.getInputProps('engineVolume')}
          />

          <Autocomplete
            my={16}
            label="Тип топлива"
            placeholder="Введите тип топлива..."
            data={options?.fuelTypes}
            onDropdownClose={() =>
              setDropdownState({
                ...dropdownState,
                fuelTypeDropdown: { isOpened: false, isLoading: false },
              })
            }
            onDropdownOpen={async () => {
              setDropdownState({
                ...dropdownState,
                fuelTypeDropdown: { isOpened: true, isLoading: false },
              });
              try {
                setDropdownState({
                  ...dropdownState,
                  fuelTypeDropdown: { isOpened: true, isLoading: true },
                });
                await getSpecificationFilterOptions({
                  fuelType: '',
                });
              } finally {
                setDropdownState({
                  ...dropdownState,
                  fuelTypeDropdown: { isOpened: true, isLoading: false },
                });
              }
            }}
            rightSection={
              dropdownState.fuelTypeDropdown.isLoading ? (
                <Loader size={18} />
              ) : dropdownState.fuelTypeDropdown.isOpened ? (
                <IconChevronUp size={'18px'} />
              ) : (
                <IconChevronDown size={18} />
              )
            }
            {...form.getInputProps('fuelType')}
          />

          <Autocomplete
            label="Тип привода"
            placeholder="Введите тип привода..."
            data={['Задний привод', 'Передний привод', 'Полный привод']}
            {...form.getInputProps('driveType')}
            onDropdownClose={() =>
              setDropdownState({
                ...dropdownState,
                driveTypeDropdown: { isOpened: false, isLoading: false },
              })
            }
            onDropdownOpen={async () => {
              setDropdownState({
                ...dropdownState,
                driveTypeDropdown: { isOpened: true, isLoading: false },
              });
            }}
            rightSection={
              dropdownState.driveTypeDropdown.isOpened ? (
                <IconChevronUp size={'18px'} />
              ) : (
                <IconChevronDown size={18} />
              )
            }
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <NumberInput
            label="Мощность двигателя"
            placeholder="Введите мощность..."
            suffix=" л.с"
            min={0}
            {...form.getInputProps('horsepower')}
          />

          <Autocomplete
            my={16}
            label="Тип трансмиссии"
            placeholder="Введите тип трансмиссии..."
            data={options?.transmissions}
            onDropdownClose={() =>
              setDropdownState({
                ...dropdownState,
                transmissionDropdown: { isOpened: false, isLoading: false },
              })
            }
            onDropdownOpen={async () => {
              setDropdownState({
                ...dropdownState,
                transmissionDropdown: { isOpened: true, isLoading: false },
              });
              try {
                setDropdownState({
                  ...dropdownState,
                  transmissionDropdown: { isOpened: true, isLoading: true },
                });
                await getSpecificationFilterOptions({
                  transmission: '',
                });
              } finally {
                setDropdownState({
                  ...dropdownState,
                  transmissionDropdown: { isOpened: true, isLoading: false },
                });
              }
            }}
            rightSection={
              dropdownState.transmissionDropdown.isLoading ? (
                <Loader size={18} />
              ) : dropdownState.transmissionDropdown.isOpened ? (
                <IconChevronUp size={'18px'} />
              ) : (
                <IconChevronDown size={18} />
              )
            }
            {...form.getInputProps('transmission')}
          />

          <NumberInput
            label="Масса автомобиля"
            placeholder="Введите массу..."
            suffix=" кг"
            min={0}
            {...form.getInputProps('weight')}
          />
        </Grid.Col>

        <Grid.Col mt={-12} span={12}>
          <Autocomplete
            label="Тип двигателя"
            placeholder="Введите тип двигателя..."
            data={options?.engineTypes}
            onDropdownClose={() =>
              setDropdownState({
                ...dropdownState,
                engineTypeDropdown: { isOpened: false, isLoading: false },
              })
            }
            onDropdownOpen={async () => {
              setDropdownState({
                ...dropdownState,
                engineTypeDropdown: { isOpened: true, isLoading: false },
              });
              try {
                setDropdownState({
                  ...dropdownState,
                  engineTypeDropdown: { isOpened: true, isLoading: true },
                });
                await getSpecificationFilterOptions({
                  engineType: '',
                });
              } finally {
                setDropdownState({
                  ...dropdownState,
                  engineTypeDropdown: { isOpened: true, isLoading: false },
                });
              }
            }}
            rightSection={
              dropdownState.engineTypeDropdown.isLoading ? (
                <Loader size={18} />
              ) : dropdownState.engineTypeDropdown.isOpened ? (
                <IconChevronUp size={'18px'} />
              ) : (
                <IconChevronDown size={18} />
              )
            }
            {...form.getInputProps('engineType')}
          />
          <Flex justify="end">
            <Group mt={32}>
              <Button
                onClick={() => {
                  form.reset();
                }}
                type="reset"
                variant="light"
              >
                Сброс
              </Button>
              <Button type="submit">
                Добавить <IconPlus size={16} className="ml-3" />
              </Button>
            </Group>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default Specification;
