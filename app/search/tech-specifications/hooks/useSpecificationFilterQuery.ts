import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  SpecificationFetchFilterOptionsParams,
  SpecificationFilterOptions,
} from '../types/SpecificationFilterOptions';
import { Specification } from '../types/Specification';
import { unformatFloat, unformatNumber } from '@/utils/formatters';

export const useSpecificationFilterQuery = () => {
  return useMutation<
    SpecificationFilterOptions,
    Error,
    SpecificationFetchFilterOptionsParams,
    [string, SpecificationFetchFilterOptionsParams]
  >({
    mutationKey: ['specification-options'],

    mutationFn: async (params): Promise<SpecificationFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Specification[]>>(
        '/api/tech-specifications',
        {
          params: {
            ev: params.engineVolume ? unformatFloat(params.engineVolume) : undefined,
            et: params.engineType,
            hp: params.horsepower ? unformatNumber(params.horsepower) : undefined,
            ft: params.fuelType,
            p: params?.price ? unformatNumber(params.price) : undefined,
          },
        },
      );

      return {
        engineVolumes: Array.from(new Set(response.data.map(item => item.engineVolume.toString()))),
        engineTypes: Array.from(new Set(response.data.map(item => item.engineType))),
        prices: Array.from(
          new Set(
            response.data
              .map(item => item.vehicles)
              .flat()
              .map(item => item.price),
          ),
        ),
        fuelTypes: Array.from(new Set(response.data.map(item => item.fuelType))),
        horsepowers: Array.from(new Set(response.data.map(item => item.horsepower.toString()))),
      };
    },
  });
};
