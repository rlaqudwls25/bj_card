import Button from '../common/Button'
import { adBanners } from '../../mock/data'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '../../firebase/firebase'

const BannerListAddButton = () => {
  const onClick = async () => {
    const batch = writeBatch(store)
    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, 'BANNER'))
      batch.set(docRef, banner)
    })
    await batch.commit()
  }

  return <Button onClick={onClick}>배너 추가하기</Button>
}

export default BannerListAddButton
