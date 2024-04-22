import { Transaction } from '@/types/transaction'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, 'TRANSACTION')), newTransaction)
}
