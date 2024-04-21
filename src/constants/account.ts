import { AccountTerms } from '@/types/account'

export const 약관목록: AccountTerms[] = [
  {
    id: '1',
    title: '계좌개설 관련 안내 . 및필수 동의',
    required: true,
  },
  {
    id: '2',
    title: '개인정보 요약동의서',
    required: true,
  },
  {
    id: '3',
    title: '마케팅 수신 동의',
    required: false,
  },
]

export const 은행이름 = [
  {
    label: '국민은행',
    value: '국민은행',
  },
  {
    label: '신한은행',
    value: '신한은행',
  },
  {
    label: '우리은행',
    value: '우리은행',
  },
  {
    label: '하나은행',
    value: '하나은행',
  },
  {
    label: '기업은행',
    value: '기업은행',
  },
  {
    label: '카카오뱅크',
    value: '카카오뱅크',
  },
  {
    label: '토스뱅크',
    value: '토스뱅크',
  },
]
