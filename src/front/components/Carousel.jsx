import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ cards }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={2}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index}>
          {card}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;