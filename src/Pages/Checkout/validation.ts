import { ObjectSchema, object, string } from 'yup'

export interface CheckoutForm {
  name: string
  email: string
  phone: string
  address: string
  province: string
  district: string
  paymentMethod: string
}

export const checkoutSchema: ObjectSchema<CheckoutForm> = object().shape({
  name: string().required('Không được bỏ trống'),
  email: string().required('Không được bỏ trống').email('Không đúng định dạng'),
  phone: string().required('Không được bỏ trống'),
  address: string().required('Không được bỏ trống'),
  province: string().required('Không được bỏ trống'),
  district: string().required('Không được bỏ trống'),
  paymentMethod: string().required('Không được bỏ trống').default('COD'),
})
