const MaxAmount = 1000000
const MinAmount = 100000

const Category_MAX = 100000
const Category_MIN = 10000

export function generateChartData() {
  return [
    '2023-06-30',
    '2023-07-31',
    '2023-08-31',
    '2023-09-30',
    '2023-10-31',
    '2023-11-30',
    '2023-12-31',
    '2024-01-31',
    '2024-02-29',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
  ].map((date, index) => ({
    date,
    remainingAmount: Math.floor(
      Math.random() * (MaxAmount - MinAmount) + MinAmount,
    ),
    id: index,
  }))
}

export function generatePieChartData() {
  return ['카페', '쇼핑', '여행', '식비', '기타'].map((category) => ({
    category,
    amount: Math.floor(
      Math.random() * (Category_MAX - Category_MIN) + Category_MAX,
    ),
  }))
}
