import { colors } from '@/styles/colors'
import Flex from '@common/Flex'
import Text from '@common/Text'
import styled from '@emotion/styled'

interface TopProps {
  title: string
  subTitle: string
}

const Top = ({ title, subTitle }: TopProps) => {
  return (
    <TopContainer direction="column" gap={10}>
      <Text bold typography="t4" color="white">
        {title}
      </Text>
      <Text typography="t7" color="white">
        {subTitle}
      </Text>
    </TopContainer>
  )
}

const TopContainer = styled(Flex)`
  padding: 24px;
  margin: 24px;
  border-radius: 8px;
  background-color: ${colors.blue600};
`

export default Top
