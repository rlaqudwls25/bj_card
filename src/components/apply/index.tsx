import BasicInfo, { BasicInfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoValues } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { userState } from '@/recoil/user'
import { ApplyValues, APPLY_STATUS } from '@/types/apply'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useRecoilValue(userState)
  const { id } = useParams()

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [step, applyValues, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prev) => prev + 1)
  }

  const handleBasicInfoChange = (values: BasicInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...values,
    }))

    setStep((prev) => prev + 1)
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    setStep((prev) => prev + 1)
  }

  return (
    <>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </>
  )
}

export default Apply
