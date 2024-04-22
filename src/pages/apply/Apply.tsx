import Apply from '@/components/apply'
import { useApplyCardMutation } from '@/hooks/useApplyCardMutation'
import { useCallback, useEffect, useState } from 'react'
import { usePollApplyStatus } from '@/hooks/usePollApplyStatus'
import { ApplyValues, APPLY_STATUS } from '@/types/apply'

import { updateApplyStatus } from '@/firebase/apply'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/recoil/user'
import useAppliedCard from '../../hooks/useAppliedCard'
import { useAlertContext } from '@/contexts/AlertContext'
import FullPageLoader from '@/components/common/FullPageLoader'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비중입니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
}

const ApplyPage = () => {
  const user = useRecoilValue(userState)
  const { id } = useParams()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  const { open } = useAlertContext()

  const { data: status, isLoading } = usePollApplyStatus({ enabled: ready })

  const { data: appliedCard } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id as string,
  })

  const handleState = useCallback(async () => {
    if (status === APPLY_STATUS.COMPLETE) {
      await updateApplyStatus({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    }
    if (status === (APPLY_STATUS.REJECT as string)) {
      await updateApplyStatus({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    }
  }, [status, id, user?.uid, navigate])

  useEffect(() => {
    if (appliedCard === null) {
      return
    }

    if (appliedCard?.status === APPLY_STATUS.COMPLETE) {
      open({
        title: '이미 발급이 완료된 카드입니다.',
        buttonLabel: '확인',
        onComplete: () => {
          window.history.back()
        },
      })
    }

    setReady(true)
  }, [appliedCard])

  useEffect(() => {
    handleState()
  }, [status, id, user?.uid, handleState])

  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      setReady(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (appliedCard !== null && appliedCard?.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (ready || isLoading) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return (
    <>
      <Apply onSubmit={mutate} />
    </>
  )
}

export default ApplyPage
