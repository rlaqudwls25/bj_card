import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '@/styles/colors'

const opacity = keyframes`

0% {
    opacity: 1;
}

30% {
    opacity: 0.8;

}

50% {
    opacity: 0.5;
}

70% {
    opacity: 0.8;
}

100% {
    opacity: 1;
}
`

const Skeleton = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    width: `${width}%`,
    height,
    backgroundColor: colors.grey,
    animation: `${opacity} 3s ease-in-out 1s infinite`,
  }),
)

export default Skeleton
