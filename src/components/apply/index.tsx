import BasicInfo, { BasicInfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoValues } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { userState } from '@/recoil/user'
import { ApplyValues, APPLY_STATUS } from '@/types/apply'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import ProgressBar from '../common/ProgressBar'
import { FunnelStep } from '@/components/common/Funnel'
import { useFunnel } from '@/hooks/useFunnel'

const LAST_STEP = 3
const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useRecoilValue(userState)
  const { id } = useParams()

  const storageKey = `apply-${user?.uid}-${id}`

  const [Funnel, setStep, currentStep, stepCount] = useFunnel([
    'terms',
    'basicInfo',
    'cardInfo',
    'complete',
  ] as const)

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied === null) {
      return {
        userId: user?.uid,
        cardId: id,
      }
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    if (currentStep === 'complete') {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep('basicInfo')
  }

  const handleBasicInfoChange = (values: BasicInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...values,
    }))
    setStep('cardInfo')
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    setStep('complete')
  }

  return (
    <>
      <ProgressBar progress={stepCount / LAST_STEP} />

      <Funnel>
        <FunnelStep name="terms">
          <Terms onNext={handleTermsChange} />
        </FunnelStep>
        <FunnelStep name="basicInfo">
          <BasicInfo onNext={handleBasicInfoChange} />
        </FunnelStep>
        <FunnelStep name="cardInfo">
          <CardInfo onNext={handleCardInfoChange} />
        </FunnelStep>
      </Funnel>
    </>
  )
}

export default Apply
