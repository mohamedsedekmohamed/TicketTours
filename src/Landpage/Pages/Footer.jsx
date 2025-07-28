import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import footer from "../../assets/footer.png";
import { FaAngleRight } from "react-icons/fa";

const Footer = () => {
  const categories = [
    { name: "Local Tourism", path: "/localtourism" },
    { name: "International Tourism", path: "/internationaltourism" },
    { name: "Religious Tourism", path: "/religioustourism" },
    { name: "Medical Tourism", path: "/medicaltourism" },
  ];

  const quickLinks = [
    { name: "Home", nav: "/" },
    { name: "Trips", nav: "/trips" },
    { name: "Contact Us", nav: "/contactus" },
    { name: "About Us", nav: "/aboutus" },
  ];
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <footer className="bg-one text-white py-10 px-6 lg:px-20"         data-aos="fade-up"
>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h2 className="text-[28px] lg:text-[36px] font-bold open-sans-bold mb-4">About Us</h2>
          <p className="text-[15px] leading-relaxed open-sans-regular">
            We are passionate travel experts dedicated to creating unforgettable
            journeys. Whether you're looking for local escapes or international
            adventures, we make planning your trip simple, safe, and exciting.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-[14px]">
            {categories.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="hover:translate-x-1 transition-all flex items-center gap-2"
                >
                  <FaAngleRight className="text-sm" /> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[14px]">
            {quickLinks.map((item, index) => (
              <li key={index}>
                <a
                  href={item.nav}
                  className="hover:translate-x-1 transition-all flex items-center gap-2"
                >
                  <FaAngleRight className="text-sm" /> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={footer}
            alt="Footer"
            className="w-40 lg:w-52 h-auto object-contain"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center text-[13px] text-white/80">
        &copy; {new Date().getFullYear()} All rights reserved. Travel Company.
      </div>
    </footer>
  );
};

export default Footer;
