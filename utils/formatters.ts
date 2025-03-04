export const addMarkToPrice = (price: string) => {
  return `${new Intl.NumberFormat('ru-RU').format(parseInt(price))} ₽`;
};

export const removeMarkFromPrice = (price: string) => {
  const numericValue = price.replace(/[^0-9]/g, '');
  return numericValue;
};


export const formatEngineVolume = (value: number) => {
  if (value === 0) {
    return;
  }

  return `${value.toFixed(1)}L`;
};
