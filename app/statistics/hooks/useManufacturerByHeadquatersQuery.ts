import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

interface ManufacturerByHeadquaters {
  headquarters: string;
  _count: {
    _all: number;
  };
}

export const useManufacturerByHeadquatersQuery = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const { data: response, isLoading } = useQuery<ManufacturerByHeadquaters[]>({
    queryKey: ['manufacturer-by-headquaters', currentDbSchema],
    queryFn: () =>
      fetch(`/api/statistics/manufacturer-by-headquarters?schema=${currentDbSchema}`).then(res =>
        res.json(),
      ),
  });

  const data: TableRecord[] =
    response?.map(item => ({
      label: item.headquarters,
      value: item._count._all,
    })) ?? [];

  return { data, isLoading };
};
