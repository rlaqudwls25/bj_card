export type TransactionType = 'deposit' | 'withdraw'
export type TransactionFilterType = 'all' | TransactionType

export interface Transaction {
  userId: string
  type: TransactionType
  money: number
  remainingAmount: number
  displayName: string
  date: string
  id?: string
}
