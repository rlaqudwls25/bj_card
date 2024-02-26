import Top from '@/components/card/Top'

import { getCardList } from '../firebase/crad'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    getCardList()
  }, [])

  return (
    <section>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위한 혜택 좋은 카드를 모아놓았습니다."
      />
    </section>
  )
}

export default Home
