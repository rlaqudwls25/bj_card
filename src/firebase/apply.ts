import { ApplyValues } from '@/types/apply'
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { store } from './firebase'

// 카드 신청
export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, 'APPLY'), applyValues)
}

// 카드 신청 상태 update
export async function updateApplyStatus({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, 'APPLY'),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, 'APPLY'),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // user가 신청한 카드가 없을 경우
  if (snapshot.docs.length === 0) {
    return null
  }

  const applied = snapshot.docs[0]

  return applied.data() as ApplyValues
}
