import { colors, Colors } from '@/styles/colors'
import styled from '@emotion/styled'

interface SpacingProps {
  size?: number
  direction?: 'vertical' | 'horizontal'
  backgroundColor?: Colors
}

const Spacing = styled.div<SpacingProps>(
  ({ size = 16, direction = 'horizontal' }) => ({
    width: direction === 'vertical' ? `${size}px` : '',
    height: direction === 'horizontal' ? `${size}px` : '',
  }),

  ({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`,
)

export default Spacing
