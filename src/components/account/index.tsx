import { useAlertContext } from '@/contexts/AlertContext'
import { useAccount } from '@/hooks/useAccount'
import { userState } from '@/recoil/user'
import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Button from '../common/Button'
import Flex from '../common/Flex'
import Text from '../common/Text'

const Account = () => {
  const accountList = useAccount()
  const navigate = useNavigate()
  const user = useRecoilValue(userState)
  const { open } = useAlertContext()

  const goToAccount = () => {
    if (!user) {
      open({
        title: '로그인이 필요합니다.',
        buttonLabel: '확인',
        onComplete: () => navigate('/login'),
      })
    }

    if (user) {
      navigate('/account')
    }
  }

  if (!accountList) {
    return (
      <>
        <AccountContainer justify="space-between">
          <Flex direction="column" gap={8}>
            <Text typography="t5" bold style={{ whiteSpace: 'pre-wrap' }}>
              {'계좌 개설이\n더 쉽고 빨라졌어요'}
            </Text>
            <Button size="small" onClick={goToAccount}>
              {'3분만에 개설하기'}
            </Button>
          </Flex>
          <img
            src="https://cdn0.iconfinder.com/data/icons/investing-and-finance-1/240/cash-256.png"
            alt="돈 이미지"
            width="80px"
            height="80px"
          />
        </AccountContainer>
      </>
    )
  }

  if (accountList.status === 'READY') {
    return (
      <AccountContainer justify="space-between">
        <Flex direction="column" gap={8}>
          <Text typography="t5" bold style={{ whiteSpace: 'pre-wrap' }}>
            계좌개설 심사중입니다.
          </Text>
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

  return (
    <AccountContainer justify="space-between" align="center">
      <Flex direction="column" gap={2}>
        <Text
          typography="t6"
          color="black"
        >{`${accountList.name} 회원님의 자산`}</Text>
        <Text typography="t3" bold>
          {addDelimiter(accountList.money)}원
        </Text>
      </Flex>
      <Button onClick={() => navigate('account')}>분석</Button>
    </AccountContainer>
  )
}

const AccountContainer = styled(Flex)`
  padding: 24px;
  border-radius: 6px;
`

export default Account
