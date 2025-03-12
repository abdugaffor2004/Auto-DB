import { Center, Loader, Pagination } from '@mantine/core';
import { Table } from '@mantine/core';
import { FC } from 'react';
import { TableRecord } from '../../statistics/types/TableRecord';
import { usePagination } from '@/app/hooks/usePagination';

interface StatisticsTableProps {
  statistics: TableRecord[];
  isLoading: boolean;
  verticalSpacing?: number;
  horizontalSpacing?: number;
  withPagination?: boolean;
}

export const StatisticsTable: FC<StatisticsTableProps> = ({
  statistics,
  isLoading,
  verticalSpacing = 12,
  horizontalSpacing = 10,
  withPagination = true,
}) => {
  const { currentItems, page, total, setPage } = usePagination<TableRecord>(statistics);
  return (
    <>
      <Table
        verticalSpacing={verticalSpacing}
        horizontalSpacing={horizontalSpacing}
        className="min-w-full divide-y divide-gray-200"
      >
        <Table.Thead h="50px" className="bg-gray-50">
          <Table.Tr>
            <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Категория
            </Table.Th>
            <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Значение
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Center>
                  <Loader type="dots" />
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : (
            currentItems?.map(stat => (
              <Table.Tr key={stat.label}>
                <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stat.label}
                </Table.Td>
                <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.value}
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      {withPagination && (
        <div className="flex justify-center">
          <Pagination total={total} value={page} onChange={setPage} mt="sm" />
        </div>
      )}
    </>
  );
};
