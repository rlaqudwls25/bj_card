import { useParams } from 'react-router-dom'
import { getCardDetail } from '@/firebase/crad'
import { useQuery } from '@tanstack/react-query'
import Top from '@/components/card/Top'
import ListRow from '@/components/card/ListRow'
import Container from '@/components/common/Container'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import Space from '@/components/common/Space'
import Flex from '@/components/common/Flex'
import Text from '@/components/common/Text'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { removeHtmlTag } from '@/utils/removeHtmlTag'
import { useNavigate } from 'react-router-dom'
import { useAlertContext } from '@/contexts/AlertContext'

const Card = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const moveToApply = () => {
    navigate(`/apply/${id}`)
  }

  const { data } = useQuery({
    queryKey: ['cardDetail', id],
    queryFn: () => getCardDetail(id as string),
  })

  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subText = promotion ? removeHtmlTag(promotion.title) : tags.join(', ')

  console.log('subText', subText)

  return (
    <Container>
      <Top title={`${corpName} ${name}`} subTitle={subText} />

      <Space padding="24px 0px" />

      <ListBox>
        {benefit.map((item, idx) => {
          return (
            <ListRow
              key={idx}
              left={<IconCheck />}
              contents={
                <ListRow.Text title={`혜택 ${idx + 1}`} subTitle={item} />
              }
            />
          )
        })}
      </ListBox>

      <Space padding="24px 0px" />

      {promotion && (
        <Flex direction="column">
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTag(promotion.terms)}</Text>
        </Flex>
      )}

      <Space padding="24px 0px" />

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </Container>
  )

  function IconCheck() {
    return (
      <svg
        viewBox="0 0 24 24"
        width={30}
        height={30}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="#6563ff"
        />
      </svg>
    )
  }
}

const slideRight = keyframes`
   from {
    transform: translateX(-100%);
   }
   to {
    transform: translateX(0);
   }
  `
const ListBox = styled.ul`
  animation: ${slideRight} 0.5s forwards;
`

export default Card
