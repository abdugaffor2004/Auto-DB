import { Vehicle } from '@/common-types/Vehicle';
import { addMarkToPrice, formatEngineVolume } from '@/utils/formatters';
import { ActionIcon, Button, Group, Stack, Text } from '@mantine/core';
import { IconBrandSpeedtest, IconCurrencyRubel, IconEngine, IconLink } from '@tabler/icons-react';
import React, { FC } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <Group justify="space-between" align="start" mb="16px">
        <Stack gap={0}>
          <Text fz="18px" fw="bolder">
            {vehicle.brand} {vehicle.modelName}
          </Text>
          <Text fz="13px" c="#4B5563">
            Модель {vehicle.year} года
          </Text>
        </Stack>

        <ActionIcon
          component="a"
          href={vehicle.manufacturer.website}
          target="_blank"
          variant="subtle"
        >
          <IconLink size={20} />
        </ActionIcon>
      </Group>

      <Stack gap={8} mb={20}>
        <Group gap={10}>
          <IconEngine color="#2563EB" />
          <Text fz={14}>
            {formatEngineVolume(vehicle.specification.engineVolume)}{' '}
            {vehicle.specification.engineType.split('+')[0]}
          </Text>
        </Group>
        <Group gap={10}>
          <IconBrandSpeedtest color="#2563EB" />
          <Text fz={14}>{vehicle.specification.horsepower} л.с.</Text>
        </Group>
        <Group gap={10}>
          <IconCurrencyRubel color="#2563EB" />
          <Text fz={14}>От {addMarkToPrice(vehicle.price)} </Text>
        </Group>
      </Stack>

      <Button fullWidth variant="light">
        Подробнее
      </Button>
    </div>
  );
};
