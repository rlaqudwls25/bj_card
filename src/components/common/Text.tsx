import { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Typography, typographyMap } from '@styles/typography'
import { colors, Colors } from '@styles/colors'

interface TextProps {
  typography: Typography
  color: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),

  ({ typography = 't5' }) => ({
    typography: typographyMap[typography],
  }),
)

export default Text
