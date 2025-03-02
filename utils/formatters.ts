export const addMarkToPrice = (price: string) => {
  return `${price} ₽`;
};

export const removeMarkFromPrice = (price: string) => {
  return price?.split(' ')[0];
};
