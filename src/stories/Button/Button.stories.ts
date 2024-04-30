import Button from '@components/common/Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'large',
    full: false,
    title: 'Button',
    children: 'Button',
    disabled: false,
  },
}
