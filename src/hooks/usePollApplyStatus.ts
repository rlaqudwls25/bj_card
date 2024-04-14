import { useQuery } from '@tanstack/react-query'
import { APPLY_STATUS } from '@/types/apply'

interface usePollApplyStatusProps {
  onSuccess?: () => void
  onError?: () => void
  enabled: boolean
}

export function usePollApplyStatus({ enabled }: usePollApplyStatusProps) {
  return useQuery({
    queryKey: ['applyStatus'],
    queryFn: () => getApplyStatus(),
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  })
}

function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.')
  }

  return status
}
