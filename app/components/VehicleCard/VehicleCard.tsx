import { Vehicle } from '@/app/search/vehicle/types/Vehicle';
import { formatOptionalValue, formatPrice } from '@/utils/formatters';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconBrandSpeedtest, IconCurrencyRubel, IconEngine } from '@tabler/icons-react';
import React, { FC, ReactNode } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  rightSection: () => ReactNode;
}

export const VehicleCard: FC<VehicleCardProps> = ({ vehicle, rightSection }) => {
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

        

        {rightSection()}
      </Group>

      <Stack gap={8} mb={20}>
        <Group gap={10}>
          <IconEngine color="#2563EB" />
          <Text fz={14}>
            {vehicle.specification?.engineVolume ? vehicle.specification?.engineVolume : '---'} л
          </Text>
          <Text fz={14}>{vehicle.specification?.engineType.split('+')[0]}</Text>
        </Group>
        <Group gap={10}>
          <IconBrandSpeedtest color="#2563EB" />
          <Text fz={14}>
            {formatOptionalValue(vehicle.specification?.horsepower, value => value)} л.с.
          </Text>
        </Group>
        <Group gap={10}>
          <IconCurrencyRubel color="#2563EB" />
          <Text fz={14}>От {formatPrice(vehicle.price)} </Text>
        </Group>
      </Stack>

      <Button fullWidth variant="light">
        Подробнее
      </Button>
    </div>
  );
};
