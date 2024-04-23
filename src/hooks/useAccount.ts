import { useSuspenseQuery } from '@tanstack/react-query'

import { getAccount } from '@/firebase/account'
import { useRecoilValue } from 'recoil'
import { userState } from '@/recoil/user'

export function useAccount() {
  const user = useRecoilValue(userState)

  const { data: accountList } = useSuspenseQuery({
    queryKey: ['account', user?.uid],
    queryFn: () => getAccount(user?.uid as string),
  })

  return accountList
}
