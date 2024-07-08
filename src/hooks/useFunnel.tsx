import React, { isValidElement } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'
import { useLocalStorage } from './useLocalStorage'

type StepName = string

interface StepProps {
  children: React.ReactNode
  name: string
}

type UseFunnelResult = [
  React.FC<{ children: React.ReactNode }>,
  (step: StepName) => void,
  StepName,
  number,
]

const STEP_STORAGE_KEY = 'funnel-step'

export const useFunnel = (steps: readonly StepName[]): UseFunnelResult => {
  const [currentStep, setCurrentStep] = useLocalStorage<StepName>(
    STEP_STORAGE_KEY,
    steps[0],
  )

  const Funnel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { open } = useAlertContext()

    const validElement = React.Children.toArray(children)
      .filter(isValidElement)
      .filter((i) => steps.includes((i.props as StepProps).name))

    const targetStep = validElement.find(
      (child) => (child.props as StepProps).name === currentStep,
    )

    if (targetStep === null) {
      open({
        title: `${currentStep}이 존재하지 않습니다.`,
        buttonLabel: '확인',
        onComplete: () => {},
      })
    }

    return <>{targetStep}</>
  }

  const setStep = (step: StepName) => {
    if (steps.includes(step)) {
      setCurrentStep(step)
    }
  }

  const currentStepIndex = steps.indexOf(currentStep)

  return [Funnel, setStep, currentStep, currentStepIndex]
}
