import { 약관목록 } from '@/constants/apply'
import { ApplyValues } from '@/types/apply'
import { Fragment, useState } from 'react'
import Agreement from '../common/Agreement'
import FixedBottomButton from '../common/FixedBottomButton'
import Spacing from '../common/Spacing'

const Terms = ({ onNext }: { onNext: (id: ApplyValues['terms']) => void }) => {
  const [agree, setAgree] = useState<Record<string, boolean>>(
    약관목록.reduce((acc, cur) => {
      return { ...acc, [cur.id]: false }
    }, {}),
  )

  const [allAgreementsStatus, setAllAgreementsStatus] = useState(false)

  const handleAgreement = (id: string, checked: boolean) => {
    const updatedAgree = { ...agree, [id]: checked }

    setAgree(updatedAgree)

    const isAllAgreed = Object.values(updatedAgree).every((agree) => agree)

    if (isAllAgreed) {
      setAllAgreementsStatus(true)
    }

    if (!isAllAgreed) {
      setAllAgreementsStatus(false)
    }
  }

  const handleAllAgreements = (checked: boolean) => {
    setAllAgreementsStatus(checked)

    if (checked) {
      setAgree(
        Object.keys(agree).reduce((acc, cur) => {
          return { ...acc, [cur]: true }
        }, {}),
      )
    }

    if (!checked) {
      setAgree(
        Object.keys(agree).reduce((acc, cur) => {
          return { ...acc, [cur]: false }
        }, {}),
      )
    }
  }

  return (
    <>
      <Agreement>
        <Agreement.Title
          isChecked={allAgreementsStatus}
          onChange={(isChecked) => handleAllAgreements(isChecked)}
        />

        <Spacing size={6} />

        {약관목록.map((약관) => {
          return (
            <Fragment key={약관.id}>
              <Agreement.Description
                isChecked={agree[약관.id]}
                onChange={(isChecked) => handleAgreement(약관.id, isChecked)}
              >
                {약관.title}
              </Agreement.Description>
            </Fragment>
          )
        })}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!allAgreementsStatus}
        onClick={() => onNext(Object.keys(agree))}
      />
    </>
  )
}

export default Terms
