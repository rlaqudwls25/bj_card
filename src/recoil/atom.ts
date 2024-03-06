import { atom } from 'recoil'

export const alertState = atom<boolean>({
  key: 'alertState',
  default: false,
})
