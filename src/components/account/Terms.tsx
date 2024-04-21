import { useState } from 'react'
import { 약관목록 } from '../../constants/account'
import Agreement from '../common/Agreement'
import FixedBottomButton from '../common/FixedBottomButton'

const Terms = ({ onNext }: { onNext: (agreeId: string[]) => void }) => {
  const [agree, setAgree] = useState(
    약관목록.map((term) => {
      return { ...term, checked: false }
    }),
  )

  const handleAllAgreement = (isChecked: boolean) => {
    setAgree((prevState) => {
      return prevState.map((item) => ({ ...item, checked: isChecked }))
    })
  }

  const handleAgreement = (id: string, isChecked: boolean) => {
    setAgree((prevState) => {
      return prevState.map((term) => {
        if (term.id === id) {
          return { ...term, checked: isChecked }
        }
        return term
      })
    })
  }

  const 모든약관동의를했는가 = agree.every((term) => term.checked)
  const 필수약관동의를했는가 = agree
    .filter((term) => term.required)
    .every((item) => item.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          isChecked={모든약관동의를했는가}
          onChange={(isChecked: boolean) => handleAllAgreement(isChecked)}
        ></Agreement.Title>

        {agree.map((term) => (
          <Agreement.Description
            key={term.id}
            isChecked={term.checked}
            onChange={(isChecked: boolean) =>
              handleAgreement(term.id, isChecked)
            }
          >
            {term.required ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        size="large"
        label="약관동의"
        disabled={!필수약관동의를했는가}
        onClick={() =>
          onNext(agree.filter((term) => term.checked).map((item) => item.id))
        }
      />
    </div>
  )
}

export default Terms
