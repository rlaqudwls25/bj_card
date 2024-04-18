import { useAlertContext } from '@/contexts/AlertContext'
import { userState } from '@/recoil/user'
import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import Button from '../common/Button'
import Flex from '../common/Flex'
import Text from '../common/Text'

const Account = () => {
  const hasAccount = false

  const user = useRecoilValue(userState)

  const { open } = useAlertContext()

  const createAccount = () => {
    open({
      title: '시스템 점검 중 입니다.',
      description: '다음에 다시 이용해주세요.',
      buttonLabel: '확인',
      onComplete: () => {},
    })
  }

  if (hasAccount) {
    return (
      <AccountContainer justify="space-between" align="center">
        <Flex direction="column" gap={2}>
          <Text
            typography="t6"
            color="grey"
          >{`${user?.displayName} 회원님의 자산`}</Text>

          <Text typography="t3" bold>
            7,000원
          </Text>
        </Flex>
        <Button>분석</Button>
      </AccountContainer>
    )
  }

  const 계좌계설상태 = 'READY'
  const title =
    계좌계설상태 !== 'READY'
      ? '만들고 있는\n계좌가 있어요!'
      : '계좌 개설이\n더 쉽고 빨라졌어요'

  const buttonLabel =
    계좌계설상태 !== 'READY' ? '이어 만들기' : '3분만에 개설하기'
  return (
    <AccountContainer justify="space-between">
      <Flex direction="column" gap={8}>
        <Text typography="t5" bold style={{ whiteSpace: 'pre-wrap' }}>
          {title}
        </Text>
        <Button size="small" onClick={createAccount}>
          {buttonLabel}
        </Button>
      </Flex>
      <img
        src="https://cdn0.iconfinder.com/data/icons/investing-and-finance-1/240/cash-256.png"
        alt="돈 이미지"
        width="80px"
        height="80px"
      />
    </AccountContainer>
  )
}

const AccountContainer = styled(Flex)`
  border-radius: 6px;
`

export default Account
