import { colors } from '@/styles/colors'
import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import { localPoint } from '@visx/event'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleOrdinal } from '@visx/scale'
import { Pie } from '@visx/shape'
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip'
import { memo } from 'react'
import Flex from '../common/Flex'
import Text from '../common/Text'
import { TooltipBox } from './MonthlyChart'

interface ChartData {
  category: string
  amount: number
}

interface CategoryChartProps {
  width: number
  height: number
  chartData: ChartData[]
}

const margin = { top: 20, right: 20, bottom: 20, left: 20 }
const getAmount = (d: ChartData) => d.amount

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: colors.white,
}

const CategoryChart = ({ width, height, chartData }: CategoryChartProps) => {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left
  const pieSortValues = (a: number, b: number) => b - a
  let tooltipTimeout: number

  const getColor = scaleOrdinal({
    domain: chartData.map((l) => l.amount),
    range: [
      colors.grey600,
      colors.grey500,
      colors.grey400,
      colors.grey300,
      colors.blue400,
    ],
  })

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<ChartData>()

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  })
  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} ref={containerRef}>
        <Group top={top} left={left}>
          <Pie
            data={chartData}
            pieValue={getAmount}
            pieSortValues={pieSortValues}
            outerRadius={radius}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { category, amount } = arc.data
                const [centroidX, centroidY] = pie.path.centroid(arc)
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
                const arcPath = pie.path(arc) ?? ''
                const arcFill = getColor(amount)
                return (
                  <g
                    key={`arc-${category}-${index}`}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip()
                      }, 300)
                    }}
                    onMouseMove={(event) => {
                      const left = event.clientX

                      const eventSvgCoords = localPoint(event)

                      showTooltip({
                        tooltipData: arc.data,
                        tooltipLeft: left,
                        tooltipTop: eventSvgCoords?.y,
                      })
                    }}
                  >
                    <path d={arcPath} fill={arcFill} />
                    {hasSpaceForLabel && (
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={13}
                        textAnchor="middle"
                      >
                        {category}
                      </text>
                    )}
                  </g>
                )
              })
            }}
          </Pie>
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          style={tooltipStyles}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <TooltipBox>
            <Text color="blue600" typography="t6">
              {addDelimiter(tooltipData.amount)}원
            </Text>
          </TooltipBox>
        </TooltipInPortal>
      )}
    </div>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

const ChartWrapper = ({ height = 300, chartData }: ChartWrapperProps) => {
  return (
    <ChartContainer direction="column">
      <Text bold>소비 습관</Text>
      <ParentSize>
        {({ width }) => {
          return (
            <CategoryChart
              width={width}
              height={height}
              chartData={chartData}
            />
          )
        }}
      </ParentSize>
    </ChartContainer>
  )
}

const ChartContainer = styled(Flex)`
  padding: 24px;
`

export default memo(ChartWrapper)
