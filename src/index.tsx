import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthGuard from './components/auth/AuthGuard'
import { AlertContextProvider } from './contexts/AlertContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthGuard>
          <AlertContextProvider>
            <App />
          </AlertContextProvider>
        </AuthGuard>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
)
