import CompletePageLoader from '@/components/common/CompletePageLoader'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import Flex from '@/components/common/Flex'
import Text from '@/components/common/Text'
import { parse } from 'qs'

const ApplyDone = () => {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  })

  const isRender = () => {
    return (
      <>
        {success ? (
          <CompletePageLoader
            message="카드 신청이 완료되었습니다."
            imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-37-55_512.gif"
          />
        ) : (
          <CompletePageLoader
            message="카드 신청에 실패했습니다."
            imgSrc="https://previews.123rf.com/images/lkeskinen/lkeskinen1708/lkeskinen170811121/84682345-%EC%8B%A4%ED%8C%A8-%EB%8F%84%EC%9E%A5.jpg"
          />
        )}
      </>
    )
  }

  return (
    <Flex>
      <Text>{isRender()}</Text>

      <FixedBottomButton
        size="large"
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
