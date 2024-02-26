import Flex from '@common/Flex'
import Text from '@common/Text'

interface TopProps {
  title: string
  subTitle: string
}

const Top = ({ title, subTitle }: TopProps) => {
  return (
    <Flex direction="column">
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

export default Top
