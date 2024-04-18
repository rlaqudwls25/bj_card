import FixedBottomButton from '@/components/common/FixedBottomButton'
import FullPageLoader from '@/components/common/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/contexts/AlertContext'
import { updateCredit } from '@/firebase/credit'
import { userState } from '@/recoil/user'
import { getCreditScore, useCreditCheck } from '@hooks/useCreditCheck'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고 있습니다.',
  [CHECK_STATUS.PROGRESS]: '신용점수 조회 중 입니다.',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다.',
  [CHECK_STATUS.REJECT]: '신용점수 조회에 실패했습니다.',
}

const CreditCheck = () => {
  const [ready, setReady] = useState(true)
  const user = useRecoilValue(userState)

  const { open } = useAlertContext()
  const { data: creditStatus } = useCreditCheck({ enabled: ready })

  const { mutate } = useMutation({
    mutationFn: (creditScore: number) =>
      updateCredit({
        userId: user?.uid as string,
        creditScore,
      }),
  })

  useEffect(() => {
    if (creditStatus === 'COMPLETE') {
      const creditScore = getCreditScore(300, 850)
      mutate(creditScore)
      setReady(false)
    }

    if (creditStatus === 'REJECT') {
      setReady(false)

      open({
        title: '신용점수 조회에 실패했습니다.',
        description: '다시 시도해주세요.',
        buttonLabel: '확인',
        onComplete: () => {
          window.history.back()
        },
      })
    }

    setReady(true)
  }, [creditStatus])

  return (
    <>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[creditStatus ?? 'READY']} />
      {creditStatus === CHECK_STATUS.COMPLETE && (
        <FixedBottomButton
          size="large"
          label="확인"
          onClick={() => window.history.back()}
        />
      )}
    </>
  )
}

export default CreditCheck
