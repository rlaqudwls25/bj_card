import Top from '@/components/card/Top'

import { getCardList } from '../firebase/crad'
import { useEffect } from 'react'
import Banner from '@/components/banner/Banner'
import Container from '@/components/common/Container'
import Space from '@/components/common/Space'

const Home = () => {
  useEffect(() => {
    getCardList()
  }, [])

  return (
    <Container>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위한 혜택 좋은 카드를 모아놓았습니다."
      />

      <Space padding="24px 0px" />
      <Banner />
    </Container>
  )
}

export default Home
