import { usePagination } from '@/app/hooks/usePagination';
import { Specification } from '@/app/search/tech-specifications/types/Specification';
import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import React, { FC } from 'react';

interface SpecificationTable {
  data: Specification[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}

export const SpecificationTable: FC<SpecificationTable> = ({
  data,
  withDelete = false,
  deleteRows,
}) => {
  const { currentItems, page, total, setPage } = usePagination<Specification>(data!);
  const rows = currentItems?.map(item => {
    return (
      <Table.Tr key={item.id}>
        {withDelete && (
          <Table.Td>
            <ActionIcon variant="subtle" onClick={() => deleteRows?.(item.id)}>
              <IconTrash />
            </ActionIcon>
          </Table.Td>
        )}
        <Table.Td>{`${item.engineVolume} л`}</Table.Td>
        <Table.Td>{`${item.horsepower} л.с`}</Table.Td>
        <Table.Td>{item.fuelType}</Table.Td>
        <Table.Td>{item.engineType}</Table.Td>
        <Table.Td>{item.driveType}</Table.Td>
        <Table.Td>{item.transmission}</Table.Td>
        <Table.Td>{item.weight}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div className="mx-8">
      <Table
        horizontalSpacing="25px"
        verticalSpacing="15px"
        highlightOnHover
        className="bg-white mt-8 rounded-md"
      >
        <Table.Thead h="70px">
          <Table.Tr>
            {withDelete && <Table.Th className="w-[10px]"></Table.Th>}
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Объем ДВС</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Мощность ДВС</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Тип топлива</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Тип двигателя</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Тип привода</Table.Th>
            <Table.Th className="w-[200px] text-[18px] text-[#228BE6]">Тип трансмисии</Table.Th>
            <Table.Th className="w-[100px] text-[18px] text-[#228BE6]">Вес</Table.Th>
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
