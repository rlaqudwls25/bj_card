import { colors } from '@/styles/colors'
import styled from '@emotion/styled'

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <ProgressBarContainer>
      <BaseProgressBar progress={progress} />
    </ProgressBarContainer>
  )
}

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${colors.grey};
  overflow: hidden;
  border-radius: 5px;
`

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

export default ProgressBar
