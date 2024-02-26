import { Banner } from '@/types/banner'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getBannerList() {
  const bannerList = await getDocs(collection(store, 'BANNER'))

  const bannerListData = bannerList.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Banner),
  }))

  return bannerListData
}
