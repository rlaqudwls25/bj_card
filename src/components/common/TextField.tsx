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

/**
 * Input 우선순위
 * 1. error
 * 2. focus
 * 3. default
 */

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMessage, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const labelColor = hasError ? 'red' : isFocused ? 'blue' : 'grey'

    const handleFocus = () => {
      setIsFocused(true)
      // onFocus?.(event)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    return (
      <div>
        {label ? (
          <Text typography="t7" color={labelColor} display="inline-block">
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
      </div>
    )
  },
)

export default TextField
