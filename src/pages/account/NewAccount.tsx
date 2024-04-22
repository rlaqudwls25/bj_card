import AccountForm from '@/components/account/AccountForm'
import Terms from '@/components/account/Terms'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import FullPageLoader from '@/components/common/FullPageLoader'
import ProgressBar from '@/components/common/ProgressBar'
import { createAccount, setTerms } from '@/firebase/account'
import { userState } from '@/recoil/user'
import { AccountInfo } from '@/types/account'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const LAST_STEP = 2
const NewAccount = () => {
  const user = useRecoilValue(userState)
  const navigate = useNavigate()
  const storageKey = `account-step-${user?.uid}`

  const [accountStep, setAccountStep] = useState<number>(() => {
    const step = localStorage.getItem(storageKey)

    if (step === null) {
      return 0
    }

    return JSON.parse(step)
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(accountStep))
  }, [accountStep, storageKey])

  return (
    <>
      <ProgressBar progress={accountStep / LAST_STEP} />
      <AccountContainer>
        {accountStep === 0 && (
          <Terms
            onNext={async (termsId) => {
              await setTerms({ userId: user?.uid as string, termsId })

              setAccountStep((prev) => prev + 1)
            }}
          />
        )}

        {accountStep === 1 && (
          <AccountForm
            onNext={async (accountFormValues) => {
              const newAccountFormValues: AccountInfo = {
                ...accountFormValues,
                status: 'READY',
                money: 0,
                userId: user?.uid as string,
              }

              await createAccount(newAccountFormValues)

              setAccountStep((prev) => prev + 1)
            }}
          />
        )}
      </AccountContainer>

      {accountStep === 2 && (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었습니다." />
          <FixedBottomButton
            label="확인"
            size="large"
            onClick={() => navigate('/')}
          />
        </>
      )}
    </>
  )
}

const AccountContainer = styled.div`
  padding: 20px;
`

export default NewAccount
