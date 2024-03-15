import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userState } from '@/recoil/user'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setUser = useSetRecoilState(userState)

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        imgURL: user.photoURL || '',
      })
    } else {
      setUser(null)
    }
    setIsAuthenticated(true)
  })

  if (!isAuthenticated) return <div>Loading...</div>

  return <>{children}</>
}

export default AuthGuard
