import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Questions = ({ data }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // فلترة الأسئلة اللي status=true
  const filteredData = data?.filter(item => item.status) || [];

  return (
    <div className="w-screen py-10 px-2 overflow-hidden">
      <p
        className="text-center judson-regular font-normal text-one text-[30px] lg:text-[48px]"
        data-aos="zoom-in-up"
      >
        Got Questions? We’ve Got Answers!
      </p>

      <p
        className="text-center open-sans-regular font-normal text-black text-[20px] lg:text-[24px] my-5"
        data-aos="fade-up"
      >
        Find quick answers to the most common questions travelers ask before booking.
      </p>

      <div className="w-full px-4 lg:px-10 mx-auto flex flex-col open-sans-regular gap-5">
        {filteredData.map((item, index) => {
          const isOpen = openIndex === index;
          const animation =
            index % 3 === 0 ? 'fade-right' : index % 3 === 1 ? 'zoom-in' : 'fade-left';

          return (
            <div
              key={item.id}
              className="bg-five rounded-lg shadow"
              data-aos={animation}
            >
              <div
                className="flex justify-between items-center cursor-pointer p-4"
                onClick={() => toggle(index)}
              >
                <h3 className="text-xl font-semibold text-threeteen">{item.question}</h3>
                <span className="text-2xl text-threeteen">
                  {isOpen ? '-' : '+'}
                </span>
              </div>

              <div className="h-1 bg-white w-full" />

              {isOpen && (
                <div className="mt-2 px-4 pb-4">
                  <p className="text-[18px] text-threeteen">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
