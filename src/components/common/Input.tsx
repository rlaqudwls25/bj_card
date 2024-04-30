import styled from '@emotion/styled'
import { colors } from '@styles/colors'
import { TextFieldProps } from './TextField'

const Input = styled.input<TextFieldProps>`
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
      width: '30%',
    }}
    
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 2px solid ${colors.grey};
  border-radius: 6px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`
export default Input
