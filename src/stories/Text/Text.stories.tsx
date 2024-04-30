import { Meta, StoryObj } from '@storybook/react'
import Text from '@/components/common/Text'
import Flex from '@/components/common/Flex'

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    color: 'black',
    textAlign: 'left',
  },

  render: function Typography(args) {
    return (
      <Flex gap={20}>
        <Flex direction="column" gap={10}>
          <Text {...args} typography="t1">
            typography - t1
          </Text>
          <Text {...args} typography="t2">
            typography - t2
          </Text>
          <Text {...args} typography="t3">
            typography - t3
          </Text>
          <Text {...args} typography="t4">
            typography - t4
          </Text>
          <Text {...args} typography="t5">
            typography - t5
          </Text>
          <Text {...args} typography="t6">
            typography - t6
          </Text>
          <Text {...args} typography="t7">
            typography - t7
          </Text>
        </Flex>

        <Flex direction="column" gap={10}>
          <Text {...args} typography="h1">
            typography - h1
          </Text>
          <Text {...args} typography="h2">
            typography - h2
          </Text>
          <Text {...args} typography="h3">
            typography - h3
          </Text>
        </Flex>
      </Flex>
    )
  },
}
