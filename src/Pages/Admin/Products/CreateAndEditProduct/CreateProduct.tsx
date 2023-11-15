import { useCallback } from 'react'
import { ProductService } from '../../../../api/services/products'
import { useNotify } from '../../../../components/Notify/hooks'
import ProductFormMutation from './ProductFormMutation'
import { ProductForm } from './types'

interface Props {
  onClose: () => void
}

export default function CreateProduct({ onClose }: Props) {
  const { notifyError, notify } = useNotify()

  const onSubmit = useCallback(async (data: ProductForm) => {
    try {
      const res = await ProductService.createProduct({
        ...data,
        price: Number(data.price),
      })

      notify(res.message)
      onClose()
    } catch (err) {
      notifyError(err)
    }
  }, [])

  return <ProductFormMutation onClose={onClose} onSubmit={onSubmit} />
}
