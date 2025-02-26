import { Group, Text } from '@mantine/core';
import { IconCarFilled } from '@tabler/icons-react';
import { FC } from 'react';
import { NavButtons } from './NavButtons';

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-white">
      <Group gap="10px" align="center">
        <IconCarFilled color="#2563EB" size="2.5rem" />
        <Text fw={700} fz="1.5rem">
          AutoDB
        </Text>
      </Group>

      <NavButtons />
    </header>
  );
};
