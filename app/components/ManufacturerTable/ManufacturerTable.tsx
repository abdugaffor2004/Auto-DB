import { usePagination } from '@/app/hooks/usePagination';
import { Pagination, Table, UnstyledButton } from '@mantine/core';
import { Manufacturer } from '@prisma/client';
import React, { FC } from 'react';

interface CustomTableProps {
  data: Manufacturer[];
}

export const CustomTable: FC<CustomTableProps> = ({ data }) => {
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
      </Table.Tr>
    );
  });
  return (
    <div className="mx-8">
      <Table
        horizontalSpacing="70px"
        verticalSpacing="15px"
        highlightOnHover
        className="bg-white mt-8 rounded-md"
      >
        <Table.Thead h="70px">
          <Table.Tr>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Название компании</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Страна сборки</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Штаб-квартира</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Веб-сайт</Table.Th>
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
