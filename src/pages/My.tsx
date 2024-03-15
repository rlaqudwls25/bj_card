import Button from '@/components/common/Button'
import Flex from '@/components/common/Flex'
import Spacing from '@/components/common/Spacing'
import Text from '@/components/common/Text'
import MyImage from '@/components/my/MyImage'
import { auth } from '@/firebase/firebase'
import { userState } from '@/recoil/user'
import { signOut } from 'firebase/auth'
import { useRecoilValue } from 'recoil'

const MyPage = () => {
  const user = useRecoilValue(userState)

  const onLogout = async () => {
    await signOut(auth)
  }
  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />

      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text>{user?.displayName}</Text>

      <Spacing size={20} />

      <Button onClick={onLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
