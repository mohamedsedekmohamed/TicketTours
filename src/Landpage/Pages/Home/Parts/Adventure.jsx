import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Exploreone from "../../../../assets/Exploreone.jpg";
import Exploretwo from '../../../../assets/Exploretwo.jpg';
import Explorethree from '../../../../assets/Explorethree.jpg';
import { MdArrowOutward } from "react-icons/md";

const Adventure = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const explore = [
    {
      title: "Beach Getaways",
      image: Exploreone,
      description:
        "Relax by the sea, enjoy sunny weather, and indulge in coastal cuisines in beautiful beach resorts.",
    },
    {
      title: "Mountain Adventures",
      image: Exploretwo,
      description:
        "Hike, climb, and discover the magic of nature in breathtaking mountains and charming valleys.",
    },
    {
      title: "Cultural Journeys",
      image: Explorethree,
      description:
        "Dive deep into history and explore ancient cities, vibrant markets, and civilizations with professional guides.",
    },
  ];

  return (
    <div className="w-screen py-10 px-2 overflow-hidden">
      <p
        className="text-center judson-regular font-normal text-one text-[30px] lg:text-[48px]"
        data-aos="zoom-in-up"
      >
        Explore Your Next Adventure
      </p>

      <p
        className="text-center open-sans-regular font-normal text-black text-[20px] lg:text-[24px] my-5"
        data-aos="fade-up"
      >
        Choose from our carefully crafted trips tailored to all tastes – whether you’re a fan of beaches,
        mountains, or historic cities.
      </p>

      <div className="flex flex-wrap justify-center gap-6 px-4 lg:px-10">
        {explore.map((dev, index) => {
          const animation = index % 2 === 0 ? 'fade-right' : 'fade-left';

          return (
            <a
              href="#"
              key={index}
              className="group relative block w-full sm:w-[48%] lg:w-1/4 h-[440px] bg-black rounded-lg overflow-hidden"
              data-aos={animation}
            >
              <img
                alt={dev.title}
                src={dev.image}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
              />

              <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                <div>
                  <p className="text-2xl lg:text-3xl tracking-wider font-semibold text-white uppercase">
                    {dev.title}
                  </p>
                  <div className="mt-4">
                    <p className="text-[16px] text-white leading-relaxed">{dev.description}</p>
                  </div>
                </div>

                <div>
                  <button className="text-white px-4 py-2 font-medium text-[18px] flex gap-2 items-center backdrop-blur-lg rounded-xl group-hover:bg-white/10 transition">
                    <span>View</span> <MdArrowOutward />
                  </button>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Adventure;
