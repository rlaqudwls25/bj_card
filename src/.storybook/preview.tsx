import { Global } from '@emotion/react'
import type { Preview } from '@storybook/react'
import React from 'react'
import globalStyles from '../styles/globalStyles'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div>
        <Global styles={globalStyles} />
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
