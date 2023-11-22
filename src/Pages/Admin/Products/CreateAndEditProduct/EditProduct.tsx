import { useCallback, useEffect, useMemo, useState } from 'react'
import ProductFormMutation from './ProductFormMutation'
import { ProductForm } from './types'
import { ProductService } from '../../../../api/services/products'
import { useNotify } from '../../../../components/Notify/hooks'
import { ProductDetailData } from '../../../ProductDetail/types'

interface Props {
  onClose: () => void
  productId: number
}

export default function EditProduct({ onClose, productId }: Props) {
  const { notifyError, notify } = useNotify()
  const [product, setProduct] = useState<ProductDetailData>()

  const initValue = useMemo<ProductForm | undefined>(() => {
    return product
      ? {
          name: product.name,
          price: product.price,
          description: product.description,
          discountedPrice: product.discountedPrice,
          images: product.images,
          thumbnail: product.thumbnail,
          categoryId: product.categoryId,
          productModels: product.productModels,
        }
      : undefined
  }, [product])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.getProductDetail(productId)
        setProduct(res)
      } catch (e) {
        notifyError(e)
      }
    }
    fetchProduct()
  }, [notifyError, productId])

  const onSubmit = useCallback(
    async (data: ProductForm) => {
      try {
        const res = await ProductService.updateProduct(
          {
            ...data,
            price: Number(data.price),
            discountedPrice: Number(data.discountedPrice),
          },
          productId,
        )

        notify(res.message)
        onClose()
      } catch (err) {
        notifyError(err)
      }
    },
    [notify, notifyError, onClose, productId],
  )
  return (
    <>
      {initValue && (
        <ProductFormMutation
          onClose={onClose}
          onSubmit={onSubmit}
          initForm={initValue}
        />
      )}
    </>
  )
}
