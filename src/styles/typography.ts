import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-size: 30px;
    line-height: 1.2;
  `,
  t2: css`
    font-size: 26px;
    line-height: 1.2;
  `,
  t3: css`
    font-size: 22px;
    line-height: 1.2;
  `,
  t4: css`
    font-size: 20px;
    line-height: 1.2;
  `,
  t5: css`
    font-size: 17px;
    line-height: 1.2;
  `,
  t6: css`
    font-size: 15px;
    line-height: 1.2;
  `,
  t7: css`
    font-size: 12px;
    line-height: 1.2;
  `,
}

export type Typography = keyof typeof typographyMap
