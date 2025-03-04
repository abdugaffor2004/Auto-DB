import { AutoFilterOptions, FetchFilterOptionsParams } from '@/common-types/AutoFilterOptions';
import { AutoSearchParams } from '@/common-types/AutoSearchParams';
import { Vehicle } from '@/common-types/Vehicle';
import { removeMarkFromPrice } from '@/utils/formatters';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

type OptionsQueryData = FetchFilterOptionsParams | undefined;

export const useAutoSearch = () => {
  const {
    data: options,
    isPending: isOptionsLoading,
    mutateAsync: getVehicleFilterOptions,
  } = useMutation<AutoFilterOptions, Error, FetchFilterOptionsParams, [string, OptionsQueryData]>({
    mutationKey: ['options'],

    mutationFn: async (params): Promise<AutoFilterOptions> => {
      const response = await axios.get<unknown, AxiosResponse<Vehicle[]>>('/api/vehicles', {
        params: {
          b: params?.brand,
          md: params?.model,
          y: params?.year,
          p: params?.price ? removeMarkFromPrice(params.price) : undefined,
        },
      });

      return {
        brands: Array.from(new Set(response.data.map(item => item.brand))),
        models: Array.from(new Set(response.data.map(item => item.modelName))),
        prices: Array.from(new Set(response.data.map(item => item.price.toString()))),
        years: Array.from(new Set(response.data.map(item => item.year.toString()))),
      };
    },
  });

  const {
    data: searchResults,
    isPending: isSearching,
    mutateAsync: searchVehicles,
  } = useMutation<Vehicle[], Error, AutoSearchParams>({
    mutationKey: ['search'],
    mutationFn: async params => {
      const searchParams = new URLSearchParams();

      if (params?.search) searchParams.append('s', params.search);
      if (params?.brand) searchParams.append('b', params.brand);
      if (params?.model) searchParams.append('md', params.model);
      if (params?.price) searchParams.append('p', removeMarkFromPrice(params.price));
      if (params?.year) searchParams.append('y', params.year);

      const response = await axios.get('/api/vehicles', { params: searchParams });
      return JSON.parse(JSON.stringify(response.data));
    },
  });

  return {
    options,
    searchResults,
    isOptionsLoading,
    isSearching,
    getVehicleFilterOptions,
    searchVehicles,
  };
};
