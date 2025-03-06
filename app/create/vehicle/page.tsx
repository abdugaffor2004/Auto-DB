'use client';

import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, NumberInput, Textarea, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { FC, useState } from 'react';
import { VehicleCreate } from './types/VehicleCreate';
import { IconPlus } from '@tabler/icons-react';
import { useVehicleFilterQuery } from '@/app/search/vehicle/hooks/useVehicleFilterQuery';
import { useManufacturerFilterQuery } from '@/app/search/manufacturer/hooks/useManufacturerFilterQuery';
import { NameType } from '@/app/search/manufacturer/types/ManufacturerFilterOptions';
import { SelectAsyncWithId } from '@/app/components/SelectAsync/SelectAsyncWithId';
import { useSpecificationFilterQuery } from '@/app/search/tech-specifications/hooks/useSpecificationFilterQuery';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

const createVehicle = async (data: VehicleCreate) => {
  try {
    const response = await axios.post('/api/vehicles', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }

    return { status: 500, data: { error: 'Не удалось связаться с сервером' } };
  }
};

const CreateVehicle: FC = () => {
  const form = useForm<VehicleCreate>({
    mode: 'controlled',
    initialValues: {
      brand: '',
      modelName: '',
      price: 10000,
      year: 2025,
      seatingCapacity: 2,
      bodyType: '',
      manufacturerId: '',
      specificationId: '',
      history: {
        generation: 1,
        startYear: 2025,
        endYear: 0,
        unitsProduced: 100,
        keyChanges: [],
      },
    },
    validate: {
      brand: isNotEmpty(),
      modelName: isNotEmpty(),
    },
  });

  const { data: vehicleFilterOptions, mutateAsync: getVehicleFilterOptions } =
    useVehicleFilterQuery();
  const { data: manufacturerFilterOptions, mutateAsync: getManufacturerFilterOptions } =
    useManufacturerFilterQuery();
  const { data: specificationFilterOptions, mutateAsync: getSpecificationFilterOptions } =
    useSpecificationFilterQuery();

  const [selectedManufacturer, setSelectedManufacturer] = useState<NameType | null>();
  const [selectedSpecification, setSelectedSpecification] = useState<NameType | null>();

  const handleSubmit = async (values: VehicleCreate) => {
    const response = await createVehicle(values);

    if (response.status === 400) {
      notifications.show({
        color: 'red',
        title: 'Ошибка',
        message:
          'Не все поля были заполнены. Чтобы создать запись также выберите производителя и техническую спецификацию',
      });
    }

    if (response.status === 201) {
      notifications.show({
        title: 'Успешно',
        message: 'Запись успешно была добавлена в Базу Данных',
        color: 'green',
      });

      form.reset();
      setSelectedManufacturer(null);
      setSelectedSpecification(null);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[83vh] mx-80 p-10  bg-white rounded-lg"
    >
      <Grid gutter={30}>
        <Grid.Col span={6}>
          <div className="flex gap-6">
            <TextInput
              className="w-full"
              label="Наименование бренда"
              placeholder="Введите название бренда..."
              {...form.getInputProps('brand')}
            />
            <NumberInput
              className="w-full"
              min={2}
              label="Количество мест"
              {...form.getInputProps('seatingCapacity')}
            />
          </div>

          <div className="flex gap-6 mt-5">
            <NumberInput
              className="w-full"
              min={1}
              label="Поколение"
              placeholder="Введите поколение..."
              {...form.getInputProps('history.generation')}
            />
            <NumberInput
              className="w-full"
              min={1}
              label="Количество авто"
              placeholder="Введите количество..."
              {...form.getInputProps('history.unitsProduced')}
              thousandSeparator=","
              suffix=" ед."
              step={100}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
            />
          </div>

          <SelectAsyncWithId
            className="w-full min-w-[100%] mt-5"
            placeholder="Выберите производителя..."
            options={manufacturerFilterOptions?.names || []}
            fetchData={() => getManufacturerFilterOptions({ name: '' })}
            value={selectedManufacturer || null}
            onChange={payload => {
              setSelectedManufacturer(payload);
              form.setFieldValue('manufacturerId', payload?.value);
            }}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Наименование модели"
            placeholder="Введите название модели..."
            {...form.getInputProps('modelName')}
          />
          <div className="flex gap-6 mt-5">
            <NumberInput
              className="w-full"
              max={2025}
              label="Начало выпуска"
              placeholder="Введите год выпуска..."
              {...form.getInputProps('history.startYear')}
            />
            <NumberInput
              className="w-full"
              label="Конец выпуска"
              placeholder="Введите год выпуска..."
              {...form.getInputProps('history.endYear')}
            />
          </div>

          <div className="flex gap-6 mt-5">
            <SelectAsync
              className="w-full"
              placeholder="Выберите кузов..."
              options={vehicleFilterOptions?.bodyTypes || []}
              fetchData={() => getVehicleFilterOptions({ bodyType: '' })}
              value={form.getValues().bodyType}
              onChange={value => form.setFieldValue('bodyType', value || '')}
            />

            <NumberInput
              className="w-full"
              // label="Конец выпуска"
              min={10000}
              thousandSeparator=","
              suffix="₽"
              placeholder="Введите стоимость..."
              step={10000}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps('price')}
            />
          </div>
        </Grid.Col>

        <Grid.Col className="mt-[-5px]" span={12}>
          <SelectAsyncWithId
            className="min-w-[100%]"
            placeholder="Выберите технические характеристики..."
            options={specificationFilterOptions?.names || []}
            fetchData={() => getSpecificationFilterOptions({})}
            value={selectedSpecification || null}
            onChange={payload => {
              setSelectedSpecification(payload);
              form.setFieldValue('specificationId', payload?.value);
            }}
          />
          <Textarea
            className="mt-5"
            rows={7}
            label="Дополнительная информация"
            placeholder="Введите некую дополнительную информацию..."
            value={form.values.history?.keyChanges.join('.')}
            onChange={e => {
              form.setFieldValue('history.keyChanges', e.currentTarget.value.split('.'));
            }}
          />
        </Grid.Col>
      </Grid>

      <Flex justify="end">
        <Group className="mt-5">
          <Button type="reset" variant="light">
            Сброс
          </Button>
          <Button disabled={!form.isValid()} type="submit">
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CreateVehicle;
