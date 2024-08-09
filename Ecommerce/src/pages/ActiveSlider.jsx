import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Slider1 from '../images/Slider1.jpg'

import Slider3 from '../images/Slider3.jpg'
import Slider4 from '../images/Slider4.jpg'

const App = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {};

  useEffect(() => {
    const images = [Slider1, Slider3, Slider4];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <>
      <div className="w-full max-w-full sm:h-24 md:h-36 lg:h-48 h-40 mt-5 mx-auto sm:mb-10 md:mb-10 lg:mb-28 relative">
        <Swiper
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={{
          //   prevEl: '.custom-prev',
          //   nextEl: '.custom-next',
          // }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
          loop={true}       >
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <img src={Slider1} alt="Slider 1" className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <img src={Slider3} alt="Slider 3" className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <img src={Slider4} alt="Slider 4" className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        </Swiper>
        {/* <div className="custom-prev absolute top-1/2 -translate-y-1/2 z-10 left-2  text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer  hover:bg-blue-100 hover:bg-opacity-60 hover:border-black transition-all duration-300">
          &lt;
        </div>
        <div className="custom-next absolute top-1/2 -translate-y-1/2 z-10 right-2 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 hover:bg-opacity-60 hover:border-black transition-all duration-300">
          &gt;
        </div> */}
      </div>
    </>
  );
};

export default App;
