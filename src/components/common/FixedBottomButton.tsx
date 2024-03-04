import Button from './Button'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@/styles/colors'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  return (
    <Container>
      <Button
        full
        size="medium"
        onClick={onClick}
        css={ButtonStyle}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>
  )
}

const slideUp = keyframes`
   from {
    transform: translateY(100%);
}
    to {
    transform: translateY(0);
}
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 16px;
  animation: ${slideUp} 0.4s forwards;
`

const ButtonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton
