import Flex from '@/components/common/Flex'
import Text from '@/components/common/Text'
import styled from '@emotion/styled'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Flex> = {
  title: 'Flex',
  component: Flex,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Flex>

export const Default: Story = {
  args: {
    gap: 10,
  },

  render: function Render(args) {
    return (
      <Flex direction="column" gap={10}>
        <FlexContainer {...args}>
          <Text>Default Flex</Text>
        </FlexContainer>
        <FlexContainer {...args} align="center" justify="center">
          <Text>Center Flex</Text>
        </FlexContainer>
        <FlexContainer {...args} align="center" justify="flex-end">
          <Text>End Flex</Text>
        </FlexContainer>
      </Flex>
    )
  },
}

const FlexContainer = styled(Flex)`
  border: 1px solid black;
  padding: 20px;
`
