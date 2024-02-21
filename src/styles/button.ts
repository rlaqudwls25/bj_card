import { css } from '@emotion/react'
import { colors } from './colors'

export const buttonSize = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 17px;
    padding: 12px 20px;
  `,
}

export const buttonColor = {
  error: css`
    color: ${colors.white};
    background-color: ${colors.red};
  `,
  primary: css`
    color: ${colors.white};
    background-color: ${colors.blue};
  `,
  success: css`
    color: ${colors.white};
    background-color: ${colors.green};
  `,
}

export const buttonToggleColor = {
  error: css`
    color: ${colors.red};
    background-color: ${colors.white};
  `,
  primary: css`
    color: ${colors.blue};
    background-color: ${colors.white};
  `,
  success: css`
    color: ${colors.green};
    background-color: ${colors.white};
  `,
}

export type ButtonSize = keyof typeof buttonSize
export type ButtonColor = keyof typeof buttonColor
