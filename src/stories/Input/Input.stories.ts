import TextField from '@/components/common/TextField'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'placeholder',
    hasError: false,
    helpMessage: 'helpMessage',
    disabled: false,
    required: false,
  },
}
