import Transaction from '@/components/account/AccountWithTransactions'
import CategoryChart from '@/components/chart/CategoryChart'
import MonthlyChart from '@/components/chart/MonthlyChart'
import Flex from '@/components/common/Flex'
import {
  generateChartData,
  generatePieChartData,
} from '@/utils/generateChartData'
import styled from '@emotion/styled'

const AccountWithTransactionPage = () => {
  return (
    <AccountWithTransactionContainer direction="column">
      <MonthlyChart chartData={generateChartData()} />
      <CategoryChart chartData={generatePieChartData()} />
      <Transaction />
    </AccountWithTransactionContainer>
  )
}

const AccountWithTransactionContainer = styled(Flex)`
  margin-bottom: 200px;
`

export default AccountWithTransactionPage
