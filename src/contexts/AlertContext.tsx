import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { createPortal } from 'react-dom'

import NewAlert from '@/components/common/newAlert'

type AlertProps = ComponentProps<typeof NewAlert>
type AlertOptions = Omit<AlertProps, 'open'>

interface AlertContextValue {
  open: (options: AlertOptions) => void
}

const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  buttonLabel: '',
  onComplete: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState(defaultValues)

  const portalRoot = document.getElementById('alert_portal')

  const close = useCallback(() => {
    setAlert(defaultValues)
  }, [])

  const open = useCallback(
    ({ onComplete, ...options }: AlertOptions) => {
      setAlert({
        ...options,
        onComplete: () => {
          close()
          onComplete()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {portalRoot !== null
        ? createPortal(<NewAlert {...alert} />, portalRoot)
        : null}
    </Context.Provider>
  )
}

export function useAlertContext() {
  const values = useContext(Context)

  if (values === undefined) {
    throw new Error('AlertContext 내부에서 사용해주세요.')
  }

  const { open } = values

  return { open }
}
