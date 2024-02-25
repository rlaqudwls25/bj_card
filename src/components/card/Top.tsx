import Flex from '@common/Flex'
import Text from '@common/Text'
import { css } from '@emotion/react'

interface TopProps {
  title: string
  subTitle: string
}

const Top = ({ title, subTitle }: TopProps) => {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`
export default Top
