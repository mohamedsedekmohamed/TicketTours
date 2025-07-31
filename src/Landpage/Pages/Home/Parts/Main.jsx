import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Nav from '../../../component/Nav';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Loading from '../../../../ui/Loading'
const Main = ({ data }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (data?.cover?.imagePath) {
      const img = new Image();
      img.src = data.cover.imagePath;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [data]);

  if (!isImageLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-screen h-screen bg-cover bg-center relative flex flex-col items-center"
        style={{ backgroundImage: `url(${data.cover.imagePath})` }}
      >
        {/* Navbar */}
        <div className='absolute top-7 lg:top-5 z-10 w-full'>
          <Nav />
        </div>

        {/* Content */}
        <div className='flex flex-col gap-20 lg:gap-10 justify-center items-center px-4 mt-50 sm:mt-65 text-center'>
          <h1
            data-aos="fade-down"
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-lg'
          >
            Explore the World With Ease
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white drop-shadow'
          >
            Book unforgettable journeys tailored to your style, budget, and destination dreams.
          </p>

          {/* Search Box */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-3 backdrop-blur-2xl bg-white/30 rounded-xl p-4 shadow-md items-stretch sm:items-end w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
          >
            {/* Location */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <FaLocationDot className="text-md text-white" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent text-sm outline-none placeholder-white text-white"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 border-b border-white pb-1">
                <MdOutlineDateRange className="text-md text-white" />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full bg-transparent text-sm outline-none placeholder-white text-white"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              data-aos="flip-left"
              data-aos-delay="600"
              className="flex items-center justify-center gap-1 bg-one hover:bg-one/90 text-white text-sm px-5 py-2 rounded-lg transition-all h-[42px]"
            >
              <IoMdSearch className="text-lg" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
