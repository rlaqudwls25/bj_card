import { userState } from '@/recoil/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { getTransaction } from '@/firebase/transaction'
import { Transaction } from '@/types/transaction'
import { QueryDocumentSnapshot } from 'firebase/firestore'

export function useTransactions() {
  const user = useRecoilValue(userState)

  return useInfiniteQuery<{
    transactionData: Transaction[]
    lastVisible: QueryDocumentSnapshot<any>
  }>({
    queryKey: ['transactions', user?.uid],
    queryFn: ({ pageParam }) =>
      getTransaction({
        userId: user?.uid as string,
        pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })
}
