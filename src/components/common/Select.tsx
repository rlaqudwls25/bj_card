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
}

const Select = ({
  label,
  options,
  value,
  placeholder,
  ...rest
}: SelectProps) => {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t6"
          color="black"
          bold
          display="inline-block"
          margin="0px 0px 8px 0px"
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required value={value} {...rest}>
        <option disabled hidden value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
}

const BaseSelect = styled.select`
  position: relative;
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  // 필수값이 입력되지 않았을 때
  &:required:invalid {
    color: #c0c4c7;
  }
`

export default Select
