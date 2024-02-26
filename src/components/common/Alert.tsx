import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import Button from './Button'
import Dimmed from './Dimmed'
import Flex from './Flex'
import Text from './Text'

interface AlertProps {
  title: string
  description?: string
  buttonLabel?: string
  isOpen?: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Alert = ({
  title,
  description,
  buttonLabel,
  isOpen,
  setIsOpen,
}: AlertProps) => {
  const onCloseAlert = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen ? (
        <Dimmed>
          <AlertContainer>
            <Text typography="t4" display="block" margin="0px 0px 6px 0px" bold>
              {title}
            </Text>
            {description && <Text typography="t5">{description}</Text>}
            <Flex justify="flex-end">
              <Button size="small" onClick={onCloseAlert}>
                {buttonLabel}
              </Button>
            </Flex>
          </AlertContainer>
        </Dimmed>
      ) : null}
    </>
  )
}

export default Alert

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert);
  width: 300px;
  padding: 16px;
  box-sizing: border-box;
`
