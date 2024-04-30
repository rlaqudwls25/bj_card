import CheckBox from '@/components/common/CheckBox'
import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckBox> = {
  title: 'CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
  args: {
    isCheck: false,
    label: 'Default',
  },

  render: function Render(args) {
    const [{ isCheck }, updateArgs] = useArgs()

    function onChange() {
      updateArgs({ isCheck: !isCheck })
    }

    return <CheckBox {...args} isCheck={isCheck} onChange={onChange} />
  },
}
