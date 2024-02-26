import Button from '../common/Button'
import { card_list } from '../../mock/data'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '../../firebase/firebase'

const CardListAddButton = () => {
  const onClick = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card) => {
      const docRef = doc(collection(store, 'CARD'))
      batch.set(docRef, card)
    })
    await batch.commit()
  }

  return <Button onClick={onClick}>카드 추가하기</Button>
}

export default CardListAddButton
