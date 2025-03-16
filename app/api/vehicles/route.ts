import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mysqlGetRouteOptions } from './config/get/mysql-get-route-options';
import { postgresqlGetRouteOptions } from './config/get/postgresql-get-route-options';
import { mysqlPostRouteOptions } from './config/post/mysql-post-route-options';
import { postgresqlPostRouteOptions } from './config/post/postgresql-post-route-options';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const currentDbSchema = searchParams.get('schema');
  const search = searchParams.get('s');
  const brand = searchParams.get('b');
  const model = searchParams.get('md');
  const price = searchParams.get('p');
  const bodyType = searchParams.get('bt');
  const yearStr = searchParams.get('y');
  const year = yearStr ? parseInt(yearStr, 10) : null;

  if (currentDbSchema === 'mysql') {
    const vehicles = await mysqlGetRouteOptions({
      search: search || '',
      brand: brand || '',
      model: model || '',
      year: year || 0,
      price: price || '',
      bodyType: bodyType || '',
    });
    return NextResponse.json(vehicles);
  }

  if (currentDbSchema === 'postgresql') {
    const vehicles = await postgresqlGetRouteOptions({
      search: search || '',
      brand: brand || '',
      model: model || '',
      year: year || 0,
      price: price || '',
      bodyType: bodyType || '',
    });
    return NextResponse.json(vehicles);
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};

export const POST = async (request: NextRequest) => {
  const currentDbSchema = request.nextUrl.searchParams.get('schema');

  if (currentDbSchema === 'mysql') {
    const newVehicle = await mysqlPostRouteOptions(await request.json());
    return NextResponse.json(newVehicle, { status: 201 });
  }

  if (currentDbSchema === 'postgresql') {
    const newVehicle = await postgresqlPostRouteOptions(await request.json());
    return NextResponse.json(newVehicle, { status: 201 });
  }

  return NextResponse.json({ error: 'Неверный тип базы данных' }, { status: 400 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const currentDbSchema = searchParams.get('schema');

  if (currentDbSchema === 'mysql') {
    try {
      await prisma.vehicle.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }

  if (currentDbSchema === 'postgresql') {
    try {
      await prisma.vehicleP.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }
};
