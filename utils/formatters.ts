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

export const formatEngineVolume = (value: number | string) => {
  if (value === 0) {
    return;
  }

  if (typeof value === 'string') {
    return `${parseFloat(value)}л`;
  }

  return `${value.toFixed(1)}л`;
};
