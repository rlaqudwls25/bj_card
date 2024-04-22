export type TransactionType = 'deposit' | 'withdraw'

export interface Transaction {
  userId: string
  type: TransactionType
  money: number
  remainingAmount: number
  displayName: string
  date: string
  id?: string
}
