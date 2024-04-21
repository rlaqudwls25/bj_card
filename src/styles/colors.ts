import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --blue600: #3d71f9;
    --blue400: #8baaf8;
    --blue300: #c5d5fc;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
    --grey600: #272d3a;
    --grey500: #6e7a93;
    --grey400: #a0a8bd;
    --grey300: #c8ceda;
    --grey200: #f3f4f9;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  blue600: 'var(--blue600)',
  blue400: 'var(--blue400)',
  blue300: 'var(--blue300)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
  grey600: 'var(--grey600)',
  grey500: 'var(--grey500)',
  grey400: 'var(--grey400)',
  grey300: 'var(--grey300)',
  grey200: 'var(--grey200)',
}

export type Colors = keyof typeof colors
