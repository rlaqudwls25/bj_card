import { ApplyValues } from '@/types/apply'
import Select from '@common/Select'
import { useCallback, useState } from 'react'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '../../constants/apply'
import FixedBottomButton from '../common/FixedBottomButton'
import Flex from '../common/Flex'

export type BasicInfoValues = Pick<
  ApplyValues,
  'salary' | 'creditScore' | 'payDate'
>

const BasicInfo = ({
  onNext,
}: {
  onNext: (values: BasicInfoValues) => void
}) => {
  const [basicValue, setBasicValue] = useState<BasicInfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleBasicInfo = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target

      setBasicValue({
        ...basicValue,
        [name]: value,
      })
    },
    [basicValue],
  )

  const 모든항목을입력했는가 = Object.values(basicValue).every((value) => value)

  return (
    <Flex direction="column">
      <Select
        label="연소득"
        name="salary"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={basicValue.salary}
        onChange={handleBasicInfo}
      />
      <Select
        label="신용점수"
        name="creditScore"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={basicValue.creditScore}
        onChange={handleBasicInfo}
      />
      <Select
        label="결제일"
        name="payDate"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={basicValue.payDate}
        onChange={handleBasicInfo}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => onNext(basicValue)}
        disabled={!모든항목을입력했는가}
      />
    </Flex>
  )
}

export default BasicInfo
