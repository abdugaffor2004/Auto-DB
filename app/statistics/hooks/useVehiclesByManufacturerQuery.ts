import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';

interface VehiclesByManufacturer {
  name: string;
  _count: {
    vehicles: number;
  };
}
export const useVehiclesByManufacturerQuery = () => {
  const { data: response, isLoading } = useQuery<VehiclesByManufacturer[]>({
    queryKey: ['vehicles-by-manufacturer'],
    queryFn: () => fetch('/api/statistics/vehicles-by-manufacturer').then(res => res.json()),
  });

  const data: TableRecord[] =
    response?.map(item => ({
      label: item.name,
      value: item._count.vehicles,
    })) ?? [];

  return { data, isLoading };
};
