import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { CSSProperties } from 'react'
import {
  buttonColor,
  ButtonColor,
  buttonSize,
  ButtonSize,
  buttonToggleColor,
} from '@styles/button'
import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

interface ButtonProps {
  color?: ButtonColor
  toggleBackgroundColor?: CSSProperties['backgroundColor']
  size?: ButtonSize
  full?: boolean
  disabled?: boolean
  isToggle?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    borderRadius: '6px',
  },

  ({ color = 'primary', isToggle }) =>
    isToggle ? buttonToggleColor[color] : buttonColor[color],
  ({ size = 'small' }) => buttonSize[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
        `
      : undefined,

  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.25;
          cursor: not-allowed;
        `
      : undefined,
)

const ButtonGroup = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column">
      {title && (
        <>
          <Text typography="t6" bold>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      )}
      <Flex css={ButtonGroupStyle}>{children}</Flex>
    </Flex>
  )
}

const ButtonGroupStyle = css`
  gap: 10px;

  & button {
    flex: 1;
  }
`

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
