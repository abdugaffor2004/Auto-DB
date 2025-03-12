import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';

interface ManufacturerByHeadquaters {
  headquarters: string;
  _count: {
    _all: number;
  };
}

export const useManufacturerByHeadquatersQuery = () => {
  const { data: response, isLoading } = useQuery<ManufacturerByHeadquaters[]>({
    queryKey: ['manufacturer-by-headquaters'],
    queryFn: () => fetch('/api/statistics/manufacturer-by-headquarters').then(res => res.json()),
  });

  const data: TableRecord[] =
    response?.map(item => ({
      label: item.headquarters,
      value: item._count._all,
    })) ?? [];

  return { data, isLoading };
};
