import styled from '@emotion/styled'

interface ContainerProps {
  children: React.ReactNode
  padding?: string
}

const Container = ({ children }: ContainerProps) => {
  return <ContainerBox>{children}</ContainerBox>
}

const ContainerBox = styled.section<ContainerProps>(({ padding }) => ({
  padding: padding || '24px',
}))

export default Container
