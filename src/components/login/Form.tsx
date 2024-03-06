import { LoginValues } from '@/types/auth'
import { useMemo, useState } from 'react'
import Button from '../common/Button'
import Flex from '../common/Flex'
import Spacing from '../common/Spacing'
import TextField from '../common/TextField'
import Text from '../common/Text'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'
import { validate } from '@/utils/validate'

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (formValues: LoginValues) => void
}) => {
  const [loginFormValues, setLoginFormValues] = useState<LoginValues>({
    email: '',
    password: '',
  })

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginFormValues({
      ...loginFormValues,
      [name]: value,
    })
  }

  const validateLoginForm = (formValues: LoginValues) => {
    let error: Partial<LoginValues> = {}

    if (!validate.isEmail(formValues.email)) {
      error.email = '이메일 형식이 올바르지 않습니다.'
    }

    if (formValues.password.length < 8) {
      error.password = '비밀번호는 8자 이상이어야 합니다.'
    }

    return error
  }

  const errorCheck = useMemo(
    () => validateLoginForm(loginFormValues),
    [loginFormValues],
  )

  return (
    <Flex direction="column">
      <TextField
        label="이메일"
        name="email"
        placeholder="card@gamil.com"
        value={loginFormValues.email}
        hasError={Boolean(loginFormValues.email) && Boolean(errorCheck.email)}
        helpMessage={loginFormValues.email && errorCheck.email}
        onChange={handleLoginForm}
      />

      <Spacing size={16} />

      <TextField
        label="비밀번호"
        name="password"
        value={loginFormValues.password}
        hasError={
          Boolean(loginFormValues.password) && Boolean(errorCheck.password)
        }
        helpMessage={loginFormValues.password && errorCheck.password}
        onChange={handleLoginForm}
      />

      <Spacing size={32} />
      <Button size="large" full onClick={() => onSubmit(loginFormValues)}>
        로그인
      </Button>

      <Spacing />
      <Link to="/signup" css={LinkStyle}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const LinkStyle = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

export default LoginForm
