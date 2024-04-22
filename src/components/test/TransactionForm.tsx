import { createAccount, getAccount, updateAccount } from '@/firebase/account'
import { createTransaction } from '@/firebase/transaction'
import { Transaction } from '@/types/transaction'
import { useState } from 'react'
import Button from '../common/Button'
import Flex from '../common/Flex'
import Select from '../common/Select'
import TextField from '../common/TextField'

const TransactionForm = () => {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    money: '',
    displayName: '',
  })

  const handleFormValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    console.log('e.target.name', e.target.name)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)

    if (!account) {
      return null
    }

    if (
      formValues.type === 'withdraw' &&
      account.money - Number(formValues.money) < 0
    ) {
      alert('잔액이 부족합니다.')
      return
    }

    const remainingAmount =
      formValues.type === 'deposit'
        ? account.money + Number(formValues.money)
        : account.money - Number(formValues.money)

    const newTransaction = {
      ...formValues,
      money: Number(formValues.money),
      date: new Date().toISOString(),
      remainingAmount: remainingAmount,
    } as Transaction

    await Promise.all([
      createTransaction(newTransaction),
      updateAccount(formValues.userId, remainingAmount),
    ])

    window.alert('입출금 데이터 생성')
  }

  return (
    <Flex direction="column">
      <TextField
        name="userId"
        label="유저아이디"
        value={formValues.userId}
        onChange={handleFormValues}
      />
      <Select
        name="type"
        value={formValues.type}
        onChange={handleFormValues}
        options={[
          { label: '입금', value: 'deposit' },
          { label: '출금', value: 'withdraw' },
        ]}
      />

      <TextField
        name="money"
        label="입출금 금액"
        value={formValues.money}
        onChange={handleFormValues}
      />
      <TextField
        name="displayName"
        label="보내는 사람 이름"
        value={formValues.displayName}
        onChange={handleFormValues}
      />

      <Button onClick={handleSubmit}>
        {formValues.type === 'deposit' ? '입금하기' : '출금하기'}
      </Button>
    </Flex>
  )
}

export default TransactionForm
