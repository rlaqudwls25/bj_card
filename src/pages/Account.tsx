import AccountForm from '@/components/account/AccountForm'
import Terms from '@/components/account/Terms'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import FullPageLoader from '@/components/common/FullPageLoader'
import ProgressBar from '@/components/common/ProgressBar'
import { createAccount, setTerms } from '@/firebase/account'
import { userState } from '@/recoil/user'
import { AccountInfo } from '@/types/account'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const LAST_STEP = 2
const Account = () => {
  const [accountStep, setAccountStep] = useState(0)
  const navigate = useNavigate()
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

export default Account
