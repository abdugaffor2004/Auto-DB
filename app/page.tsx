import { ActionIcon, Center, Group, Stack, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <Center h="60vh">
      <Stack>
        <Text>Короче здесь ничего нет, пока))</Text>

        <Group>
          Поэтому жмякай сюда 👉
          <ActionIcon component={Link} href="/search/auto">
            <IconSearch size={16} />
          </ActionIcon>
        </Group>
      </Stack>
    </Center>
  );
}
