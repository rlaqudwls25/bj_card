import { buttonSize, ButtonSize } from '@/styles/button'
import { colors, Colors } from '@/styles/colors'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface ButtonProps {
  color?: Colors
  toggleColor?: CSSProperties['color']
  backgroundColor?: Colors
  toggleBackgroundColor?: CSSProperties['backgroundColor']
  size: ButtonSize
  full?: boolean
  disabled?: boolean
}

const Button = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },

  ({ color = 'black' }) => colors[color],
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
          opcity: 0.25;
          cursor: not-allowed;
        `
      : undefined,
)

export default Button
