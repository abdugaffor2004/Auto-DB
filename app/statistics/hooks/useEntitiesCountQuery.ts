import { useQuery } from '@tanstack/react-query';
export const useEntitiesCountQuery = () => {
  return useQuery({
    queryKey: ['entities-count'],
    queryFn: () => fetch('/api/statistics/entities-count').then(res => res.json()),
  });
};
