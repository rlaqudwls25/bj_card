import Flex from '@/components/common/Flex'
import Text from '@/components/common/Text'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import Spacing from '@/components/common/Spacing'
import ScoreChart from '@/components/common/ScoreChart'
import ListRow from '@/components/card/ListRow'
import { userState } from '@/recoil/user'
import { useRecoilValue } from 'recoil'
import { useAlertContext } from '@/contexts/AlertContext'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { getCredit } from '@/firebase/credit'

const CreditPage = () => {
  const 신용점수를조회했는가 = false

  const user = useRecoilValue(userState)
  const navigate = useNavigate()

  const { open } = useAlertContext()

  const { data: creditData } = useQuery({
    queryKey: ['credit'],
    queryFn: () => getCredit(user?.uid as string),
    enabled: user !== null,
  })

  const onClickCreditCheck = () => {
    if (user === null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        buttonLabel: '확인',
        onComplete: () => {
          navigate('/login')
        },
      })

      return
    }

    navigate('/credit/check')
  }

  const goToCardList = () => {
    navigate('/')
  }

  return (
    <>
      <Spacing size={40} />
      <Flex direction="column" align="center" gap={10}>
        <Text typography="t4" bold textAlign="center">
          {creditData ? (
            `내 신용점수는 ${creditData.creditScore} 입니다.`
          ) : (
            <>
              내 신용점수를 <br /> 조회하고 관리해보세요.
            </>
          )}
        </Text>

        {creditData && <ScoreChart score={creditData?.creditScore} />}
      </Flex>

      <ListBox>
        {creditData ? (
          <>
            <ListRow
              contents={
                <ListRow.Text
                  title="추천카드"
                  subTitle="나에게 맞는 카드 찾아보기"
                />
              }
              withArrow
              onClick={goToCardList}
            />
          </>
        ) : (
          <>
            <ListRow
              contents={
                <ListRow.Text
                  title="정확한 신용평점"
                  subTitle="대표 신용평가 기관의 데이터로 관리해요"
                />
              }
            />
            <ListRow
              contents={
                <ListRow.Text
                  title="신용점수 무료조회"
                  subTitle="신용점수에 영향없이 무료로 조회"
                />
              }
            />
          </>
        )}

        <FixedBottomButton
          size="large"
          label={creditData ? '신용점수 올리기' : '30초만에 신용 조회하기'}
          onClick={onClickCreditCheck}
        />
      </ListBox>
    </>
  )
}

const ListBox = styled.div`
  margin: 0px 10px;
`

export default CreditPage
