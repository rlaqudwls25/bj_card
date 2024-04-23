import { TransactionFilterType } from '@/types/transaction'

export const TRANSACTION_FILTER: {
  label: string
  value: TransactionFilterType
}[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]
