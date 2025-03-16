import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPostgresqlRouteOptions } from './config/get/postgresql-get-route-options';
import { getMysqlRouteOptions } from './config/get/mysql-get-route-options';
import { postPostgresqlRouteOptions } from './config/post/postgresql-post-route-options';
import { postMysqlRouteOptions } from './config/post/mysql-post-route-options';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema');

  const search = searchParams.get('s');
  const engineVolume = searchParams.get('ev');
  const horsepower = searchParams.get('hp');
  const fuelType = searchParams.get('ft');
  const engineType = searchParams.get('et');
  const price = searchParams.get('p');
  const transmission = searchParams.get('tr');

  if (schema === 'postgresql') {
    const manufacturer = await getPostgresqlRouteOptions({
      search: search || '',
      engineVolume: engineVolume || '',
      horsepower: horsepower || '',
      fuelType: fuelType || '',
      engineType: engineType || '',
      transmission: transmission || '',
      price: price || '',
    });
    return NextResponse.json(manufacturer);
  }

  if (schema === 'mysql') {
    const manufacturer = await getMysqlRouteOptions({
      search: search || '',
      engineVolume: engineVolume || '',
      horsepower: horsepower || '',
      fuelType: fuelType || '',
      engineType: engineType || '',
      transmission: transmission || '',
      price: price || '',
    });
    return NextResponse.json(manufacturer);
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  if (schema === 'postgresql') {
    const newManufacturer = await postPostgresqlRouteOptions(await request.json());
    return NextResponse.json(newManufacturer, { status: 201 });
  }

  if (schema === 'mysql') {
    const newManufacturer = await postMysqlRouteOptions(await request.json());
    return NextResponse.json(newManufacturer, { status: 201 });
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const schema = searchParams.get('schema');

  if (schema === 'mysql') {
    try {
      await prisma.specification.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }

  if (schema === 'postgresql') {
    try {
      await prisma.specificationP.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};
