import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface FlexProps {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  gap?: number
  children?: React.ReactNode
  width: string
  height: string
}

const Flex = ({
  align,
  justify,
  direction,
  gap,
  children,
  height,
  width,
}: FlexProps) => {
  return (
    <FlexElement
      align={align}
      justify={justify}
      direction={direction}
      gap={gap}
      width={width}
      height={height}
    >
      {children}
    </FlexElement>
  )
}

export default Flex

const FlexElement = styled.div<FlexProps>(
  ({ align, justify, direction, gap, width, height }) => ({
    display: 'flex',
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    gap,
    border: '1px solid black',
    width,
    height,
  }),
)
