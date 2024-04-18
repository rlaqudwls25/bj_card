import Top from '@/components/card/Top'
import { getCardList } from '../firebase/crad'
import { Suspense, useEffect } from 'react'
import Banner from '@/components/banner/Banner'
import Container from '@/components/common/Container'
import CardList from '@/components/card/CardList'
import ListRow from '@/components/card/ListRow'
import Account from '@/components/account/Account'
import Spacing from '@/components/common/Spacing'
import CreditScore, {
  CreditScoreSkeleton,
} from '@/components/account/CreditScore'

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

      <Spacing size={24} />

      <Account />

      <Spacing size={2} margin={'20'} backgroundColor="grey" />

      <Suspense fallback={<CreditScoreSkeleton />}>
        <CreditScore />
      </Suspense>

      <Spacing size={2} margin={'20'} backgroundColor="grey" />

      <Suspense fallback={<Banner.Skeleton />}>
        <Banner />
      </Suspense>

      <Spacing size={24} />

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
