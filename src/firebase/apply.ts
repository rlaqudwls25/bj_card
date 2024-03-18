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
