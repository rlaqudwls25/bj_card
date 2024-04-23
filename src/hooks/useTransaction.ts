import { userState } from '@/recoil/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { getTransaction } from '@/firebase/transaction'
import { Transaction, TransactionFilterType } from '@/types/transaction'
import { QueryDocumentSnapshot } from 'firebase/firestore'

export function useTransactions({
  filter,
}: {
  filter?: TransactionFilterType
} = {}) {
  console.log('filter', filter)
  const user = useRecoilValue(userState)

  return useInfiniteQuery<{
    transactionData: Transaction[]
    lastVisible: QueryDocumentSnapshot<any>
  }>({
    queryKey: ['transactions', user?.uid, filter],
    queryFn: ({ pageParam }) =>
      getTransaction({
        userId: user?.uid as string,
        pageParam,
        filter,
      }),
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })
}
