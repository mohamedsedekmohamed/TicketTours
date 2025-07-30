import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { GoArrowDownRight } from "react-icons/go";
import AOS from "aos";
import logo from "../../assets/newlogo.png";
import "aos/dist/aos.css";

const Navtwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  const navLinks = [
    { name: "Home ", path: "/" },
    { name: "Trips", subLinks: true },
    { name: "About Us ", path: "/aboutus" },
    { name: "Connect us ", path: "/contactus" },
  ];
  const TripsLinks = [
    { name: "Local Tourism", path: "/localtourism" },
    { name: "International Tourism ", path: "/internationaltourism" },
    { name: "Religious Tourism", path: "/religioustourism" },
    { name: "Medical Tourism", path: "/medicalTtourism" },
  ];

  const currentService = TripsLinks.find((service) =>
    location.pathname.startsWith(service.path)
  );

  const isInServices = Boolean(currentService);

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <div className="open-sans-light  h-fit  z-50 w-full ">
      <div className="w-screen mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between md:gap-5 backdrop-blur-md  px-3 my-2 rounded-2xl lg:gap-20 h-[100px] items-center">
          <div className="flex gap-1 items-center">
            <img src={logo} className=" w-10 h-10 md:w-20 md:h-20 " />
            <span className="text-four   text-[16px] md:text-[20px] lg:text-[32px]">
              Ticket Hub
            </span>
          </div>

          <div className="hidden md:flex gap-6 relative">
            {navLinks.map((link, i) => {
              if (link.subLinks) {
                return (
                  <div
                    key={i}
                    className="relative"
                    onClick={() => setDropdownOpen((p) => !p)}
                  >
                    <button
                      className={`relative md:text-[12px] lg:text-[16px] font-medium group p-1 ${
                        isInServices ? "text-three" : " text-three/80  "
                      }`}
                    >
                      {isInServices ? currentService.name : link.name}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                          isInServices ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-0 mt-4 w-[230px] bg-two flex flex-col shadow-lg rounded-[24px] py-2 z-[9999]">
                        {TripsLinks.map((service, idx) => (
                          <Link
                            to={service.path}
                            key={idx}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2 text-three/80 text-[20px] hover:text-three transition w-full text-left"
                          >
                            {service.name} <MdArrowOutward/>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative md:text-[12px] lg:text-[16px]  font-medium group p-1 ${
                    isActive(link.path)
                      ? "text-one font-black"
                      : "text-three/90"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-one transition-all duration-300 ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className=" hidden md:flex gap-2">
            <button 
className="w-[110px] h-[40px] bg-one text-white hover:text-one/70  hover:bg-white/10 border border-one rounded-[24px] md:text-[18px] lg:text-[20px]  font-medium "
            >              {" "}
              Sign In{" "}
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-[110px] h-[40px] text-one hover:text-one/70 border border-one rounded-[24px] md:text-[18px] lg:text-[20px]  font-medium "
            >
              Login{" "}
            </button>
          </div>
          {/*  */}
          <div className="flex md:hidden gap-2">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="w-[50px] h-[40px] text-two hover:bg-one/90 hover:text-two/80 bg-one rounded-[24px] text-[10px] font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-[50px] h-[40px] text-one hover:text-one/70 border border-one rounded-[24px] text-[10px] font-medium"
            >
              Login
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="  md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <CiMenuFries className="text-one text-4xl" />
              ) : (
                <CiMenuBurger className="text-one  text-4xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 z-40 pb-6 space-y-4 bg-white backdrop-blur">
          {navLinks.map((link, i) => {
            if (link.subLinks) {
              const isDropdownOpen = mobileDropdownOpen === link.name;

              return (
                <div key={i}>
                  <button
                    onClick={() =>
                      setMobileDropdownOpen(isDropdownOpen ? null : link.name)
                    }
                    className="w-full flex justify-between items-center px-3 py-2 font-normal rounded text-black hover:text-white"
                  >
                    {isInServices ? currentService?.name : link.name}
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {TripsLinks.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setIsOpen(false);
                            navigate(service.path);
                            setMobileDropdownOpen(null);
                          }}
                          className="block w-full text-left px-3 py-2 text-black hover:bg-one hover:text-white rounded"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={i}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded font-normal group relative ${
                  isActive(link.path)
                    ? "text-black"
                    : "text-black hover:bg-one hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navtwo;
