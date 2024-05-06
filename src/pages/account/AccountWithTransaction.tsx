import Transaction from '@/components/account/AccountWithTransactions'
import ChartWrapper from '@/components/chart/MonthlyChart'
import { generateChartData } from '@/utils/generateChartData'

const AccountWithTransactionPage = () => {
  return (
    <>
      <ChartWrapper chartData={generateChartData()} />
      <Transaction />
    </>
  )
}

export default AccountWithTransactionPage
