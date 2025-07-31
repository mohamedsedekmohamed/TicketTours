import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Categories = ({ data }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (data?.length) {
      const imagePromises = data.map((item) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.imagePath;
          img.onload = resolve;
          img.onerror = resolve; // to avoid hanging if image fails
        });
      });

      Promise.all(imagePromises).then(() => setImagesLoaded(true));
    }
  }, [data]);

  if (!imagesLoaded) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-white">
        <p className="text-lg text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-fit py-20 flex flex-col px-4 gap-5 justify-center items-center">
      <span data-aos="fade-up" className="text-[32px] font-semibold text-one">
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
        {data?.map((item, index) => (
          <a
            href="#"
            key={item.id}
            data-aos="zoom-in"
            data-aos-delay={300 + index * 150}
            className="group relative flex items-end w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-black overflow-hidden rounded-xl"
          >
            <img
              alt={item.name}
              src={item.imagePath}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <p className="text-xl font-bold text-white sm:text-2xl p-4 sm:p-6 lg:p-8 z-10">
              {item.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
