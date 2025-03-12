'use client';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import React from 'react';
import { CreateManufacturer } from './types/CreateManufaturer';
import axios, { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { Button, Flex, Group, TagsInput, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const createManufacturer = async (data: CreateManufacturer) => {
  try {
    const response = await axios.post('/api/manufacturer', data, {
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

const Manufacturer = () => {
  const form = useForm<CreateManufacturer>({
    mode: 'controlled',
    initialValues: {
      name: '',
      assembleCountries: [],
      headquarters: '',
      website: '',
    },
    validate: {
      name: isNotEmpty(),
      headquarters: isNotEmpty(),
      website: matches(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        'Неверный формат ссылки',
      ),
    },
  });

  const handleSubmit = async (formValues: CreateManufacturer) => {
    const response = await createManufacturer(formValues);

    if (response.status === 201) {
      notifications.show({
        title: 'Успешно',
        message: 'Запись успешно была добавлена в Базу Данных',
        color: 'green',
      });

      form.reset();
    }
  };

  return (
    <form className="flex justify-center" onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <div className="h-[62vh] w-[35vw] p-10 mt-3 bg-white rounded-lg">
        <TextInput
          label="Название компании"
          placeholder="Введите название компании..."
          {...form.getInputProps('name')}
        />

        <TagsInput
          my={16}
          label="Страны сборки автомобиля"
          placeholder="Введите страну..."
          {...form.getInputProps('assembleCountries')}
        />

        <TextInput
          label="Штаб-квартира"
          placeholder="Введите расположение..."
          {...form.getInputProps('headquarters')}
        />
        <TextInput
          mt={16}
          label="Ссылка на веб-сайт"
          placeholder="Введите ссылку..."
          {...form.getInputProps('website')}
        />

        <Flex justify="end">
          <Group mt={32}>
            <Button type="reset" variant="light">
              Сброс
            </Button>
            <Button type="submit">
              Добавить <IconPlus size={16} className="ml-3" />
            </Button>
          </Group>
        </Flex>
      </div>
    </form>
  );
};

export default Manufacturer;
