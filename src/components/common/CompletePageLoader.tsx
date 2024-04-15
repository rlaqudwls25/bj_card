import styled from '@emotion/styled'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

const CompletePageLoader = ({
  message,
  imgSrc,
}: {
  message?: string
  imgSrc?: string
}) => {
  return (
    <CompletePageLoaderContainer justify="center" align="center">
      <Flex direction="column" align="center">
        <img src={imgSrc} alt="카드 이미지" width="200px" height="200px" />

        <Spacing size={120} />

        {message && (
          <Text typography="t4" bold>
            {message}
          </Text>
        )}
      </Flex>
    </CompletePageLoaderContainer>
  )
}

const CompletePageLoaderContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default CompletePageLoader
