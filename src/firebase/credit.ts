import { Credit } from '@/types/credit'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'

export function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  return setDoc(doc(collection(store, 'CREDIT'), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapshot = await getDoc(doc(collection(store, 'CREDIT'), userId))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Credit),
  }
}
