import ListRow from './ListRow'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getCardList } from '@/firebase/crad'
import { Card } from '@/types/card'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import Badge from '../common/Badge'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const navigate = useNavigate()

  // hasNextPage: 다음 페이지가 있는지 여부
  // fetchNextPage: 다음 페이지를 가져오는 함수
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery<{
      cardListData: Card[]
      lastCardIdx: QueryDocumentSnapshot<any>
    }>({
      queryKey: ['cardList'],
      queryFn: ({ pageParam }) =>
        getCardList(pageParam as QueryDocumentSnapshot<Card>),
      initialPageParam: undefined,
      getNextPageParam: (snapshot) => {
        console.log('snapshot', snapshot)
        return snapshot.lastCardIdx
      },
    })

  if (!data) {
    return null
  }

  const fetchMore = () => {
    if (!hasNextPage || isFetching) {
      return
    }

    fetchNextPage()
  }

  const cards = data?.pages.flatMap((page: any) => page.cardListData)

  return (
    <>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={fetchMore}
        scrollThreshold="120px"
      >
        {cards.map((card, idx) => {
          const { id, name, payback } = card

          return (
            <ListRow
              key={idx}
              // left={<div>왼쪽</div>}
              contents={<ListRow.Text title={`${idx + 1}위`} subTitle={name} />}
              right={payback && <Badge label={payback} />}
              withArrow
              onClick={() => navigate(`/card/${id}`)}
            />
          )
        })}
      </InfiniteScroll>
    </>
  )
}

export default CardList
