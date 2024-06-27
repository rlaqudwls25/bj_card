interface StepProps {
  children: React.ReactNode
  name: string
}

export const FunnelStep = ({ children }: StepProps) => {
  return <>{children}</>
}
