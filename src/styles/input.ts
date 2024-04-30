import { css } from '@emotion/react'

export const inputSize = {
  small: css`
    width: 30%;
  `,
  medium: css`
    width: 50%;
  `,
  large: css`
    width: 100%;
  `,
}

export type InputSize = keyof typeof inputSize
