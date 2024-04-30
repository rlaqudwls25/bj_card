import Flex from '@/components/common/Flex'
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
    align: 'center',
    justify: 'center',
    direction: 'row',
    gap: 10,
  },
}
