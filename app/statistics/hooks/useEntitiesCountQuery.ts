import { useQuery } from '@tanstack/react-query';
import { TableRecord } from '../types/TableRecord';
export const useEntitiesCountQuery = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['entities-count'],
    queryFn: () => fetch('/api/statistics/entities-count').then(res => res.json()),
  });

  const data: TableRecord[] = [
    { label: 'Производителей', value: response?.manufacturersCount },
    { label: 'Автомобилей', value: response?.vehiclesCount },
    { label: 'Технических спецификаций', value: response?.specificationsCount },
  ];

  return { data, isLoading };
};
