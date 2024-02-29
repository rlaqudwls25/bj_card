import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import Text from './Text'

interface BadgeProps {
  label: string
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <BadgeContainer>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </BadgeContainer>
  )
}

export default Badge

const BadgeContainer = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`
