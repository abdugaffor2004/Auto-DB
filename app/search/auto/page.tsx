import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FC } from 'react';

const AutoSearchPage: FC = () => {
  return (
    <div>
      <div className="bg-white mt-10 py-10 px-16">
        <div className="max-w-[300px]">
          <Input leftSection={<IconSearch size="1.2rem" />} placeholder="Поиск" />
        </div>
      </div>
    </div>
  );
};

export default AutoSearchPage;
