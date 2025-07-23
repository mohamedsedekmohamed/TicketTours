import React from "react";
import footer from "../../assets/footer.png";
import { FaAngleRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" ">
      {/* Contact Us */}

      <div className=" bg-one text-white pt-15 pb-2 w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10">
        {/* About */}
        <div>
          <h2 className="text-[40px] font-bold mb-4 open-sans-bold">
            About Us
          </h2>
          <p className="text-[16px] font-normal leading-relaxed open-sans-regular">
            We are passionate travel experts dedicated to creating unforgettable
            journeys. Whether you're looking for local escapes or international
            adventures, we make planning your trip simple, safe, and exciting.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-normal text-2xl mb-3">Categories</h3>
          <ul className="space-y-2 text-[14px]">
            {[
              { name: "Local Tourism", path: "/localtourism" },
              { name: "International Tourism ", path: "/internationaltourism" },
              { name: "Religious Tourism", path: "/religioustourism" },
              { name: "Medical Tourism", path: "/medicalTtourism" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="hover:scale-105 transition flex items-center gap-2"
                >
                  <FaAngleRight className="text-white text-sm" /> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-normal text-2xl mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[14px]">
            {[
              { name: "Home", nav: "/" },
              { name: "Trips", nav: "/trips" },
              { name: "Contact Us", nav: "/contactus" },
              { name: "About Us", nav: "/aboutus" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.nav}
                  className="hover:scale-105 transition flex items-center gap-2"
                >
                  <FaAngleRight className="text-white text-sm" /> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex  justify-center">
          <img src={footer} alt="Footer" className=" h-full object-contain" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
