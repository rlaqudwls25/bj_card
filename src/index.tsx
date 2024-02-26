import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
)
