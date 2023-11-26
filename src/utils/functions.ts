export const isNumber = (value: string): boolean => {
  return value === Number(value).toString()
}

export const getDiscountPercent = (
  price: number,
  discountedPrice: number,
): string => {
  return `${Math.floor((1 - discountedPrice / price) * 100)}%`
}

export const getCurrency = (value: number) => `${value.toLocaleString()}₫`
