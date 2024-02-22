import { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Typography, typographyMap } from '@styles/typography'
import { colors, Colors } from '@styles/colors'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
  margin?: string
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold, margin }) => ({
    color: colors[color],
    display,
    textAlign,
    margin,
    fontWeight: bold ? 'bold' : fontWeight,
  }),

  ({ typography = 't5' }) => ({
    typography: typographyMap[typography],
  }),
)

export default Text
