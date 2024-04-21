import { 은행이름 } from '@/constants/account'
import { AccountFormValue } from '@/types/account'
import { validationForm } from '@/utils/validate'
import { useState } from 'react'
import FixedBottomButton from '../common/FixedBottomButton'
import Flex from '../common/Flex'
import Select from '../common/Select'
import TextField from '../common/TextField'

const AccountForm = ({
  onNext,
}: {
  onNext: (formValues: AccountFormValue) => void
}) => {
  const [formValues, setFormValues] = useState<AccountFormValue>({
    name: '',
    phone: '',
    email: '',
    bankName: '',
    accountNumber: '',
  })

  const [dirty, setDirty] = useState<Partial<AccountFormValue>>({})
  const error = validationForm(formValues)

  const handleDirty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setDirty((prev) => {
      return {
        ...prev,
        [name]: true,
      }
    })
  }

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    setFormValues({
      ...formValues,
      bankName: value,
    })
  }

  const 필수값이입력되었는가 = Object.values(formValues).every((value) => value)

  return (
    <>
      <Flex direction="column" gap={20}>
        <TextField
          label="이름"
          name="name"
          value={formValues.name}
          onChange={handleFormValues}
          hasError={Boolean(dirty.name) && Boolean(error.name)}
          helpMessage={dirty.name && error.name}
          onBlur={handleDirty}
        />

        <TextField
          label="전화번호"
          name="phone"
          value={formValues.phone}
          onChange={handleFormValues}
          hasError={Boolean(dirty.phone) && Boolean(error.phone)}
          helpMessage={dirty.phone && error.phone}
          onBlur={handleDirty}
        />

        <TextField
          label="이메일"
          name="email"
          value={formValues.email}
          onChange={handleFormValues}
          hasError={Boolean(dirty.email) && Boolean(error.email)}
          helpMessage={dirty.email && error.email}
          onBlur={handleDirty}
        />

        <Select
          label="은행이름"
          value={formValues.bankName}
          placeholder="선택"
          options={은행이름}
          onChange={handleSelectValue}
        />

        <TextField
          label="통장번호"
          name="accountNumber"
          value={formValues.accountNumber}
          onChange={handleFormValues}
          hasError={
            Boolean(dirty.accountNumber) && Boolean(error.accountNumber)
          }
          helpMessage={dirty.accountNumber && error.accountNumber}
          onBlur={handleDirty}
        />
      </Flex>

      <FixedBottomButton
        size="large"
        label="확인"
        disabled={!필수값이입력되었는가}
        onClick={() => onNext(formValues)}
      />
    </>
  )
}

export default AccountForm
