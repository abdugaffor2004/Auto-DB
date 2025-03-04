import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  ManufacturerFetchFilterOptionsParams,
  ManufacturerFilterOptions,
} from '../types/ManufacturerFilterOptions';
import { Manufacturer } from '../types/Manufacturer';

export const useManufacturerFilterQuery = () => {
  return useMutation<
    ManufacturerFilterOptions,
    Error,
    ManufacturerFetchFilterOptionsParams,
    [string, ManufacturerFetchFilterOptionsParams]
  >({
    mutationKey: ['manufacturer-options'],

    mutationFn: async (params): Promise<ManufacturerFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Manufacturer[]>>(
        '/api/manufacturer',
        {
          params: {
            n: params.name,
            ac: params.assembleCoutries,
            h: params.headquarters,
            md: params.model,
          },
        },
      );

      return {
        names: Array.from(new Set(response.data.map(item => item.name))),
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
