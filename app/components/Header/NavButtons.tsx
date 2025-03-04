'use client';
import { Button, Menu } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const NavButtons: FC = () => {
  const currentPathname = usePathname();

  return (
    <div className="flex justify-center gap-4">
      <Button variant={currentPathname === '/' ? 'light' : 'subtle'}>
        <Link href="/">Главная</Link>
      </Button>

      <Menu trigger="click">
        <Menu.Target>
          <Button variant={currentPathname.startsWith('/search') ? 'light' : 'subtle'}>
            Поиск
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/search/vehicle">
            Автомобиль
          </Menu.Item>
          <Menu.Item component={Link} href="/search/manufacturer">
            Производитель
          </Menu.Item>
          <Menu.Item component={Link} href="/search/tech-specifications">
            Технические характеристики
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu trigger="click">
        <Menu.Target>
          <Button variant={currentPathname.startsWith('/create') ? 'light' : 'subtle'}>
            Администрирование
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/create/vehicle">
            Добавить Автомобиль
          </Menu.Item>
          <Menu.Item component={Link} href="/create/manufacturer">
            Добавить Производителя
          </Menu.Item>
          <Menu.Item component={Link} href="/create/tech-specifications">
            Добавить Технические характеристики
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
