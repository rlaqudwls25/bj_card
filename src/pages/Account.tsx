import AccountForm from '@/components/account/AccountForm'
import Terms from '@/components/account/Terms'
import ProgressBar from '@/components/common/ProgressBar'
import { createAccount, setTerms } from '@/firebase/account'
import { userState } from '@/recoil/user'
import { AccountInfo } from '@/types/account'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

const LAST_STEP = 2
const Account = () => {
  const [accountStep, setAccountStep] = useState(0)
  const user = useRecoilValue(userState)

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
                userId: user?.uid as string,
              }

              await createAccount(newAccountFormValues)

              setAccountStep((prev) => prev + 1)
            }}
          />
        )}
      </AccountContainer>
    </>
  )
}

const AccountContainer = styled.div`
  padding: 20px;
`

export default Account
