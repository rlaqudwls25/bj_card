import { getAppliedCard } from '@/firebase/apply'
import { useSuspenseQuery } from '@tanstack/react-query'

function useAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  return useSuspenseQuery({
    queryKey: ['appliedCard', userId, cardId],
    queryFn: () => getAppliedCard({ userId, cardId }),
  })
}

export default useAppliedCard
