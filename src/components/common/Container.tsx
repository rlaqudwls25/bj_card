import { colors, Colors } from '@/styles/colors'
import styled from '@emotion/styled'

interface ContainerProps {
  children: React.ReactNode
  padding?: string
  position?: 'fixed' | 'absolute' | 'relative' | 'sticky'
  bgColor?: Colors
  border?: boolean
}

const Container = ({ children, position, bgColor }: ContainerProps) => {
  return (
    <ContainerBox position={position} bgColor={bgColor} border>
      {children}
    </ContainerBox>
  )
}

const ContainerBox = styled.section<ContainerProps>(
  ({ padding }) => ({
    padding: padding || '24px',
  }),

  ({ position, border }) => ({
    position,
    ...(position === 'sticky' && {
      top: 0,
      left: 0,
      zIndex: 12,
      borderBottom: border ? `2px solid ${colors.grey}` : 'none',
    }),
  }),
  ({ bgColor = 'white' }) => ({
    backgroundColor: colors[bgColor],
  }),
)

export default Container
