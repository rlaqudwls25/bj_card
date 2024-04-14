import styled from '@emotion/styled'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

const FullPageLoader = ({ message }: { message?: string }) => {
  return (
    <FullPageLoaderContainer justify="center" align="center">
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="로켓 이미지"
        />

        <Spacing size={120} />

        {message && (
          <Text typography="t4" bold>
            {message}
          </Text>
        )}
      </Flex>
    </FullPageLoaderContainer>
  )
}

const FullPageLoaderContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default FullPageLoader
