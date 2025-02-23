'use client';
import { Button, Group, Menu } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="flex items-center mx-6 mt-3">
      <Group>AutoDB</Group>

      <div className="flex flex-1 justify-around">
        <Button>
          <Link href="/">Главная</Link>
        </Button>

        <Menu trigger="click-hover">
          <Menu.Target>
            <Button>
              <Link href="/search">Поиск</Link>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} href="/search/auto">
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

        <Menu trigger="click-hover">
          <Menu.Target>
            <Button>Администрирование</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} href="/create/auto">
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
    </header>
  );
};
