import { CHECK_STATUS } from '@/constants/credit'
import { useQuery } from '@tanstack/react-query'

interface useCreditCheckProps {
  enabled?: boolean
}

export const useCreditCheck = ({ enabled }: useCreditCheckProps) => {
  const creditCheck = useQuery({
    queryKey: ['creditCheck'],
    queryFn: () => getCreditCheck(),
    enabled,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  })

  return creditCheck
}

function getCreditCheck() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  return status
}

export function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
