import { ApplyValues } from '@/types/apply'
import Button from '@common/Button'
import { useState } from 'react'
import Spacing from '@common/Spacing'
import FixedBottomButton from '@common/FixedBottomButton'

export type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) => {
  const [cardValue, setCardValue] = useState<CardInfoValues>({
    isMaster: false,
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
    <div>
      <Button.Group title="해외결제">
        <Button
          size="medium"
          name="isMaster"
          isToggle={!cardValue.isMaster}
          data-value={true}
          onClick={onButtonClick}
        >
          Master
        </Button>
        <Button
          size="medium"
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
          size="medium"
          name="isRf"
          isToggle={cardValue.isRf}
          data-value={false}
          onClick={onButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="medium"
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
          size="medium"
          name="isHipass"
          isToggle={cardValue.isHipass}
          data-value={false}
          onClick={onButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="medium"
          name="isHipass"
          isToggle={!cardValue.isHipass}
          data-value={true}
          onClick={onButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton label="다음" onClick={() => onNext(cardValue)} />
    </div>
  )
}

export default CardInfo
