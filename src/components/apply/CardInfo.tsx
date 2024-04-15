import { ApplyValues } from '@/types/apply'
import Button from '@common/Button'
import { useState } from 'react'
import Spacing from '@common/Spacing'
import FixedBottomButton from '@common/FixedBottomButton'
import Flex from '../common/Flex'
import styled from '@emotion/styled'

export type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) => {
  const [cardValue, setCardValue] = useState<CardInfoValues>({
    isMaster: true,
    isRf: false,
    isHipass: false,
  })

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.target as HTMLButtonElement

    setCardValue({
      ...cardValue,
      [buttonValue.name]: JSON.parse(buttonValue.dataset.value as string),
    })
  }

  return (
    <CardInfoContainer direction="column" gap={10}>
      <Button.Group title="해외결제">
        <Button
          size="large"
          name="isMaster"
          isToggle={!cardValue.isMaster}
          data-value={true}
          onClick={onButtonClick}
        >
          Master
        </Button>
        <Button
          size="large"
          name="isMaster"
          isToggle={cardValue.isMaster}
          data-value={false}
          onClick={onButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통">
        <Button
          size="large"
          name="isRf"
          isToggle={cardValue.isRf}
          data-value={false}
          onClick={onButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="large"
          name="isRf"
          isToggle={!cardValue.isRf}
          data-value={true}
          onClick={onButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스">
        <Button
          size="large"
          name="isHipass"
          isToggle={cardValue.isHipass}
          data-value={false}
          onClick={onButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="large"
          name="isHipass"
          isToggle={!cardValue.isHipass}
          data-value={true}
          onClick={onButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        size="large"
        onClick={() => onNext(cardValue)}
      />
    </CardInfoContainer>
  )
}

const CardInfoContainer = styled(Flex)`
  padding: 20px;
`

export default CardInfo
