import FixedBottomButton from '../common/FixedBottomButton'
import Flex from '../common/Flex'
import TextField from '../common/TextField'
import Spacing from '../common/Spacing'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@/types/auth'
import { validate } from '@/utils/validate'

const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  })

  const valiDateSignupForm = (formValues: FormValues) => {
    let error: Partial<FormValues> = {}

    if (!validate.isEmail(formValues.email)) {
      error.email = '이메일 형식이 올바르지 않습니다.'
    }

    if (formValues.password.length < 8) {
      error.password = '비밀번호는 8자 이상이어야 합니다.'
    }

    if (formValues.passwordConfirm.length < 8) {
      error.passwordConfirm = '비밀번호는 8자 이상이어야 합니다.'
    } else if (formValues.password !== formValues.passwordConfirm) {
      error.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    if (formValues.name.length < 2) {
      error.name = '이름은 2자 이상이어야 합니다.'
    }

    return error
  }

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      setFormValues({
        ...formValues,
        [name]: value,
      })
    },
    [formValues],
  )

  const errorCheck = useMemo(() => valiDateSignupForm(formValues), [formValues])

  const isDisabled = Object.keys(errorCheck).length !== 0

  return (
    <Flex direction="column">
      <TextField
        label="이메일"
        name="email"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(formValues.email) && Boolean(errorCheck.email)}
        helpMessage={Boolean(formValues.email) && errorCheck.email}
      />

      <Spacing size="16" direction="horizontal" />

      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(formValues.password) && Boolean(errorCheck.password)}
        helpMessage={Boolean(formValues.password) && errorCheck.password}
      />

      <Spacing size="16" direction="horizontal" />

      <TextField
        label="비밀번호 재확인"
        name="passwordConfirm"
        type="password"
        value={formValues.passwordConfirm}
        onChange={handleFormValues}
        hasError={
          Boolean(formValues.passwordConfirm) &&
          Boolean(errorCheck.passwordConfirm)
        }
        helpMessage={
          Boolean(formValues.passwordConfirm) && errorCheck.passwordConfirm
        }
      />

      <Spacing size="16" direction="horizontal" />

      <TextField
        label="이름"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(formValues.name) && Boolean(errorCheck.name)}
        helpMessage={Boolean(formValues.name) && errorCheck.name}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => onSubmit(formValues)}
        disabled={isDisabled}
      />
    </Flex>
  )
}

export default SignupForm
