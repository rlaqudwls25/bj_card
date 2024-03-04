import Container from '@/components/common/Container'
import SignupForm from '@/components/signup/Form'
import { auth, store } from '@/firebase/firebase'
import { FormValues } from '@/types/auth'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

const SignUp = () => {
  // handleSubmit은 완성된 formData만 궁금하기 때문에 관심사가 다르다.
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(store, 'USER'), user.uid), newUser)
  }

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default SignUp
