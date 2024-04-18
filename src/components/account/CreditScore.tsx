import Flex from '../common/Flex'
import Text from '../common/Text'
import Button from '../common/Button'
import ScoreChart from '../common/ScoreChart'
import Skeleton from '../common/Skeleton'
import { useNavigate } from 'react-router-dom'

const CreditScore = () => {
  const navigate = useNavigate()

  const goToCredit = () => {
    navigate('/credit')
  }

  return (
    <Flex justify="space-between" align="center">
      <Flex direction="column" gap={8}>
        <Text typography="t5" bold>
          신용점수를 올려보세요
        </Text>
        <Button onClick={goToCredit}>신용점수 보러가기</Button>
      </Flex>
      <ScoreChart width={80} height={80} score={100} />
    </Flex>
  )
}

export default CreditScore

export const CreditScoreSkeleton = () => {
  return (
    <Flex>
      <Flex direction="column" gap={8}>
        <Skeleton width={100} height={50} />

        <Skeleton width={100} height={30} />
      </Flex>
    </Flex>
  )
}
