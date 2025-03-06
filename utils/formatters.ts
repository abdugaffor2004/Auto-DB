export const formatPrice = (price: string) => {
  return `${new Intl.NumberFormat('ru-RU').format(parseInt(price))} ₽`;
};

export const unformatNumber = (price: string) => {
  const numericValue = price.replace(/[^0-9]/g, '');
  return numericValue;
};

export const unformatFloat = (value: string): string => {
  let numericValue = value.replace(/[^0-9.,]/g, '');
  numericValue = numericValue.replace(',', '.');
  const parts = numericValue.split('.');
  if (parts.length > 2) {
    numericValue = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  return numericValue;
};

export const formatEngineVolume = (value: number | string): string => {
  if (value === 0) {
    return '';
  }

  if (typeof value === 'string') {
    return `${parseFloat(value)}л`;
  }

  return `${value.toFixed(1)}л`;
};

export const formatOptionalValue = (
  value: string | number | undefined | null,
  callback?: (value: string | number) => string | number,
) => {
  // if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
  //   return '---';
  // }

  // if (typeof value === 'number' && isNaN(value)) {
  //   return '---';
  // }

  // return value;

  return !value ? '---' : callback?.(value);
};
