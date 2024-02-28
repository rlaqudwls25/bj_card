import ListRow from './ListRow'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getCardList } from '@/firebase/crad'
import { Card } from '@/types/card'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'

const CardList = () => {
  // hasNextPage: 다음 페이지가 있는지 여부
  // fetchNextPage: 다음 페이지를 가져오는 함수

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<{
    cardListData: Card[]
    lastCardIdx: QueryDocumentSnapshot<any>
  }>({
    queryKey: ['cardList'],
    queryFn: ({ pageParam }) => getCardList(pageParam as string),
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
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
        loader={<h4>Loading...</h4>}
        next={fetchMore}
      >
        {cards.map((card, idx) => {
          return (
            <ListRow
              key={card.id}
              // left={<div>왼쪽</div>}
              contents={
                <ListRow.Text title={`${idx + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <div>{card.payback}</div>}
              withArrow
            />
          )
        })}
      </InfiniteScroll>
    </>
  )
}

export default CardList
