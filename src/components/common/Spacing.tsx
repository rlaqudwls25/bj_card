import styled from '@emotion/styled'

interface SpacingProps {
  size: string
  direction: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>(
  ({ size = 16, direction = 'vertical' }) => ({
    width: direction === 'vertical' ? `${size}px` : '',
    height: direction === 'horizontal' ? `${size}px` : '',
  }),
)

export default Spacing
