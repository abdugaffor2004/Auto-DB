import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { VehicleSearchParams } from '../types/VehicleSearchParams';
import { Vehicle } from '../types/Vehicle';
import { unformatNumber } from '@/utils/formatters';

export const useVehicleSearch = () => {
  return useMutation<Vehicle[], Error, VehicleSearchParams>({
    mutationKey: ['vehicle-search'],
    mutationFn: async params => {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.append('s', params.search);
      if (params.brand) searchParams.append('b', params.brand);
      if (params.model) searchParams.append('md', params.model);
      if (params.price) searchParams.append('p', unformatNumber(params.price));
      if (params.year) searchParams.append('y', params.year);

      const response = await axios.get('/api/vehicles', { params: searchParams });
      return JSON.parse(JSON.stringify(response.data));
    },
  });
};
