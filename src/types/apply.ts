import { User } from './auth'

export interface Term {
  id: string
  title: string
}

export interface ApplyValues {
  userId: User['uid']
  terms: Term['id'][]
  appliedAt: Date
  cardId: string
  salary: string
  creditScore: string
  payDate: string
}

export interface Option {
  label: string
  value: string | number
}