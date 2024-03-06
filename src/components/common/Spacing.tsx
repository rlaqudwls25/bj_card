import styled from '@emotion/styled'

interface SpacingProps {
  size?: number
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>(
  ({ size = 16, direction = 'horizontal' }) => ({
    width: direction === 'vertical' ? `${size}px` : '',
    height: direction === 'horizontal' ? `${size}px` : '',
  }),
)

export default Spacing
