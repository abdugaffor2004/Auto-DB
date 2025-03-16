'use client';
import { Group, Switch, Text } from '@mantine/core';
import { IconBrandMysql, IconCarFilled } from '@tabler/icons-react';
import { FC } from 'react';
import { NavButtons } from './NavButtons';
import { PostgreIcon } from './PostgreIcon';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

export const Header: FC = () => {
  const { currentDbSchema, setCurrentDbSchema } = useCurrentDbSchema();
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-white">
      <Group gap="10px" align="center">
        <IconCarFilled color="#2563EB" size="2.5rem" />
        <Text fw={700} fz="1.5rem">
          AutoDB
        </Text>
      </Group>

      <Group gap={60}>
        <Switch
          size="lg"
          color="#E8F3FC"
          checked={currentDbSchema === 'postgresql'}
          onChange={e => setCurrentDbSchema(e.target.checked ? 'postgresql' : 'mysql')}
          onLabel={<PostgreIcon size={22} />}
          offLabel={<IconBrandMysql size={18} stroke={2.5} color="var(--mantine-color-blue-6)" />}
        />

        <NavButtons />
      </Group>
    </header>
  );
};
