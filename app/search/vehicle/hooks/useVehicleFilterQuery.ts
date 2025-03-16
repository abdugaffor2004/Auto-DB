import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  VehicleFilterOptions,
  VehiclesFetchFilterOptionsParams,
} from '../types/VehicleFilterOptions';
import { Vehicle } from '../types/Vehicle';
import { unformatNumber } from '@/utils/formatters';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useVehicleFilterQuery = () => {
  const { currentDbSchema } = useCurrentDbSchema();

  return useMutation<
    VehicleFilterOptions,
    Error,
    VehiclesFetchFilterOptionsParams,
    [string, VehiclesFetchFilterOptionsParams]
  >({
    mutationKey: ['vehicle-options'],
    mutationFn: async (params): Promise<VehicleFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Vehicle[]>>('/api/vehicles', {
        params: {
          schema: currentDbSchema,
          b: params?.brand,
          md: params?.model,
          y: params?.year,
          bt: params.bodyType,
          p: params?.price ? unformatNumber(params.price) : undefined,
        },
      });

      return {
        brands: Array.from(new Set(response.data.map(item => item.brand))),
        models: Array.from(new Set(response.data.map(item => item.modelName))),
        prices: Array.from(new Set(response.data.map(item => item.price.toString()))),
        bodyTypes: Array.from(new Set(response.data.map(item => item.bodyType))),
        years: Array.from(new Set(response.data.map(item => item.year.toString()))),
      };
    },
  });
};
