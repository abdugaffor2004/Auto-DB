import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  SpecificationFetchFilterOptionsParams,
  SpecificationFilterOptions,
} from '../types/SpecificationFilterOptions';
import { Specification } from '../types/Specification';
import { unformatNumber } from '@/utils/formatters';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useSpecificationFilterQuery = () => {
  const { currentDbSchema } = useCurrentDbSchema();

  return useMutation<
    SpecificationFilterOptions,
    Error,
    SpecificationFetchFilterOptionsParams,
    [string, SpecificationFetchFilterOptionsParams]
  >({
    mutationKey: ['specification-options'],

    mutationFn: async (params): Promise<SpecificationFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Specification[]>>(
        `/api/tech-specifications?schema=${currentDbSchema}`,
        {
          params: {
            ev: params.engineVolume,
            et: params.engineType,
            hp: params.horsepower ? unformatNumber(params.horsepower) : undefined,
            ft: params.fuelType,
            tr: params.transmission,
            p: params?.price ? unformatNumber(params.price) : undefined,
          },
        },
      );

      const names = response.data.map(item => ({
        value: item.id,
        label: `${item.engineType} | ${item.fuelType} | ${item.engineVolume} л | ${item.horsepower} л.с. | ${item.driveType} | ${item.transmission}`,
      }));

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
        transmissions: Array.from(new Set(response.data.map(item => item.transmission))),
        names: names,
      };
    },
  });
};
