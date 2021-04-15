import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import styles from './styles.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

function Slide(props) {
  const { imgs = [] } = props;
  return (
    <Swiper
      className={styles.swiper}
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{ disableOnInteraction: false }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {imgs.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={styles.bannerImg} style={{ backgroundImage: `url(${item.url})` }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slide;
