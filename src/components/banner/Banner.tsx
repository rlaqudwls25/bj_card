import Flex from '../common/Flex'
import Text from '../common/Text'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBannerList } from '@/firebase/banner'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const Banner = () => {
  const { data: bannerList } = useQuery({
    queryKey: ['bannerList'],
    queryFn: getBannerList,
  })

  return (
    <>
      <Swiper spaceBetween={8}>
        {bannerList?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to="/">
              <Flex direction="column" css={BannerContainerStyle}>
                <Text bold typography="t4">
                  {banner.title}
                </Text>
                <Text>{banner.description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

const BannerContainerStyle = css`
  background-color: var(--grey);
  padding: 20px;
  border-radius: 8px;
`

export default Banner
