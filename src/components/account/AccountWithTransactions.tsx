import { useTransactions } from '@/hooks/useTransaction'
import ListRow from '../card/ListRow'
import Flex from '../common/Flex'
import Text from '../common/Text'
import { parseISO, format } from 'date-fns'
import styled from '@emotion/styled'
import addDelimiter from '@/utils/addDelimiter'
import FixedBottomButton from '../common/FixedBottomButton'
import { useNavigate } from 'react-router-dom'

const AccountWithTransaction = () => {
  const { data: transactionListData } = useTransactions()
  const navigate = useNavigate()

  const transactionList = transactionListData?.pages
    .map((items) => items.transactionData)
    .flat()

  return (
    <TransactionContainer direction="column" justify="center">
      <Text bold>입출금내역</Text>

      {transactionList?.length === 0 ? (
        <Flex>
          <Text>아직 입출금 내역이 없어요</Text>
        </Flex>
      ) : (
        <ul>
          {transactionList?.map((list) => {
            const { money, remainingAmount, displayName, date, id } = list

            const 입금여부 = list.type === 'deposit'
            return (
              <ListRow
                key={id}
                contents={
                  <ListRow.Text
                    title={displayName}
                    subTitle={format(parseISO(date), 'yyyy-MM-dd HH:mm:ss')}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end" gap={4}>
                    <Text color={입금여부 ? 'blue600' : 'red'}>
                      {입금여부 ? '+' : '-'} {addDelimiter(money)}원
                    </Text>
                    <Text>{addDelimiter(remainingAmount)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      )}
      {/* <FixedBottomButton
        label="자세히 보기"
        size="large"
        onClick={() => navigate('/account/transaction')}
      /> */}
    </TransactionContainer>
  )
}

const TransactionContainer = styled(Flex)`
  padding: 24px;
`

export default AccountWithTransaction
