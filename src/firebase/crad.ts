import { Card } from '@/types/card'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

/**
 * @param pageParam
 * @returns 리스트에 맨 마지막 요소
 */

export async function getCardList(pageParam?: any): Promise<{
  cardListData: Card[]
  lastCardIdx: QueryDocumentSnapshot<any>
}> {
  const cardQuery =
    pageParam === undefined
      ? query(collection(store, 'CARD'), limit(10))
      : query(
          collection(store, 'CARD'),
          orderBy('corpName'),
          pageParam && startAfter(pageParam),
          limit(10),
        )

  const cardList = await getDocs(cardQuery)

  const lastCardIdx = cardList.docs[cardList.docs.length - 1]

  const cardListData = cardList.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { cardListData, lastCardIdx }
}
