import Top from '@/components/card/Top'
import { getCardList } from '../firebase/crad'
import { Suspense, useEffect } from 'react'
import Banner from '@/components/banner/Banner'
import Container from '@/components/common/Container'
import Space from '@/components/common/Space'
import CardList from '@/components/card/CardList'
import ListRow from '@/components/card/ListRow'

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
      <Suspense fallback={<Banner.Skeleton />}>
        <Banner />
      </Suspense>
      <Space padding="12px 0px" />

      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <CardList />
      </Suspense>
    </Container>
  )
}

export default Home
