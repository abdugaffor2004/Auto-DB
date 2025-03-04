import { CheckIcon, Combobox, Loader, ScrollArea, TextInput, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { FC, useState } from 'react';

interface SelectAsyncProps {
  placeholder: string;
  fetchData: () => void;
  options: string[];
  value: string | null;
  className?: string;
  onChange: (value: string | null) => void;
}

export const SelectAsync: FC<SelectAsyncProps> = ({
  className,
  placeholder,
  fetchData,
  options,
  value,
  onChange,
}) => {
  const [loading, setLoading] = useState(false);

  const combobox = useCombobox({
    onDropdownOpen: async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    },
  });

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        const newValue = val === value ? null : val;
        onChange(newValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          className={`min-w-[200px] ${className}`}
          component="button"
          type="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          rightSection={
            loading ? (
              <Loader size={18} />
            ) : combobox.dropdownOpened ? (
              <IconChevronDown size={18} />
            ) : (
              <Combobox.Chevron size={'18px'} />
            )
          }
        >
          <span style={{ display: value ? 'block' : 'none' }}>{value}</span>
          <span style={{ display: value ? 'none' : 'block', color: '#A1ABBB' }}>{placeholder}</span>
        </TextInput>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : options.length === 0 ? (
            <Combobox.Empty>No results</Combobox.Empty>
          ) : (
            <ScrollArea.Autosize mah={220}>
              {options.map(option => (
                <Combobox.Option value={option} key={option}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      paddingRight: 10,
                      cursor: 'pointer',
                    }}
                  >
                    {value === option && <CheckIcon color="#A1ABBB" size={12} />}
                    {option}
                  </div>
                </Combobox.Option>
              ))}
            </ScrollArea.Autosize>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
