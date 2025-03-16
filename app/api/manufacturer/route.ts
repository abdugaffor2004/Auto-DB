import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPostgresqlRouteOptions } from './config/get/postgresql-route-options';
import { getMysqlRouteOptions } from './config/get/mysql-route-options';
import { postPostgresqlRouteOptions } from './config/post/postgresql-route-options';
import { postMysqlRouteOptions } from './config/post/mysql-route-options';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  const search = searchParams.get('s');
  const name = searchParams.get('n');
  const assembleCountries = searchParams.getAll('ac').join(',').split(',').filter(Boolean);
  const headquarters = searchParams.get('h');
  const model = searchParams.get('md');

  if (schema === 'postgresql') {
    const manufacturer = await getPostgresqlRouteOptions({
      search: search || '',
      name: name || '',
      assembleCountries: assembleCountries || [],
      headquarters: headquarters || '',
      model: model || '',
    });

    return NextResponse.json(manufacturer);
  }

  if (schema === 'mysql') {
    const manufacturer = await getMysqlRouteOptions({
      search: search || '',
      name: name || '',
      assembleCountries: assembleCountries || [],
      headquarters: headquarters || '',
      model: model || '',
    });

    return NextResponse.json(manufacturer);
  }
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
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';
  const id = searchParams.get('id');

  if (schema === 'postgresql') {
    try {
      await prisma.manufacturerP.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }

  if (schema === 'mysql') {
    try {
      await prisma.manufacturer.delete({
        where: {
          id: id || '',
        },
      });
      return NextResponse.json({ text: 'Успешно удаленно' });
    } finally {
    }
  }
};
