import { useCallback } from 'react'
import { LoginValues } from '@/types/auth'
import Container from '@/components/common/Container'
import LoginForm from '@/components/login/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/contexts/AlertContext'

const Login = () => {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const handleSubmit = useCallback(
    async (formValues: LoginValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error) {
            open({
              title: '계정 정보를 다시 확인해주세요.',
              buttonLabel: '확인',
              onComplete: () => {},
            })
          }
        }
      }
    },
    [open, navigate],
  )

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default Login
