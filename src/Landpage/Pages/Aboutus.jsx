import React from 'react'
import Footer from './Footer'
import Navtwo from '../component/Navtwo'

 const Aboutus = () => {
  return (
    <div>
              <Navtwo/>

        <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
         <div>
        <img
          src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded"
          alt=""
        />
      </div>
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl font-semibold text-one  sm:text-3xl">
Discover the World with
Ticket Hub          </h2>

          <p className="mt-4 text-six font-normal text-[16px]">
           At Ticket Hub, we believe that travel is a journey full of discovery and
unforgettable experiences. Whether you're exploring new places within
your country or setting off on an international adventure, we're here to
make your trip easy and enjoyable.
          </p>
          <p className="mt-4 text-six font-medium text-[24px] ">
         We offer services in domestic, international, religious, and medical tourism, with
personalized support and competitive prices so you can enjoy your trip without
any hassle.
          </p>
        </div>
      </div>

 
    </div>
  </div>
</section>
              <Footer />

    </div>
  )
}
export default Aboutus