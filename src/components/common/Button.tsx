import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  buttonColor,
  ButtonColor,
  buttonSize,
  ButtonSize,
  buttonToggleColor,
} from '@styles/button'
import { CSSProperties } from 'react'

interface ButtonProps {
  color?: ButtonColor
  toggleBackgroundColor?: CSSProperties['backgroundColor']
  size: ButtonSize
  full?: boolean
  disabled?: boolean
  isToggle?: boolean
}

const Button = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },

  ({ color = 'primary', isToggle }) =>
    isToggle ? buttonToggleColor[color] : buttonColor[color],
  ({ size = 'small' }) => buttonSize[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,

  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.25;
          cursor: not-allowed;
        `
      : undefined,
)

export default Button
