import Slider from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import React from "react";
// import { Swiper } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
type propsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

const Carousel = ({ children }: propsType) => {
  const slider = React.useRef<Slider>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow() {
    return (
      <div
        className="absolute right-[0px] top-[20%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#333] text-2xl text-[#fff] sm:top-[35%]"
        onClick={() => slider?.current?.slickNext()}
      >
        <FaAngleRight />
      </div>
    );
  }

  function SamplePrevArrow() {
    return (
      <div
        className="absolute left-0 top-[20%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#333] text-2xl text-[#fff] sm:top-[35%]"
        onClick={() => slider?.current?.slickPrev()}
      >
        <FaAngleLeft />
      </div>
    );
  }
  return (
    // <Swiper
    //   slidesPerView={6}
    //   spaceBetween={2}
    //   loop={true}
    //   pagination={{
    //     clickable: true,
    //   }}
    //   navigation={true}
    //   breakpoints={{
    //     640: {
    //       slidesPerView: 2,
    //       spaceBetween: 20,
    //     },
    //     768: {
    //       slidesPerView: 4,
    //       spaceBetween: 40,
    //     },
    //     1024: {
    //       slidesPerView: 5,
    //       spaceBetween: 50,
    //     },
    //   }}
    //   modules={[Pagination, Navigation]}
    //   className="mySwiper"
    // >
    //   {children}
    // </Swiper>
    <Slider
      ref={slider}
      className="mx-auto h-[400px] w-[100%] overflow-hidden px-[15px] sm:h-[500px]"
      {...settings}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
