import React from 'react'
import contactImage from '../../assets/content.png'
import Footer from './Footer'
import { FaPhoneAlt } from 'react-icons/fa'
import Navtwo from '../component/Navtwo'

const Contactus = () => {
  return (
    <div>
      <Navtwo/>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row pt-10 min-h-screen">
        
      {/* Image Section */}
<div className="w-full lg:w-1/2 min-h-[400px] max-h-[800px] lg:min-h-full flex items-center justify-center bg-gray-100">
  <img
    src={contactImage}
    alt="Contact Us"
    className="w-full h-full object-cover lg:rounded-r-none rounded-lg shadow-md"
  />
</div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start px-6 lg:px-10 pt-4">
          <h2 className="text-one text-[32px] lg:text-[48px] mb-4 font-semibold judson-regular">
Get in Touch with Us          </h2>
          <p className="text-seven text-[18px] lg:text-[20px] mb-6  text-three open-sans-regular leading-relaxed">
We’d love to hear from you! Whether you have a question about our trips, need assistance with booking, or just want to say hi — our team is ready to help.          </p>

          <form className="w-full space-y-4 judson-bold">
            {/* Name */}
            <div>
              <label className="block text-seven text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-seven text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-seven text-sm mb-1">Phone</label>
              <div className="flex">
                <select
                  className="border border-gray-300 border-r-0 p-3 rounded-l-3xl text-sm text-gray-700 bg-white focus:outline-none"
                  defaultValue="EG"
                >
                  <option value="US">🇺🇸 +1</option>
                  <option value="EG">🇪🇬 +20</option>
                  <option value="SA">🇸🇦 +966</option>
                </select>
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full rounded-r-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-seven text-sm mb-1">Message</label>
              <textarea
                placeholder="How can we help?"
                className="w-full rounded-3xl p-3 border border-gray-300 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-one text-white text-lg px-6 py-3 rounded-3xl transition transform hover:scale-95"
              >
                Send 
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contactus
