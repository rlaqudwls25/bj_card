import { useEffect, useRef, useState } from 'react'
import { colors } from '@/styles/colors'
import Text from './Text'
import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

// stroke = 그려지는 색상
// strokeLinecap = 선의 끝 모양
// strokeDasharray = path의 길이
// strokeDashoffset = path의 길이 중 움직일 길이
const BEST_SCORE = 1000

interface ScoreChartProps {
  width?: number
  height?: number
  score: number
}

const ScoreChart = ({ score, width = 100, height = 100 }: ScoreChartProps) => {
  const pathRef = useRef<SVGPathElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setOffset(pathRef.current.getTotalLength())
    }
  }, [])

  const dashOffset = offset - (score / BEST_SCORE) * offset

  return (
    <ScoreChartContainer width={width} height={height}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 223 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 회색 배경 경로 */}
        <path
          ref={pathRef}
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          stroke={colors.grey300}
          strokeWidth="18"
          strokeLinecap="round"
        ></path>
        {/* 파란색 경로 */}
        <path
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          stroke={colors.blue600}
          strokeWidth="18"
          strokeLinecap="round"
          // 전체 길이
          strokeDasharray={offset}
          // 움직일 길이
          strokeDashoffset={dashOffset}
        ></path>
      </svg>
      <Text css={textStyles} bold typography="t6">
        {addDelimiter(score)}
      </Text>
    </ScoreChartContainer>
  )
}

const ScoreChartContainer = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    position: 'relative',
    width,
    height,
  }),
)

const textStyles = css`
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translate(-50%, 50%);
`

export default ScoreChart
