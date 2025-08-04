import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const QuestionsWithimage = ({ data }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-screen py-10 px-2 overflow-hidden">
      <p className=" text-one text-[30px] lg:text-[48px] font-normal" data-aos="zoom-in-up">
Itinerary      </p>

    
      <div className="w-full px-4 lg:px-10 mx-auto flex flex-col gap-5">
        {data.map((item, index) => {
          const isOpen = openIndex === index;
          const animation = index % 3 === 0 ? 'fade-right' : index % 3 === 1 ? 'zoom-in' : 'fade-left';

          return (
            <div
              key={item.id}
              className="bg-five rounded-lg shadow p-4"
              data-aos={animation}
            >
              <div className="flex items-start gap-4 cursor-pointer" onClick={() => toggle(index)}>
                {/* صورة على الشمال */}
                <img
                  src={item.imagePath || '/placeholder.jpg'} // تأكد من وجود imagePath
                  alt="question"
                  className="w-[80px] h-[80px] object-cover rounded-md"
                />

                {/* السؤال والرمز */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-threeteen">{item.question}</h3>
                    <span className="text-2xl text-threeteen">
                      {isOpen ? '-' : '+'}
                    </span>
                  </div>

                  {isOpen && (
                    <p className="mt-2 text-[18px] text-threeteen">{item.answer}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default QuestionsWithimage