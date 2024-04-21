import { AccountInfo } from '@/types/account'
import { collection, setDoc, doc } from 'firebase/firestore'
import { store } from './firebase'

export function setTerms({
  userId,
  termsId,
}: {
  userId: string
  termsId: string[]
}) {
  return setDoc(doc(collection(store, 'ACCOUNT'), userId), { userId, termsId })
}

export function getTerms(userId: string) {
  return doc(collection(store, 'ACCOUNT'), userId)
}

export function createAccount(accountInfo: AccountInfo) {
  return setDoc(
    doc(collection(store, 'ACCOUNT'), accountInfo.userId),
    accountInfo,
  )
}
