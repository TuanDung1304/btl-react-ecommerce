import { Size } from '../Products/type'

export const sortSizes = (sizes: string[]) => {
  const sizesOrder = Object.values(Size)
  return sizes.sort(
    (a, b) => sizesOrder.indexOf(a as Size) - sizesOrder.indexOf(b as Size),
  )
}
