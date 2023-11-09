export const isNumber = (value: string): boolean => {
  return value === Number(value).toString()
}

export const discountPercent = (
  price: number,
  discountedPrice: number,
): string => {
  return `-${Math.floor((1 - discountedPrice / price) * 100)}%`
}
