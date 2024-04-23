import ListRow from '@/components/card/ListRow'
import Flex from '@/components/common/Flex'
import { useTransactions } from '@/hooks/useTransaction'
import addDelimiter from '@/utils/addDelimiter'
import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import InfiniteScroll from 'react-infinite-scroll-component'
import Text from '@/components/common/Text'
import styled from '@emotion/styled'
import { TRANSACTION_FILTER } from '@/constants/transaction'
import { useState } from 'react'
import { TransactionFilterType } from '@/types/transaction'

const TransactionPage = () => {
  const [transactionFilter, setTransactionFilter] =
    useState<TransactionFilterType>('all')

  const {
    data: transactionData,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useTransactions({ filter: transactionFilter })

  const loadMore = () => {
    if (!hasNextPage || isFetching) {
      return
    }

    fetchNextPage()
  }

  const handleFilter = (filter: TransactionFilterType) => {
    setTransactionFilter(filter)
  }

  const transactionList =
    transactionData?.pages
      .map((transaction) => transaction.transactionData)
      .flat() || []

  console.log(transactionList)

  return (
    <TransactionPageContainer direction="column" justify="center">
      <Flex as="ul" justify="flex-end">
        {TRANSACTION_FILTER.map((filter) => (
          <li key={filter.value} onClick={() => handleFilter(filter.value)}>
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactionList.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {transactionData && (
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
      </InfiniteScroll>
    </TransactionPageContainer>
  )
}

const TransactionPageContainer = styled(Flex)`
  padding: 24px;
`

export default TransactionPage
