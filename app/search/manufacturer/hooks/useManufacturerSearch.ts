import { useMutation } from '@tanstack/react-query';
import { Manufacturer } from '../types/Manufacturer';
import { ManufacturerSearchParams } from '../types/ManufacturerSearchParams';
import axios from 'axios';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useManufacturerSearch = () => {
  const { currentDbSchema } = useCurrentDbSchema();

  return useMutation<Manufacturer[], Error, ManufacturerSearchParams>({
    mutationKey: ['manufacurer-search'],
    mutationFn: async params => {
      const searchParams = new URLSearchParams();
      searchParams.append('schema', currentDbSchema);

      if (params.search) searchParams.append('s', params.search);
      if (params.name) searchParams.append('n', params.name);
      if (params.model) searchParams.append('md', params.model);
      if (params.assembleCountries)
        params.assembleCountries.map(item => searchParams.append('ac', item));
      if (params.headquarters) searchParams.append('h', params.headquarters);

      const response = await axios.get('/api/manufacturer', {
        params: searchParams,
      });

      return JSON.parse(JSON.stringify(response.data));
    },
  });
};
