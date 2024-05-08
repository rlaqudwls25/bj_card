import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import { Bar } from '@visx/shape'
import { useMemo } from 'react'
import { colors } from '@/styles/colors'
import { format, parseISO } from 'date-fns'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import Flex from '../common/Flex'
import styled from '@emotion/styled'
import Text from '../common/Text'
import addDelimiter from '@/utils/addDelimiter'

interface ChartData {
  date: string
  remainingAmount: number
  id: number
}

interface MonthlyChartProps {
  chartData: ChartData[]
  height: number
  width: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const verticalMargin = 120
const xDate = (d: ChartData) => d.date
const yAmount = (d: ChartData) => Number(d.remainingAmount) * 100

const defaultMargin = { top: 60, right: 0, bottom: 0, left: 0 }
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
}
const formatDate = (date: string) => format(parseISO(date), 'yy년 M월')

const MonthlyChart = ({
  chartData,
  height,
  width,
  margin = defaultMargin,
}: MonthlyChartProps) => {
  const xMax = width
  const yMax = height - verticalMargin
  let tooltipTimeout: number

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

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(xDate),
        padding: 0.4,
      }),
    [xMax, chartData],
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(yAmount))],
      }),
    [yMax, chartData],
  )

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        {/* <rect width={width} height={height} fill="url(#teal)" rx={14} /> */}
        <Group top={verticalMargin / 2}>
          {chartData.map((d) => {
            const date = xDate(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(yAmount(d)) ?? 0)
            const barX = xScale(date)
            const barY = yMax - barHeight
            return (
              <Bar
                key={`bar-${date}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colors.blue600}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip()
                  }, 300)
                }}
                onMouseMove={(event) => {
                  const left = event.clientX

                  const eventSvgCoords = localPoint(event)

                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: left,
                    tooltipTop: eventSvgCoords?.y,
                  })
                }}
              />
            )
          })}
        </Group>
        <AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          tickFormat={formatDate}
          tickStroke={colors.black}
          stroke={colors.black}
          tickLabelProps={{
            fill: colors.grey600,
            fontSize: 11,
            textAnchor: 'middle',
          }}
        />
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <TooltipBox direction="column">
            <div>
              <Text color="white" typography="t5">
                날짜 :
              </Text>
              <Text color="white" typography="t5">
                {formatDate(tooltipData.date)}
              </Text>
            </div>
            <div>
              <Text color="white" typography="t5">
                잔액 :
              </Text>
              <Text color="white" typography="t5">
                {addDelimiter(tooltipData.remainingAmount)}원
              </Text>
            </div>
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

const ChartWrapper = ({ height = 200, chartData }: ChartWrapperProps) => {
  return (
    <ChartContainer direction="column">
      <Text bold>월별 잔액</Text>
      <ParentSize>
        {({ width }) => (
          <MonthlyChart width={width} height={height} chartData={chartData} />
        )}
      </ParentSize>
    </ChartContainer>
  )
}

export const TooltipBox = styled(Flex)`
  padding: 8px;
`

const ChartContainer = styled(Flex)`
  padding: 24px;
`

export default ChartWrapper
