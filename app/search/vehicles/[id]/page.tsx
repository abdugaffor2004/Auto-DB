'use client';

import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect, useParams } from 'next/navigation';
import { FC } from 'react';
import { Vehicle } from '../types/Vehicle';
import {
  ActionIcon,
  Box,
  Center,
  Collapse,
  Flex,
  Grid,
  Group,
  List,
  Loader,
  Rating,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { formatEngineVolume, formatPrice } from '@/utils/formatters';
import {
  IconBuildingFactory2,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconHistory,
  IconInfoCircleFilled,
  IconSettingsBolt,
  IconShield,
  IconX,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const VehiclePage: FC = () => {
  const dynamicRouteId = useParams().id;
  const { currentDbSchema } = useCurrentDbSchema();
  const [opened, { toggle }] = useDisclosure(false);

  const { data: vehicle, isFetching } = useQuery<unknown, Error, Vehicle>({
    queryKey: ['vehicle', currentDbSchema],
    queryFn: async () => {
      const response = await axios.get(
        `/api/vehicles/vehicleById?schema=${currentDbSchema}&id=${dynamicRouteId}`,
      );

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isFetching) {
    return (
      <Center h="60vh">
        <Loader />
      </Center>
    );
  }

  if (!vehicle) {
    redirect(`/search/vehicles/`);
  }

  return (
    <div className="px-32">
      <Stack gap={12}>
        <Group justify="space-between">
          <Text size="32px" fw="bold">
            {vehicle?.brand} {vehicle?.modelName} {vehicle?.year}
          </Text>
          <Text size="26px" c="#2563EB" fw="bold">
            {formatPrice(vehicle?.price || '')}
          </Text>
        </Group>

        <Text>
          {vehicle?.bodyType} • {vehicle?.seatingCapacity} местный
        </Text>
      </Stack>

      <Grid mt={24}>
        <Grid.Col span={4}>
          <Box className="bg-white rounded-lg p-6">
            <Group justify="space-between">
              <Text size="22px" fw="bold">
                Техн. характеристики
              </Text>
              <IconSettingsBolt color="grey" />
            </Group>

            <Stack mt={28}>
              <Group justify="space-between">
                <Text c="grey">Двигатель</Text>

                <Group gap={10}>
                  <Text>{vehicle?.specification?.engineType}</Text>
                  {vehicle.specification?.engineVolume !== 0 && (
                    <Text>{formatEngineVolume(vehicle?.specification?.engineVolume || '')}</Text>
                  )}
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Мощность</Text>
                <Group gap={10}>
                  <Text>{vehicle?.specification?.horsepower} л.с</Text>
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Трансмиссия</Text>
                <Group gap={10}>
                  <Text>{vehicle?.specification?.transmission}</Text>
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Привод</Text>
                <Group gap={10}>
                  <Text>{vehicle?.specification?.driveType}</Text>
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Тип топлива</Text>
                <Group gap={10}>
                  <Text>{vehicle?.specification?.fuelType}</Text>
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Вес</Text>
                <Group gap={10}>
                  <Text>{vehicle?.specification?.weight} кг</Text>
                </Group>
              </Group>
            </Stack>
          </Box>
        </Grid.Col>

        <Grid.Col span={4}>
          <Box className="bg-white rounded-lg p-6">
            <Group justify="space-between">
              <Text size="22px" fw="bold">
                Безопасность
              </Text>
              <IconShield color="grey" />
            </Group>

            <Stack mt={28}>
              <Group justify="space-between">
                <Text c="grey">Краш рейтинг</Text>

                <Group gap={10}>
                  <Rating value={vehicle?.safety?.crashTestingRating} fractions={2} readOnly />
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Подушки безопасности</Text>
                <Group gap={10}>
                  <Text>{vehicle?.safety?.airbagsCount} шт.</Text>
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">ABS</Text>
                <Group gap={10}>
                  {vehicle?.safety?.abs ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={20} />
                  )}
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">ESP</Text>
                <Group gap={10}>
                  {vehicle?.safety?.esp ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={20} />
                  )}
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Адаптивный круиз-контроль</Text>
                <Group gap={10}>
                  {vehicle?.safety?.adaptiveCruiseControl ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={20} />
                  )}
                </Group>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Аварийное торможение</Text>
                <Group gap={10}>
                  {vehicle?.safety?.emergencyBreaking ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={20} />
                  )}
                </Group>
              </Group>
            </Stack>
          </Box>
        </Grid.Col>

        <Grid.Col span={4}>
          <Box className="bg-white rounded-lg p-6 h-full">
            <Group justify="space-between">
              <Text size="22px" fw="bold">
                Производитель
              </Text>
              <IconBuildingFactory2 color="grey" />
            </Group>

            <Stack mt={28}>
              <Group justify="space-between">
                <Text c="grey">Компания</Text>
                <Text>{vehicle?.manufacturer?.name}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Штаб-квартира</Text>
                <Text>{vehicle?.manufacturer?.headquarters}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Страны сборки</Text>
                <Text>{vehicle?.manufacturer?.assembleCountries.join(', ')}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="grey">Веб-сайт</Text>

                <UnstyledButton
                  className="hover:text-[#228BE6]"
                  component="a"
                  href={vehicle?.manufacturer?.website}
                  target="_blank"
                >
                  {vehicle?.manufacturer?.website}
                </UnstyledButton>
              </Group>
            </Stack>
          </Box>
        </Grid.Col>

        <Grid.Col span={12}>
          <Box className="bg-white rounded-lg p-5">
            <Group justify="space-between">
              <Group className="flex gap-4">
                <Text size="22px" fw="bold">
                  История модели
                </Text>
                <ActionIcon onClick={toggle} variant="transparent">
                  {!opened ? <IconChevronDown color="black" /> : <IconChevronUp color="black" />}
                </ActionIcon>
              </Group>
              <IconHistory color="grey" />
            </Group>

            <Flex justify="space-between" mt={28}>
              <Stack gap={0}>
                <Text c="grey">Поколение</Text>
                <Text mt={10} size="22px" fw="bold">
                  {vehicle?.history?.generation}-ое
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text c="grey">Начало производства</Text>
                <Text mt={10} size="22px" fw="bold">
                  {vehicle?.history?.startYear} г.
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text c="grey">Конец производства</Text>
                <Text mt={10} size="20px" fw="bold">
                  {vehicle?.history?.endYear === null
                    ? 'Все еще производиться'
                    : `${vehicle?.history?.endYear} г.`}
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text c="grey">Количество выпущенных единиц</Text>
                <Text mt={10} size="22px" fw="bold">
                  {vehicle?.history?.unitsProduced?.toLocaleString('ru', {
                    maximumFractionDigits: 3,
                    notation: 'compact',
                    compactDisplay: 'short',
                  })}{' '}
                  +
                </Text>
              </Stack>
            </Flex>

            <Collapse mt={40} in={opened}>
              <Text mb={20} c="grey">
                Ключевые изменения
              </Text>
              <List
                spacing="md"
                size="md"
                center
                withPadding
                icon={<IconInfoCircleFilled color="#2563EB" size={22} />}
              >
                {vehicle.history?.keyChanges.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Collapse>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default VehiclePage;
