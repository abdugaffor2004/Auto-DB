import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  ManufacturerFetchFilterOptionsParams,
  ManufacturerFilterOptions,
} from '../types/ManufacturerFilterOptions';
import { Manufacturer } from '../types/Manufacturer';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useManufacturerFilterQuery = (params: ManufacturerFetchFilterOptionsParams) => {
  const { currentDbSchema } = useCurrentDbSchema();
  return useQuery<ManufacturerFilterOptions>({
    queryKey: ['manufacturer-options', params],
    queryFn: async (): Promise<ManufacturerFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Manufacturer[]>>(
        '/api/manufacturer',
        {
          params: {
            n: params.name,
            ac: params.assembleCountries?.join(',') || '',
            h: params.headquarters,
            md: params.model,
            schema: currentDbSchema,
          },
        },
      );

      return {
        names: Array.from(
          new Set(response.data.map(item => ({ value: item.id, label: item.name }))),
        ),
        assembleCountries: Array.from(
          new Set(response.data.map(item => item.assembleCountries).flat()),
        ),
        headquarters: Array.from(new Set(response.data.map(item => item.headquarters))),
        models: Array.from(
          new Set(
            response.data
              .map(item => item.vehicles)
              .flat()
              .map(item => item.modelName),
          ),
        ),
      };
    },
  });
};
