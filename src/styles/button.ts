import { css } from '@emotion/react'

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

export type ButtonSize = keyof typeof buttonSize
