import { Card } from '@/types/card'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getCardList() {
  const cardList = await getDocs(collection(store, 'CARD'))

  const cardListData = cardList.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return cardListData
}
