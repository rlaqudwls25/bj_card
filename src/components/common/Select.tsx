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

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  // 필수값이 입력되지 않았을 때
  &:required:invalid {
    color: #c0c4c7;
  }
`

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
          typography="t7"
          color="black"
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

export default Select
