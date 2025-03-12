import { useQuery } from '@tanstack/react-query';

interface ManufacturerByHeadquaters {
  headquarters: string;
  _count: {
    _all: number;
  };
}

export const useManufacturerByHeadquatersQuery = () => {
  return useQuery<ManufacturerByHeadquaters[]>({
    queryKey: ['manufacturer-by-headquaters'],
    queryFn: () => fetch('/api/statistics/manufacturer-by-headquarters').then(res => res.json()),
  });
};
