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
  email: string()
    .required('Khong duoc bo trong nha')
    .email('Khong dung dinh dang'),
  password: string().required('Khong duoc bo trong nha'),
})

export const registerSchema: ObjectSchema<RegisterForm> = object().shape({
  email: string()
    .required('Khong duoc bo trong nha')
    .email('Khong dung dinh dang'),
  password: string().required('Khong duoc bo trong nha'),
  confirmPassword: string().required(),
  firstName: string().required(),
  lastName: string().required(),
})
