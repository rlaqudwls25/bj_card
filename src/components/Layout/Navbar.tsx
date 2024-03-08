import { userState } from '@/recoil/user'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Button from '../common/Button'
import Container from '../common/Container'
import Flex from '../common/Flex'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

const Navbar = () => {
  const { pathname } = useLocation()
  const user = useRecoilValue(userState)

  const isShowLoginButton = !['/signup', '/login'].includes(pathname)

  const onLogout = async () => {
    await signOut(auth)
  }

  const renderButton = () => {
    if (user && isShowLoginButton) {
      return <Button onClick={onLogout}>로그아웃</Button>
    }

    if (isShowLoginButton) {
      return (
        <Link to="/login">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }
  }

  return (
    <Container position="sticky" border>
      <Flex justify="space-between" align="center">
        <Link to="/">
          <HomeIcon />
        </Link>
        {renderButton()}
      </Flex>
    </Container>
  )
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8913288,10 L11.8900003,3.99867157 L5.88867192,10 L5.89001465,10 L5.89001465,20 L17.8900146,20 L17.8900146,10 L17.8913288,10 Z M19.8900146,11.9986859 L19.8900146,20 C19.8900146,21.1045695 18.9945841,22 17.8900146,22 L5.89001465,22 C4.78544515,22 3.89001465,21.1045695 3.89001465,20 L3.89001465,11.9986573 L2.41319817,13.4754737 L1,12.0622756 L10.4769858,2.5852898 C11.2573722,1.8049034 12.5226285,1.8049034 13.3030149,2.5852898 L22.7800007,12.0622756 L21.3668025,13.4754737 L19.8900146,11.9986859 Z"
        fill-rule="evenodd"
      />
    </svg>
  )
}
export default Navbar
