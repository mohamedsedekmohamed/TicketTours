import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import Navtwo from '../component/Navtwo';

const Aboutus = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <Navtwo />

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop"
                className="rounded"
                alt="Travel"
                data-aos="zoom-in"
              />
            </div>
            <div>
              <div className="max-w-lg md:max-w-none">
                <h2
                  className="text-2xl font-semibold text-one sm:text-3xl"
                  data-aos="fade-up"
                >
                  Discover the World with Ticket Hub
                </h2>

                <p
                  className="mt-4 text-six font-normal text-[16px]"
                  data-aos="fade-right"
                >
                  At Ticket Hub, we believe that travel is a journey full of
                  discovery and unforgettable experiences...
                </p>

                <p
                  className="mt-4 text-six font-medium text-[24px]"
                  data-aos="fade-left"
                >
                  We offer services in domestic, international, religious, and
                  medical tourism...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Aboutus;
