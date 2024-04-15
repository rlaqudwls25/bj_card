import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from '../common/Flex'
import Text from '../common/Text'

interface ListRowProps {
  // 왼쪽 요소 담당
  left?: React.ReactNode
  // 가운데 요소 담당
  contents: React.ReactNode
  // 오른쪽 요소 담당
  right?: React.ReactNode
  // 화살표 여부
  withArrow?: boolean
  onClick?: () => void
}

const ListRow = ({
  left,
  contents,
  right,
  onClick,
  withArrow,
}: ListRowProps) => {
  return (
    <ListContainer align="center" onClick={onClick}>
      <Flex css={ListRowLeftStyle}>{left}</Flex>
      <Flex css={ListRowContentsStyle}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow && <IconArrowRight />}
    </ListContainer>
  )
}

const ListRowLeftStyle = css`
  margin-right: 14px;
`

const ListRowContentsStyle = css`
  flex: 1;
`

const ListRowText = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <Flex direction="column" gap={10}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

ListRow.Text = ListRowText

const IconArrowRight = () => {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

const ListContainer = styled(Flex)`
  padding: 30px 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.1);
`

export default ListRow
