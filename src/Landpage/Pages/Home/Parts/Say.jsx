import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import manbox from '../../../../assets/manbox.png';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';

const Say = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-one" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-one" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="text-one" />);
    }

    return stars;
  };

  const boxs = [
    {
      description:
        '"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"',
      image: manbox,
      name: 'Ahmed',
    },
    {
      description:
        '"This trip exceeded all expectations! From the hotel to the tour guides, everything was perfect."',
      image: manbox,
      name: 'Fatima',
    },
    {
      description:
        '"Our cultural journey was eye-opening. The team made it so easy and informative!"',
      image: manbox,
      name: 'Mohammed',
    },
    {
      description:
        '"I felt safe and supported throughout the trip. Highly recommended for first-time travelers!"',
      image: manbox,
      name: 'Sara',
    },
    {
      description:
        '"Wonderful experience! Organized, professional, and spiritually uplifting. Will book again."',
      image: manbox,
      name: 'Youssef',
    },
  ];

  return (
    <div className="w-screen py-14 px-4 overflow-hidden">
      <p
        className="text-center judson-regular font-normal text-one text-[30px] lg:text-[48px]"
        data-aos="fade-up"
      >
        What Our Customers Say
      </p>
      <p
        className="text-center open-sans-regular font-normal text-black text-[18px] lg:text-[24px] my-4"
        data-aos="fade-up"
      >
        Real stories from real travelers — here’s what people loved about their journey with us.
      </p>

      <div className="w-full overflow-x-auto mt-10">
        <div className="flex gap-6 w-max px-4 py-4">
          {boxs.map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex flex-col justify-between gap-4 hover:shadow-xl transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>

              <div className="flex items-center gap-1">{renderStars(4.5)}</div>

              <div className="flex items-center gap-3 mt-2">
                <img
                  alt={item.name}
                  src={item.image}
                  className="size-12 lg:size-16 rounded-full object-cover"
                />
                <span className="text-[16px] font-medium capitalize text-gray-800">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Say;
