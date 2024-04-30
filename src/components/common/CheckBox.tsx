import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import React from 'react'
import Text from './Text'

export interface CheckBoxProps {
  isCheck: boolean
  onChange?: () => void
  label?: string
}

const CheckBox = ({ label, isCheck, onChange }: CheckBoxProps) => {
  return (
    <Label>
      <CheckBoxInput type="checkbox" checked={isCheck} onChange={onChange} />
      <Text bold typography="t5">
        {label}
      </Text>
    </Label>
  )
}

export default CheckBox

const Label = styled.label`
  display: flex;
  align-items: center;
  span {
    margin-left: 4px;
  }
`

const CheckBoxInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #333;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${colors.blue};
    border: none;

    &::before {
      content: '\u2713';
      font-size: 14px;
      color: #fff;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
    }
  }
`
