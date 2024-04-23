import { Transaction, TransactionFilterType } from '@/types/transaction'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
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
  filter = 'all',
}: {
  pageParam?: any
  userId: string
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ filter, pageParam, userId })

  const transactionSnapshot = await getDocs(transactionQuery)

  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const transactionData = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { transactionData, lastVisible }
}

function generateQuery({
  userId,
  pageParam,
  filter,
}: {
  userId: string
  pageParam?: QuerySnapshot<any>
  filter?: TransactionFilterType
}) {
  const baseQuery = query(
    collection(store, 'TRANSACTION'),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(10),
  )

  if (filter !== 'all') {
    if (pageParam === undefined) {
      return query(baseQuery, where('type', '==', filter))
    }

    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam === undefined) {
      return baseQuery
    }

    return query(baseQuery, startAfter(pageParam))
  }
}
