import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const useEntitiesCountQuery = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const { data: response, ...rest } = useQuery({
    queryKey: ['entities-count', currentDbSchema],
    queryFn: () =>
      fetch(`/api/statistics/entities-count?schema=${currentDbSchema}`).then(res => res.json()),
  });

  const data: TableRecord[] = [
    { label: 'Производителей', value: response?.manufacturersCount },
    { label: 'Автомобилей', value: response?.vehiclesCount },
    { label: 'Технических спецификаций', value: response?.specificationsCount },
  ];

  return { data, ...rest };
};
