import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../../../ui/Loading";
import axios from "axios";

const Trips = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bcknd.tickethub-tours.com/api/user/landpage/featured-tours"
        );
        setData(response.data.data.tours);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="w-screen my-50">
        <Loading />
      </div>
    );
  // const destinations = [
  //   {
  //     title: "Sharm El-Sheikh, Egypt",
  //     desc: "Dive into the Red Sea",
  //     image:
  //       "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 170,
  //     oldPrice: 200,
  //   },
  //   {
  //     title: "Cairo, Egypt",
  //     desc: "Explore the history of the pyramids",
  //     image:
  //       "https://images.unsplash.com/photo-1591871930973-bfc0483b2643?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 150,
  //     oldPrice: 180,
  //   },
  //   {
  //     title: "Luxor, Egypt",
  //     desc: "Walk through ancient temples",
  //     image:
  //       "https://images.unsplash.com/photo-1595327451857-1ed4dcdf5706?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 120,
  //     oldPrice: 160,
  //   },
  //   {
  //     title: "Sharm El-Sheikh, Egypt",
  //     desc: "Dive into the Red Sea",
  //     image:
  //       "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 170,
  //     oldPrice: 200,
  //   },
  //   {
  //     title: "Cairo, Egypt",
  //     desc: "Explore the history of the pyramids",
  //     image:
  //       "https://images.unsplash.com/photo-1591871930973-bfc0483b2643?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 150,
  //     oldPrice: 180,
  //   },
  //   {
  //     title: "Luxor, Egypt",
  //     desc: "Walk through ancient temples",
  //     image:
  //       "https://images.unsplash.com/photo-1595327451857-1ed4dcdf5706?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 120,
  //     oldPrice: 160,
  //   },
  //   {
  //     title: "Sharm El-Sheikh, Egypt",
  //     desc: "Dive into the Red Sea",
  //     image:
  //       "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 170,
  //     oldPrice: 200,
  //   },
  //   {
  //     title: "Cairo, Egypt",
  //     desc: "Explore the history of the pyramids",
  //     image:
  //       "https://images.unsplash.com/photo-1591871930973-bfc0483b2643?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 150,
  //     oldPrice: 180,
  //   },
  //   {
  //     title: "Luxor, Egypt",
  //     desc: "Walk through ancient temples",
  //     image:
  //       "https://images.unsplash.com/photo-1595327451857-1ed4dcdf5706?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  //     price: 120,
  //     oldPrice: 160,
  //   },
  // ];

  return (
    <div>
      <div className="w-screen h-fit py-20 flex flex-col px-4 gap-5 justify-center items-center">
        <span className="text-[32px] font-semibold text-one">
          Top Picks for Your Next Getaway
        </span>
        <span className="text-[20px] font-semibold text-three px-5 lg:px-20">
          Handpicked destinations loved by our travelers — discover places that
          promise unforgettable memories.
        </span>

        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 w-max px-4 py-6">
            {data.map((item, index) => (
              <a
                key={index}
                href="#"
                data-aos={
                  index % 3 === 0
                    ? "fade-up"
                    : index % 3 === 1
                    ? "zoom-in"
                    : "fade-down"
                }
                className="min-w-[250px] max-w-[300px] bg-white rounded-xl shadow-md"
              >
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="h-56 w-full object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-one">{item.title}</h3>

                  <p className="mt-2 text-sm text-three">{item.describtion}</p>

                  <span className="text-sm text-three">
                    {Math.ceil(
                      (new Date(item.endDate) - new Date(item.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </span>

                  <div className="flex gap-2 items-center mt-4">
                    <span className="text-four font-bold">  ${item.price-item.discount}</span>
                    <span className="text-sm text-three line-through">
${item.price}                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div
          className="flex gap-3 items-center rounded-3xl bg-one py-2 px-5 hover:bg-one/80"
          data-aos="zoom-in"
        >
          <span className="text-white pb-2 text-2xl">View more</span>
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1139 17.5898L14.6349 30.2548C14.4296 30.4227 14.1661 30.5022 13.9022 30.4758C13.6383 30.4495 13.3956 30.3193 13.2277 30.1141C13.0598 29.9088 12.9802 29.6452 13.0066 29.3813C13.033 29.1174 13.1631 28.8748 13.3684 28.7069L28.8474 16.0419C29.0526 15.8739 29.3162 15.7944 29.5801 15.8208C29.844 15.8472 30.0866 15.9773 30.2546 16.1826C30.4225 16.3879 30.502 16.6514 30.4757 16.9153C30.4493 17.1792 30.3191 17.4218 30.1139 17.5898Z"
              fill="white"
            />
            <path
              d="M29.1603 17.0781L17.4903 15.9127C17.226 15.8863 16.9831 15.756 16.815 15.5505C16.6468 15.345 16.5672 15.081 16.5936 14.8168C16.62 14.5526 16.7503 14.3097 16.9558 14.1415C17.1614 13.9733 17.4253 13.8937 17.6895 13.9201L30.3543 15.1864C30.4852 15.1994 30.6122 15.238 30.7282 15.3001C30.8441 15.3622 30.9467 15.4466 31.03 15.5484C31.1133 15.6502 31.1757 15.7674 31.2136 15.8933C31.2515 16.0193 31.2642 16.1515 31.251 16.2824L29.9847 28.9471C29.9582 29.2114 29.8279 29.4543 29.6224 29.6224C29.4169 29.7906 29.153 29.8702 28.8887 29.8438C28.6245 29.8174 28.3816 29.6871 28.2134 29.4816C28.0453 29.276 27.9656 29.0121 27.9921 28.7479L29.1603 17.0781Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Trips;
