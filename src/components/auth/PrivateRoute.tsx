import { userState } from '@/recoil/user'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(userState)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
