import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { unformatNumber } from '@/utils/formatters';
import { Specification } from '../types/Specification';
import { SpecificationSearchParams } from '../types/SpecificationSearchParams';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useSpecificationSearch = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  return useMutation<Specification[], Error, SpecificationSearchParams>({
    mutationKey: ['specifications-search'],
    mutationFn: async params => {
      const searchParams = new URLSearchParams();
      searchParams.append('schema', currentDbSchema);

      if (params.search) searchParams.append('s', params.search);
      if (params.engineVolume) searchParams.append('ev', params.engineVolume);
      if (params.horsepower) searchParams.append('hp', params.horsepower);
      if (params.fuelType) searchParams.append('ft', params.fuelType);
      if (params.engineType) searchParams.append('et', params.engineType);
      if (params.price) searchParams.append('p', unformatNumber(params.price));

      const response = await axios.get('/api/tech-specifications', { params: searchParams });
      return JSON.parse(JSON.stringify(response.data));
    },
  });
};
