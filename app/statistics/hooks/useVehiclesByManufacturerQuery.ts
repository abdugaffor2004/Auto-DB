import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

interface VehiclesByManufacturer {
  name: string;
  _count: {
    vehicles: number;
  };
}
export const useVehiclesByManufacturerQuery = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const { data: response, isLoading } = useQuery<VehiclesByManufacturer[]>({
    queryKey: ['vehicles-by-manufacturer', currentDbSchema],
    queryFn: () =>
      fetch(`/api/statistics/vehicles-by-manufacturer?schema=${currentDbSchema}`).then(res =>
        res.json(),
      ),
  });

  const data: TableRecord[] =
    response?.map(item => ({
      label: item.name,
      value: item._count.vehicles,
    })) ?? [];

  return { data, isLoading };
};
