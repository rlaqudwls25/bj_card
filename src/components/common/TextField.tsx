import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import Input from './Input'
import Text from './Text'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMessage, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const labelColor = hasError ? 'red' : isFocused ? 'blue' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            margin="0px 0px 8px 0px"
          >
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {helpMessage && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            margin="0px 8px 0px 0px"
          >
            {helpMessage}
          </Text>
        )}
      </div>
    )
  },
)

export default TextField
