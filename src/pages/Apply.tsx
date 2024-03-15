import BasicInfo, { BasicInfoValues } from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues } from '@/types/apply'
import { useState } from 'react'

const Apply = () => {
  const [step, setStep] = useState(1)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setStep(1)
  }

  const handleBasicInfoChange = (values: BasicInfoValues) => {
    setStep(2)
  }

  return (
    <>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo />}
    </>
  )
}

export default Apply
