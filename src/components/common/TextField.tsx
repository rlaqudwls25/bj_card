import { InputSize } from '@/styles/input'
import styled from '@emotion/styled'
import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import Flex from './Flex'
import Input from './Input'
import Text from './Text'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
  inputSize?: InputSize
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      hasError,
      helpMessage,
      inputSize = 'large',
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const labelColor = hasError ? 'red' : isFocused ? 'blue400' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <InputBox direction="column">
        {label && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            margin="0px 0px 8px 0px"
          >
            {label}
          </Text>
        )}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputSize={inputSize}
          {...rest}
        />

        {helpMessage && hasError && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            margin="4px 0px 0px 0px"
          >
            {helpMessage}
          </Text>
        )}
      </InputBox>
    )
  },
)

const InputBox = styled(Flex)``

export default TextField
