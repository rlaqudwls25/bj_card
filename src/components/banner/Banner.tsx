import Flex from '../common/Flex'
import Text from '../common/Text'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getBannerList } from '@/firebase/banner'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay } from 'swiper'

import 'swiper/css'
import { colors } from '@/styles/colors'
import { useRef } from 'react'
import styled from '@emotion/styled'
import Skeleton from '../common/Skeleton'

const Banner = () => {
  const { data: bannerList } = useSuspenseQuery({
    queryKey: ['bannerList'],
    queryFn: getBannerList,
  })

  const progressCircle = useRef<any>(null)
  const progressContent = useRef<any>(null)
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (!progressCircle.current || !progressContent.current) return

    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

  return (
    <>
      <Swiper
        spaceBetween={8}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {bannerList?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to="/">
              <Flex direction="column" css={BannerContainerStyle} gap={10}>
                <Text bold typography="t4" color="white">
                  {banner.title}
                </Text>
                <Text typography="t5" color="white">
                  {banner.description}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
        <Progress className="autoplay-progress" slot="container-end">
          <SVG viewBox="0 0 48 48" width="24" height="24" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </SVG>
          <span ref={progressContent}></span>
        </Progress>
      </Swiper>
    </>
  )
}

const BannerContainerStyle = css`
  background-color: ${colors.blue600};
  padding: 30px;
  border-radius: 8px;
`

const Progress = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${colors.white};
`

const SVG = styled.svg`
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: ${colors.white};
  fill: none;
  stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
`

const BannerSkeleton = () => {
  return (
    <Flex align="center">
      <Skeleton width={100} height={90} />
    </Flex>
  )
}

Banner.Skeleton = BannerSkeleton

export default Banner
