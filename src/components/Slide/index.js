import React, { memo } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import './styles.scss';

const prefixCls = 'sru-Slide';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

function Slide(props) {
  const { imgs = [], ...rest } = props;
  return (
    <Swiper
      className={prefixCls}
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{ disableOnInteraction: false }}
      pagination={{ clickable: true }}
      {...rest}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {imgs.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={`${prefixCls}-bannerImg`} style={{ backgroundImage: `url(${item.url})` }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default memo(Slide);
