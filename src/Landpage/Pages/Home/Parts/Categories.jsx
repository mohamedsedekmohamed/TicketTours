import React, { useEffect } from 'react';
import oneb from '../../../../assets/oneb.jpg';
import twob from '../../../../assets/twob.jpg';
import threeb from '../../../../assets/threeb.jpg';
import fourb from '../../../../assets/fourb.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const items = [
    { title: "Local Tourism", image: oneb },
    { title: "International Tourism", image: twob },
    { title: "Religious Tourism", image: threeb },
    { title: "Medical Tourism", image: fourb },
  ];

  return (
    <div className="w-screen h-fit py-20 flex flex-col px-4 gap-5 justify-center items-center">
      <span
        data-aos="fade-up"
        className="text-[32px] font-semibold text-one"
      >
        Explore Our Travel Categories
      </span>

      <span
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-[20px] font-semibold text-three px-5 lg:px-20 text-center"
      >
        Find the perfect trip that suits your needs — whether you're looking for
        relaxation, healing, spiritual experiences, or local adventures.
      </span>

      <div className="flex flex-wrap gap-6 py-4 px-5 items-center justify-center lg:px-10">
        {items.map((item, index) => (
          <a
            href="#"
            key={index}
            data-aos="zoom-in"
            data-aos-delay={300 + index * 150} // تدريج تأخير الانميشن لكل كرت
            className="group relative flex items-end w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-black overflow-hidden rounded-xl"
          >
            <img
              alt=""
              src={item.image}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <p className="text-xl font-bold text-white sm:text-2xl p-4 sm:p-6 lg:p-8 z-10">
              {item.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
