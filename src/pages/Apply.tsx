import Apply from '@/components/apply'
import { useApplyCardMutation } from '@/hooks/useApplyCardMutation'
import { useCallback, useEffect, useState } from 'react'
import { usePollApplyStatus } from '@/hooks/usePollApplyStatus'
import { APPLY_STATUS } from '@/types/apply'

import { updateApplyStatus } from '@/firebase/apply'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/recoil/user'

const ApplyPage = () => {
  const user = useRecoilValue(userState)
  const { id } = useParams()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  const { data, isLoading } = usePollApplyStatus({ enabled: ready })

  const handleState = useCallback(async () => {
    if (data === APPLY_STATUS.COMPLETE) {
      await updateApplyStatus({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })

      navigate('/apply/done?success=true', { replace: true })
    }

    if (data === (APPLY_STATUS.REJECT as string)) {
      await updateApplyStatus({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })

      navigate('/apply/done?success=false', { replace: true })
    }
  }, [data, id, user?.uid, navigate])

  useEffect(() => {
    handleState()
  }, [data, id, user?.uid, handleState])

  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      setReady(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (ready || isLoading) {
    return <div>로딩중</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
