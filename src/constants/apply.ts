import { Term, Option } from '@/types/apply'

export const 약관목록: Term[] = [
  {
    id: '01',
    title: '카드신청 관련 안내 및 필수 동의',
  },

  {
    id: '02',
    title: '(필수) 개인정보 요약동의서',
  },
]

export const 연소득옵션: Option[] = [
  { label: '600만원 ~ 5,000만원', value: '600만원 ~ 5,000만원' },
  { label: '5,000만원 ~ 1억원', value: '5,000만원 ~ 1억원' },
  { label: '1억원 이상', value: '1억원 이상' },
]

export const 신용점수옵션: Option[] = [
  { label: '700점 이상', value: '700점 이상' },
  { label: '600점 미만', value: '600점 미만' },
]

export const 결제일옵션: Option[] = [
  { label: '매월 1일', value: '매월 1일' },
  { label: '매월 15일', value: '매월 15일' },
  { label: '매월 25일', value: '매월 25일' },
]
