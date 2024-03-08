import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { useState } from 'react'

const Apply = () => {
  const [step, setStep] = useState(0)

  const handleTermsChange = (terms: string[]) => {
    console.log('terms', terms)

    setStep(1)
  }

  return (
    <>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </>
  )
}

export default Apply
