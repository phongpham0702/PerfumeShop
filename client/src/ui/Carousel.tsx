import Slider from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import React from "react";
type propsType = {
  children: React.ReactNode;
};

const Carousel = ({ children }: propsType) => {
  const slider = React.useRef<Slider>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow() {
    return (
      <div
        className="absolute right-[25px] top-[35%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#333] text-2xl text-[#fff]"
        onClick={() => slider?.current?.slickNext()}
      >
        <FaAngleRight />
      </div>
    );
  }

  function SamplePrevArrow() {
    return (
      <div
        className="absolute left-0 top-[35%] z-10 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#333] text-2xl text-[#fff]"
        onClick={() => slider?.current?.slickPrev()}
      >
        <FaAngleLeft />
      </div>
    );
  }
  return (
    <Slider
      ref={slider}
      className="mx-auto h-[490px] w-[90%] overflow-y-hidden px-[15px]"
      {...settings}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
