import { applyCard } from '@/firebase/apply'
import { ApplyValues } from '@/types/apply'
import { useMutation } from '@tanstack/react-query'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

export function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      alert('카드 신청에 실패했습니다.')
      onError()
    },
  })
}
