import { colors, Colors } from '@/styles/colors'
import styled from '@emotion/styled'

interface SpacingProps {
  size?: number
  direction?: 'vertical' | 'horizontal'
  backgroundColor?: Colors
  margin?: string
}

const Spacing = styled.div<SpacingProps>(
  ({ size = 16, direction = 'horizontal' }) => ({
    width: direction === 'vertical' ? `${size}px` : '',
    height: direction === 'horizontal' ? `${size}px` : '',
  }),

  ({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`,

  ({ margin }) => margin && `margin: ${margin}px 0px;`,
)

export default Spacing
