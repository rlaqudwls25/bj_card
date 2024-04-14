import Dimmed from './Dimmed'
import styled from '@emotion/styled'
import React from 'react'
import Text from './Text'
import Flex from './Flex'
import Button from './Button'
import { colors } from '../../styles/colors'

interface AlertProps {
  open?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onComplete: () => void
}

const NewAlert = ({
  open,
  title,
  description,
  buttonLabel,
  onComplete,
}: AlertProps) => {
  if (open === false) return null

  return (
    <Dimmed>
      <AlertContainer>
        <Flex direction="column">
          {title && (
            <Text
              typography="t3"
              color="black"
              textAlign="center"
              margin="12px 0px 20px 0px"
              bold
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              typography="t5"
              color="black"
              textAlign="center"
              margin="12px 0px 20px 0px"
            >
              {description}
            </Text>
          )}
        </Flex>

        {onComplete && (
          <Flex justify="center">
            <Button onClick={onComplete} size="large" color="primary">
              <Text typography="t5" color="white" textAlign="right">
                {buttonLabel}
              </Text>
            </Button>
          </Flex>
        )}
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
  width: 400px;
  padding: 40px;
  box-sizing: border-box;
`

export default NewAlert
