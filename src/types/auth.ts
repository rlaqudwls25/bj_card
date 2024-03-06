export interface FormValues {
  email: string
  password: string
  passwordConfirm: string
  name: string
}

export type LoginValues = Pick<FormValues, 'email' | 'password'>

export interface User {
  uid: string
  email: string
  displayName: string
}
