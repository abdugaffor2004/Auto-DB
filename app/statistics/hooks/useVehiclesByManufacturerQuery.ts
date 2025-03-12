import { useQuery } from '@tanstack/react-query';

interface VehiclesByManufacturer {
  name: string;
  _count: {
    vehicles: number;
  };
}
export const useVehiclesByManufacturerQuery = () => {
  return useQuery<VehiclesByManufacturer[]>({
    queryKey: ['vehicles-by-manufacturer'],
    queryFn: () => fetch('/api/statistics/vehicles-by-manufacturer').then(res => res.json()),
  });
};
