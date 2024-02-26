import styled from '@emotion/styled'

interface SpaceProps {
  padding: string
}

const Space = ({ padding }: SpaceProps) => {
  return <SpaceContainer padding={padding} />
}

export default Space

const SpaceContainer = styled.div<SpaceProps>(({ padding }) => ({
  padding: padding,
}))
