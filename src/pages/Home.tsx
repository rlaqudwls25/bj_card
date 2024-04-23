import Top from '@/components/card/Top'
import { Suspense } from 'react'
import Banner from '@/components/banner/Banner'
import Container from '@/components/common/Container'
import CardList from '@/components/card/CardList'
import ListRow from '@/components/card/ListRow'
import HomeAccountList from '@/components/account/HomeAccountList'
import Spacing from '@/components/common/Spacing'

import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import CreditScore from '@/components/credit/CreditScore'

const Home = () => {
  return (
    <>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위한 혜택 좋은 카드를 모아놓았습니다."
      />

      <AccountCreditContainer>
        <HomeAccountList />
        <CreditScore />
      </AccountCreditContainer>

      <Container>
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
    </>
  )
}

const AccountCreditContainer = styled.div`
  margin: 24px;
  border-radius: 8px;
  background-color: ${colors.grey200};
`

export default Home
