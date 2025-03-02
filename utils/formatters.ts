export const addMarkToPrice = (price: string) => {
  return `${new Intl.NumberFormat('ru-RU').format(parseInt(price))} ₽`;
};

export const removeMarkFromPrice = (price: string) => {
  return price?.split(' ')[0];
};

export const formatEngineVolume = (value: number) => {
  if (value === 0) {
    return;
  }

  return `${value.toFixed(1)}L`;
};
