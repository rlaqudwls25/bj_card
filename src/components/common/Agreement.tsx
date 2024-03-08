import { useState } from 'react'
import CheckBox from './CheckBox'
import Container from './Container'
import Flex from './Flex'
import Text from './Text'

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Flex as="ul" direction="column">
        {children}
      </Flex>
    </Container>
  )
}

const AgreementTitle = ({
  isChecked,
  onChange,
}: {
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}) => {
  return (
    <Flex as="li">
      <CheckBox
        isCheck={isChecked}
        label="약관에 모두 동의"
        onChange={() => onChange(!isChecked)}
      />
    </Flex>
  )
}

const AgreementDescription = ({
  children,
  onChange,
  isChecked,
}: {
  children: React.ReactNode
  onChange: (isChecked: boolean) => void
  isChecked: boolean
}) => {
  return (
    <Flex as="li" align="center">
      <CheckBox isCheck={isChecked} onChange={() => onChange(!isChecked)} />
      <Text typography="t6">{children}</Text>
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

export default Agreement
