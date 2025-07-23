import React, { useState } from "react";
import Navtwo from "../component/Navtwo";
import a from "../../assets/Exploreone.jpg";
import { LuClock  } from "react-icons/lu";
import { IoFootsteps } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";

const TripDetails = () => {
  const [showAll, setShowAll] = useState(false);
  const images = [a, a, a, a, a, a, a, a, a];

  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const second = images[1];
  const third = images[2];
  const remainingImages = images.slice(3);

  return (
    <div>
      <Navtwo />
      <span className="px-3 text-[14px] font-normal text-ten">
        Medical Tourism / <span className="text-four">Trip to Alexandria</span>
      </span>
      <h4 className="text-3xl sm:text-4xl text-one font-semibold text-center mb-4 mt-2">
        name
      </h4>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] px-3">
        {/* Right side (Main Image, 2/3 width on large screens) */}
        <div className="sm:col-span-2 h-full">
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Left side stacked images */}
        <div className="flex sm:flex-col gap-2 h-full">
          {/* Image 2 */}
          <div className="flex-1 h-full">
            {second && (
              <img
                src={second}
                alt="Second"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>

          {/* Image 3 with overlay */}
          <div className="flex-1 h-full relative">
            {third && (
              <img
                src={third}
                alt="Third"
                className="w-full h-full object-cover rounded-xl"
              />
            )}

            {remainingImages.length > 0 && (
              <button
                className="absolute inset-0 bg-black/60 text-white text-lg font-semibold flex items-center justify-center rounded-xl"
                onClick={() => setShowAll(true)}
              >
                +{remainingImages.length}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for showing all images */}
      {showAll && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4 overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setShowAll(false)}
          >
            &times;
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 w-full max-w-6xl">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Image ${idx}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
      <div className="  min-h-screen mt-20 p-8 font-sans">
        {/* Header Section */}
    <div className="flex flex-wrap justify-start md:justify-around   items-center mb-12 ">
  {/* Duration */}
  <div className="flex flex-row items-center mx-4 my-2">
    <div className="border-2 border-one p-3 rounded-md">
      <LuClock className="text-one text-3xl" />
    </div>
    <div className="flex flex-col gap-0.5 px-2 items-start text-left">
      <span className="text-xl font-semibold text-one">Duration</span>
      <span className="text-one">10 Hours</span>
    </div>
  </div>

  {/* Tour Type */}
  <div className="flex flex-row items-center mx-4 my-2">
    <div className="border-2 border-one p-3 rounded-md">
      <IoFootsteps className="text-one text-3xl" />
    </div>
    <div className="flex flex-col gap-0.5 px-2 items-start text-left">
      <span className="text-xl font-semibold text-one">Tour Type</span>
      <span className="text-one">Daily Tour</span>
    </div>
  </div>

  {/* Group Size */}
  <div className="flex flex-row items-center mx-4 my-2">
    <div className="border-2 border-one p-3 rounded-md">
      <FaUserFriends className="text-one text-3xl" />
    </div>
    <div className="flex flex-col gap-0.5 px-2 items-start text-left">
      <span className="text-xl font-semibold text-one">Group Size</span>
      <span className="text-one">10 People</span>
    </div>
  </div>

  {/* Languages */}
  <div className="flex flex-row items-center mx-4 my-2">
    <div className="border-2 border-one p-3 rounded-md">
      <MdGTranslate className="text-one text-3xl" />
    </div>
    <div className="flex flex-col gap-0.5 px-2 items-start text-left">
      <span className="text-xl font-semibold text-one">Languages</span>
      <span className="text-one">Español, Japanese</span>
    </div>
  </div>
</div>


        <hr className="border-gray-700 my-8" />

        {/* About This Tour Section */}
        <div className="mb-12">
          <h2 className="text-3xl text-one font-bold mb-4">About This Tour</h2>
          <p className="text-one leading-relaxed">
            Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text.
            It Has Roots In A Piece Of Classical Latin Literature From 45 BC,
            Making It Over 2000 Years Old. Richard McClintock, A Latin Professor
            At Hampden-Sydney College In Virginia, Looked Up One Of The More
            Obscure Latin Words, Consectetur, From A Lorem Ipsum Passage, And
            Going Through The Cites Of The Word In Classical Literature,
            Discovered The Undoubtable Source.
          </p>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Highlights Section */}
        <div className="mb-12">
          <h2 className="text-3xl  text-one font-bold mb-4">Highlights</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Visit Eight Villages Showcasing Polynesian Culture
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Canoe Ride, Tattoos, Spear Throwing, Ukulele Lessons And Fishing
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Spectacular Polynesian Evening Dinner Show 'Ha: Breath Of Life'
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Optional Transportation From Waikiki Hotels
              </span>
            </li>
          </ul>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Included/Excluded Section */}
        <div>
          <h2 className="text-3xl font-bold text-one mb-4">Included/Excluded</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Specialized Bilingual Guide</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Additional Services</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Private Transport</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Insurance</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Entrance Fees (Cable And Car And Moon Valley)
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Drink</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">
                Box Lunch Water, Banana Apple And Chocolate
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-one">Tickets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
