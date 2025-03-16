'use client';
import { useLocalStorage } from '@mantine/hooks';

export type CurrentDbSchema = 'mysql' | 'postgresql';

export const useCurrentDbSchema = () => {
  const [currentDbSchema, setCurrentDbSchema] = useLocalStorage<CurrentDbSchema>({
    key: 'dbSchema',
    defaultValue: 'postgresql',
  });

  return { currentDbSchema, setCurrentDbSchema };
};
