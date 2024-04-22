import { AccountInfo } from '@/types/account'
import { collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { store } from './firebase'

export async function getTerms(userId: string) {
  const snapshot = await getDoc(doc(collection(store, 'TERMS'), userId))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export function setTerms({
  userId,
  termsId,
}: {
  userId: string
  termsId: string[]
}) {
  return setDoc(doc(collection(store, 'TERMS'), userId), { userId, termsId })
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(doc(collection(store, 'ACCOUNT'), userId))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as AccountInfo),
  }
}

export function createAccount(accountInfo: AccountInfo) {
  return setDoc(
    doc(collection(store, 'ACCOUNT'), accountInfo.userId),
    accountInfo,
  )
}

export function updateAccount(userId: string, money: number) {
  const snapshot = doc(collection(store, 'ACCOUNT'), userId)

  return updateDoc(snapshot, { money })
}
