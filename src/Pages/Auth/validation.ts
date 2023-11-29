import { ObjectSchema, object, string } from 'yup'

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string
  firstName: string
  lastName: string
}

export const loginSchema: ObjectSchema<LoginForm> = object().shape({
  email: string().required('Không được bỏ trống').email('Khong dung dinh dang'),
  password: string().required('Không được bỏ trống'),
})

export const registerSchema: ObjectSchema<RegisterForm> = object().shape({
  email: string().required('Không được bỏ trống').email('Khong dung dinh dang'),
  password: string().required('Không được bỏ trống'),
  confirmPassword: string().required(),
  firstName: string().required(),
  lastName: string().required(),
})
