import { useCallback } from 'react'
import { LoginValues } from '@/types/auth'
import Container from '@/components/common/Container'
import LoginForm from '@/components/login/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { alertState } from '@/recoil/atom'
import Alert from '@/components/common/Alert'
import { FirebaseError } from 'firebase/app'

const Login = () => {
  const navigate = useNavigate()
  const setIsOpenTest = useSetRecoilState(alertState)

  const handleSubmit = useCallback(
    async (formValues: LoginValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error) {
            setIsOpenTest(true)
          }
        }
      }
    },
    [setIsOpenTest, navigate],
  )

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
      <Alert title="계정 정보를 다시 확인해주세요." buttonLabel="확인" />
    </Container>
  )
}

export default Login
