import React, { useEffect, useState } from 'react';
import home from '../../assets/home.jpg';
import Nav from '../component/Nav';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import oneb from '../../assets/oneb.jpg'
import twob from '../../assets/twob.jpg'
import threeb from '../../assets/threeb.jpg'
import fourb from '../../assets/fourb.jpg'
import AOS from "aos";
import Exploreone from "../../assets/Exploreone.jpg"
import Exploretwo from '../../assets/Exploretwo.jpg'
import Explorethree from '../../assets/Explorethree.jpg'
import { MdArrowOutward } from "react-icons/md";
import manbox from '../../assets/manbox.png'
import { AiFillStar, AiOutlineStar  } from 'react-icons/ai';
import { FaStarHalfAlt } from "react-icons/fa";
import Footer from './Footer'

const Home = () => {
    useEffect(() => {
    AOS.init({ duration: 1000, once: true });
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
    stars.push(<FaStarHalfAlt  key="half" className="text-one" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<AiOutlineStar key={`empty-${i}`} className="text-one" />);
  }

  return stars;
};
  const explore = [
  {
    title: "Beach Getaways",
    image:Exploreone,
        description:
"Hike, climb, and discover the magic of nature in breathtaking mountains and charming valleys."},  {
    title: "Mountain Adventures",
    image:Exploretwo,
        description:
      "Creative designer with a passion for clean user interfaces and intuitive experiences.",
  },
  {
    title: "Cultural Journeys",
    image:Explorethree,
        description:
"Dive deep into history and explore ancient cities, vibrant markets, and civilizations with professional guides."  },
];
const boxs=[
  {
      description: `"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"`,
      image:manbox ,
      name:"ahmed"
},
  {
      description: `"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"`,
      image:manbox ,
      name:"ahmed"
},
  {
      description: `"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"`,
      image:manbox ,
      name:"ahmed"
},
  {
      description: `"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"`,
      image:manbox ,
      name:"ahmed"
},
  {
      description: `"The religious tour to Mecca was spiritual and stress-free. The team took care of every detail. Thank you for making this dream come true!"`,
      image:manbox ,
      name:"ahmed"
},
]
  const data = [
    {
      label: "How can I book a trip?",
      description: `How can I book a trip? `,
    },
    {
      label: "Can I customize my trip?",
      description: `Can I customize my trip?`,
    },
    {
      label: "What payment methods do you accept?",
      description: `What payment methods do you accept?`,
    },
    {
      label: " Is travel insurance included?",
      description: `Is travel insurance included?`,
    },
  ];const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "Local Tourism",
      image:
oneb    },
    {
      title: "International Tourism ",
      image:
twob    },
    {
      title: "Religious Tourism ",
      image:
threeb    },
    {
      title: "Medical Tourism ",
      image:
fourb    },
  ];
  const destinations = [
  {
    title: "Sharm El-Sheikh, Egypt",
    desc: "Dive into the Red Sea",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 170,
    oldPrice: 200,
  },
  {
    title: "Cairo, Egypt",
    desc: "Explore the history of the pyramids",
    image:
      "https://images.unsplash.com/photo-1591871930973-bfc0483b2643?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 150,
    oldPrice: 180,
  },
  {
    title: "Luxor, Egypt",
    desc: "Walk through ancient temples",
    image:
      "https://images.unsplash.com/photo-1595327451857-1ed4dcdf5706?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 120,
    oldPrice: 160,
  }, {
    title: "Sharm El-Sheikh, Egypt",
    desc: "Dive into the Red Sea",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 170,
    oldPrice: 200,
  },
  {
    title: "Cairo, Egypt",
    desc: "Explore the history of the pyramids",
    image:
      "https://images.unsplash.com/photo-1591871930973-bfc0483b2643?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 150,
    oldPrice: 180,
  },
  {
    title: "Luxor, Egypt",
    desc: "Walk through ancient temples",
    image:
      "https://images.unsplash.com/photo-1595327451857-1ed4dcdf5706?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    price: 120,
    oldPrice: 160,
  },
];
  return (
    <div className='w-screen min-h-screen '>
      <div
        className="w-screen h-screen bg-cover bg-center relative flex flex-col items-center"
        style={{ backgroundImage: `url(${home})` }}
      >
        {/* Navbar */}
        <div className='absolute top-7 lg:top-5 z-10 w-full'>
          <Nav />
        </div>

        {/* Content */}
        <div className='flex flex-col   gap-20  lg:gap-10 justify-center items-center px-4 mt-50 sm:mt-65 text-center'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-lg'>
            Explore the World With Ease
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white drop-shadow'>
            Book unforgettable journeys tailored to your style, budget, and destination dreams.
          </p>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row gap-3 backdrop-blur-2xl bg-white/30 rounded-xl p-4 shadow-md items-stretch sm:items-end w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
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
            <button className="flex items-center justify-center gap-1 bg-one hover:bg-one/90 text-white text-sm px-5 py-2 rounded-lg transition-all h-[42px]">
              <IoMdSearch className="text-lg" />
              Search
            </button>
          </div>
        </div>
      </div>
{/*  */}
      <div className=' w-screen h-fit py-20 flex flex-col px-4 gap-5 justify-center items-center '>
<span className='text-[32px] font-semibold text-one'>Explore Our Travel Categories</span>
<span className='text-[20px] font-semibold text-three  px-5 lg:px-20'>Find the perfect trip that suits your needs — whether you're looking for relaxation,
healing, spiritual experiences, or local adventures.
</span>
   <div className="flex flex-wrap  gap-6 py-4 px-5  items-center justify-center lg:px-10">
      {items.map((item, index) => (
        <a
          href="#"
          key={index}
          className="group relative flex  items-end  w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-black overflow-hidden rounded-xl "
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
      {/*  */}
          <div className=' w-screen h-fit py-20 flex flex-col px-4  gap-5 justify-center items-center '>
<span className='text-[32px] font-semibold text-one'>Top Picks for Your Next Getaway   </span>
<span className='text-[20px] font-semibold text-three  px-5 lg:px-20'>Handpicked destinations loved by our travelers — discover places that promise unforgettable memories.
</span>
 
<div className="w-full overflow-x-auto ">
  <div className="flex gap-4 w-max px-4 py-6">
    {destinations.map((item, index) => (
      <a
        key={index}
        href="#"
        className="min-w-[250px] max-w-[300px] bg-white rounded-xl shadow-md"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-56 w-full object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-one">{item.title}</h3>
          <p className="mt-2 text-sm text-three">{item.desc}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-four font-bold">${item.price}</span>
            <span className="text-sm text-three line-through">${item.oldPrice}</span>
          </div>
        </div>
      </a>
    ))}
  </div>
</div>

     <div className='flex gap-3 items-center rounded-3xl bg-one py-2 px-5 hover:bg-one/80'> <span className='text-white pb-2 text-2xl'>View more</span><svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.1139 17.5898L14.6349 30.2548C14.4296 30.4227 14.1661 30.5022 13.9022 30.4758C13.6383 30.4495 13.3956 30.3193 13.2277 30.1141C13.0598 29.9088 12.9802 29.6452 13.0066 29.3813C13.033 29.1174 13.1631 28.8748 13.3684 28.7069L28.8474 16.0419C29.0526 15.8739 29.3162 15.7944 29.5801 15.8208C29.844 15.8472 30.0866 15.9773 30.2546 16.1826C30.4225 16.3879 30.502 16.6514 30.4757 16.9153C30.4493 17.1792 30.3191 17.4218 30.1139 17.5898Z" fill="white"/>
<path d="M29.1603 17.0781L17.4903 15.9127C17.226 15.8863 16.9831 15.756 16.815 15.5505C16.6468 15.345 16.5672 15.081 16.5936 14.8168C16.62 14.5526 16.7503 14.3097 16.9558 14.1415C17.1614 13.9733 17.4253 13.8937 17.6895 13.9201L30.3543 15.1864C30.4852 15.1994 30.6122 15.238 30.7282 15.3001C30.8441 15.3622 30.9467 15.4466 31.03 15.5484C31.1133 15.6502 31.1757 15.7674 31.2136 15.8933C31.2515 16.0193 31.2642 16.1515 31.251 16.2824L29.9847 28.9471C29.9582 29.2114 29.8279 29.4543 29.6224 29.6224C29.4169 29.7906 29.153 29.8702 28.8887 29.8438C28.6245 29.8174 28.3816 29.6871 28.2134 29.4816C28.0453 29.276 27.9656 29.0121 27.9921 28.7479L29.1603 17.0781Z" fill="white"/>
</svg>
</div>
      </div>
      {/*  */}
         <div  className="w-screen py-10 px-2  overflow-hidden">
        <p
          className="text-center judson-regular font-normal text-one  text-[30px] lg:text-[48px]"
          data-aos="zoom-in-up"
        >
Got Questions? We’ve Got Answers!{" "}
        </p>
        <p
          className="text-center  open-sans-regular font-normal text-black text-[20px] lg:text-[24px] my-5"
          data-aos="fade-up"
        >
         Find quick answers to the most common questions travelers ask before booking.
        </p>
        <div className="w-full px-10 mx-auto flex flex-col  open-sans-regular gap-5">
          {data.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className=" bg-five   ">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  <h3 className="text-xl font-semibold text-threeteen p-4 w-full">
                    {item.label}
                  </h3>
                  <span className="text-2xl text-threeteen p-4">
                    {isOpen ? "-" : "+"}
                  </span>
                </div>
                <div className="h-4 bg-white w-full " />
                {isOpen && (
                  <div className="mt-3">
                    <p className="text-[18px] p-2 ">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/*  */}
            <div  className="w-screen py-10 px-2   overflow-hidden">
        <p
          className="text-center judson-regular font-normal text-one  text-[30px] lg:text-[48px]"
          data-aos="zoom-in-up"
        >
Explore Your Next Adventure{" "}
        </p>
        <p
          className="text-center  open-sans-regular font-normal text-black text-[20px] lg:text-[24px] my-5"
          data-aos="fade-up"
        >
Choose from our carefully crafted trips tailored to all tastes – whether you’re a fan of beaches,
mountains, or historic cities.        </p>
<div className="flex flex-wrap justify-center gap-6">
  {explore.map((dev, index) => (
    <a
      href="#"
      key={index}
      className="group relative block w-full sm:w-[48%] lg:w-1/4 h-[440px] bg-black rounded-lg overflow-hidden"
    >
      <img
        alt={dev.name}
        src={dev.image}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col gap-20">
        <div>
          <p className="text-3xl tracking-widest font-semibold text-white uppercase">
            {dev.title}
          </p>
          <div className="mt-6">
            <p className="text-[18px] text-white">{dev.description}</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="text-white px-4 py-2 font-medium text-[18px] flex gap-2 items-center backdrop-blur-lg rounded-xl group-hover:bg-white/10 transition">
            <span>View</span> <MdArrowOutward />
          </button>
        </div>
      </div>
    </a>
  ))}
</div>


       
      </div>
      {/*  */}
         <div  className="w-screen py-10 px-2   overflow-hidden">
        <p
          className="text-center judson-regular font-normal text-one   text-[30px] lg:text-[48px]"
          data-aos="zoom-in-up"
        >
What Our Customers Say{" "}
        </p>
        <p
          className="text-center  open-sans-regular font-normal text-black text-[20px] lg:text-[24px] my-5"
          data-aos="fade-up"
        >
Real stories from real travelers — here’s what people loved about their journey with us.       </p>



     
<div className="w-full overflow-x-auto ">
  <div className="flex gap-4 w-max px-4 py-6">
    {boxs.map((item, index) => (
    <a href="#" className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
  <div className="sm:flex sm:justify-between w-75  sm:gap-4 lg:gap-6">
    <div className="mt-4 sm:mt-0">
     

      <p className="mt-1 text-sm text-gray-700">{item.description}</p>

     
    </div>
  </div>

  <dl className="my-6 flex gap-4 lg:gap-6">
 <div className=" flex items-center gap-1 text-sm text-gray-700">
  {renderStars(3.5)}
</div>

  
  </dl>
   <div className="sm:order-last sm:shrink-0 flex gap-1.5 items-center">
      <img
        alt=""
src={item.image}   
     className="size-16 rounded-full object-cover sm:size-[72px]"
      />
      <span>{item.name}</span>
    </div>
</a>
    ))}
  </div>
</div>

      </div>
      <Footer/>
    </div>
  );
};

export default Home;
