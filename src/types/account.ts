export interface AccountTerms {
  id: string
  title: string
  required: boolean
}

export interface AccountFormValue {
  name: string
  phone: string
  email: string
  bankName: string
  accountNumber: string
}

interface BaseForm {
  id: string
  label: string
  required: boolean
  helpMessage?: string
}

interface TextFieldForm extends BaseForm {
  type: 'text'
}

interface SelectForm extends BaseForm {
  type: 'select'
  options: { label: string; value: string }[]
}

export type AccountForm = TextFieldForm | SelectForm

type AccountStatus = 'READY' | 'COMPLETE'

export interface AccountInfo extends AccountFormValue {
  status: AccountStatus
  userId: string
  money: number
}
