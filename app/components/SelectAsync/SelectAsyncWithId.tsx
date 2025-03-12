import { NameType } from '@/app/search/manufacturer/types/ManufacturerFilterOptions';
import { CheckIcon, Combobox, Loader, ScrollArea, TextInput, useCombobox } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { FC, useState } from 'react';

interface SelectAsyncWithIdProps {
  placeholder?: string;
  fetchData: () => void;
  options: NameType[];
  value: NameType | null;
  className?: string;
  onChange: (value: NameType | null) => void;
}

export const SelectAsyncWithId: FC<SelectAsyncWithIdProps> = ({
  className,
  placeholder,
  fetchData,
  options,
  value,
  onChange,
  ...rest
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
        const newValue = val === value?.label ? null : val;
        const newId = options.find(item => item.label === newValue)?.value || '';
        onChange({ value: newId, label: newValue || '' });
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          {...rest}
          className={`max-w-[200px] ${className}`}
          component="button"
          type="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          rightSection={
            loading ? (
              <Loader size={18} />
            ) : combobox.dropdownOpened ? (
              <IconChevronUp size={'18px'} />
            ) : (
              <IconChevronDown size={18} />
            )
          }
        >
          <span style={{ display: value ? 'block' : 'none' }}>{value?.label}</span>
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
                <Combobox.Option value={option.label} key={option.label}>
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
                    {value?.label === option.label && <CheckIcon color="#A1ABBB" size={12} />}
                    {option.label}
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
