import { Transaction } from '@/types/transaction'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, 'TRANSACTION')), newTransaction)
}

export async function getTransaction({
  pageParam,
  userId,
}: {
  pageParam?: any
  userId: string
}) {
  const transactionQuery =
    pageParam === undefined
      ? query(
          collection(store, 'TRANSACTION'),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          limit(10),
        )
      : query(
          collection(store, 'TRANSACTION'),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          startAfter(pageParam),
          limit(10),
        )

  const transactionSnapshot = await getDocs(transactionQuery)

  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const transactionData = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { transactionData, lastVisible }
}
