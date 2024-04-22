import { LoginValues } from '@/types/auth'
import { useState } from 'react'
import Button from '../common/Button'
import Flex from '../common/Flex'
import Spacing from '../common/Spacing'
import TextField from '../common/TextField'
import Text from '../common/Text'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'
import { validationForm } from '@/utils/validate'

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (formValues: LoginValues) => void
}) => {
  const [loginFormValues, setLoginFormValues] = useState<LoginValues>({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginFormValues({
      ...loginFormValues,
      [name]: value,
    })
  }

  const error = validationForm(loginFormValues)

  const 필수값이입력되었는가 = Object.values(loginFormValues).every(
    (value) => value,
  )

  return (
    <Flex direction="column">
      <TextField
        label="이메일"
        name="email"
        placeholder="card@gamil.com"
        value={loginFormValues.email}
        hasError={Boolean(loginFormValues.email) && Boolean(error.email)}
        helpMessage={loginFormValues.email && error.email}
        onChange={handleLoginForm}
      />

      <Spacing size={16} />

      <TextField
        label="비밀번호"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={loginFormValues.password}
        hasError={Boolean(loginFormValues.password) && Boolean(error.password)}
        helpMessage={loginFormValues.password && error.password}
        onChange={handleLoginForm}
      />

      <Spacing size={32} />
      <Button
        size="large"
        disabled={!필수값이입력되었는가}
        full
        onClick={() => onSubmit(loginFormValues)}
      >
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
