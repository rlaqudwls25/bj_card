import { inputSize, InputSize } from '@/styles/input'
import { Option } from '@/types/apply'
import styled from '@emotion/styled'
import { SelectHTMLAttributes } from 'react'
import { colors } from '../../styles/colors'
import Flex from './Flex'
import Text from './Text'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
  inputSize?: InputSize
}

const Select = ({
  label,
  options,
  value,
  placeholder,
  inputSize = 'large',
  ...rest
}: SelectProps) => {
  return (
    <SelectBox direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          margin="0px 0px 8px 0px"
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required value={value} inputSize={inputSize} {...rest}>
        <option disabled hidden value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </SelectBox>
  )
}

const BaseSelect = styled.select<{ inputSize: InputSize }>`
  ${({ inputSize }) =>
    inputSize === 'large' && {
      width: '100%',
    }}

  ${({ inputSize }) =>
    inputSize === 'medium' && {
      width: '50%',
    }}

  ${({ inputSize }) =>
    inputSize === 'small' && {
      width: '10%',
    }}

  height: 52px;
  background-color: ${colors.grey200};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:required:invalid {
    color: #c0c4c7;
  }
`

const SelectBox = styled(Flex)`
  position: relative;
`

export default Select
