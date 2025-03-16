import { usePagination } from '@/app/hooks/usePagination';
import { Manufacturer } from '@/app/search/manufacturer/types/Manufacturer';
import { ActionIcon, Pagination, Table, Text, UnstyledButton } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface CustomTableProps {
  data: Manufacturer[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}

export const ManufacturerTable: FC<CustomTableProps> = ({
  data,
  deleteRows,
  withDelete = false,
}) => {
  const { currentItems, page, total, setPage } = usePagination<Manufacturer>(data!);

  const rows = currentItems?.map(item => {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.assembleCountries.join(', ')}</Table.Td>
        <Table.Td>{item.headquarters}</Table.Td>
        <Table.Td>
          <UnstyledButton
            className="hover:text-[#228BE6]"
            component="a"
            href={item.website}
            target="_blank"
          >
            {item.website}
          </UnstyledButton>
        </Table.Td>
        <Table.Td p={0}>
          {item.vehicles.map(vehicle => (
            <Link
              className="hover:text-[#228BE6]"
              key={vehicle.id}
              href={`/search/vehicle/${vehicle.id}`}
            >
              {vehicle.brand} {vehicle.modelName}
              {', '}
            </Link>
          ))}
        </Table.Td>
        <Table.Td>
          {item.vehicles.map(vehicle => {
            return <Text key={vehicle.id}>{vehicle.price}</Text>;
          })}
        </Table.Td>
        {withDelete && (
          <Table.Td>
            <ActionIcon variant="subtle" onClick={() => deleteRows?.(item.id)}>
              <IconTrash />
            </ActionIcon>
          </Table.Td>
        )}
      </Table.Tr>
    );
  });
  return (
    <div className="mx-8">
      <Table
        horizontalSpacing="70px"
        verticalSpacing="3px"
        highlightOnHover
        className="bg-white mt-8 rounded-md"
      >
        <Table.Thead h="70px">
          <Table.Tr>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Название компании</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Страна сборки</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Штаб-квартира</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Веб-сайт</Table.Th>
            <Table.Th className="w-[300px] text-[18px] text-[#228BE6]">Автомобили</Table.Th>
            <Table.Th className="w-[300px] text-[18px] text-[#228BE6]">Цена</Table.Th>
            {withDelete && <Table.Th p={0} className="w-[5px]"></Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody mah="42vh" miw="100%">
          {rows}
        </Table.Tbody>
      </Table>

      <div className="flex justify-center">
        <Pagination total={total} value={page} onChange={setPage} mt="sm" />
      </div>
    </div>
  );
};
