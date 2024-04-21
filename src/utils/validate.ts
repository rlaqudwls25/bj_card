import { AccountFormValue } from '@/types/account'
import { FormValues } from '@/types/auth'

export const validate = {
  isEmail: (email: string) => {
    const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return emailReg.test(email)
  },
  isPassword: (password: string) => {
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    return passwordReg.test(password)
  },

  isPhone: (phone: string) => {
    const phoneReg = /^(010)-?\d{4}-?\d{4}$/
    return phoneReg.test(phone)
  },
}

type FormValue = AccountFormValue & FormValues

export const validationForm = <T extends Partial<FormValue>>(
  formValue: T,
): Partial<FormValue> => {
  let error: Partial<FormValue> = {}

  if (!formValue.name) {
    error.name = '이름을 입력해주세요.'
  }

  if (formValue.phone && !validate.isPhone(formValue.phone)) {
    error.phone = '전화번호 형식이 올바르지 않습니다.'
  }

  if (formValue.email && !validate.isEmail(formValue.email)) {
    error.email = '이메일 형식이 올바르지 않습니다.'
  }

  if (!formValue.accountNumber) {
    error.accountNumber = '계좌번호를 입력해주세요.'
  }

  return error
}
