import React from 'react';
import contactImage from '../../assets/content.png';
import Footer from './Footer';
import Navtwo from '../component/Navtwo';

const Contactus = () => {
  return (
    <div>
      <Navtwo />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row pt-8 px-4 lg:px-16 gap-6">
        {/* Image Section */}
      <div className="w-full lg:w-1/2 max-h-[600px] lg:max-h-[90vh] overflow-hidden rounded-xl shadow-md">
  <img
    src={contactImage}
    alt="Contact Us"
    className="w-full h-full object-cover object-center"
  />
</div>  
        {/* Contact Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-one text-3xl sm:text-4xl lg:text-5xl mb-4 font-semibold judson-regular">
            Get in Touch with Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 text-three open-sans-regular leading-relaxed">
            We’d love to hear from you! Whether you have a question about our trips, need assistance with booking, or just want to say hi — our team is ready to help.
          </p>

          <form className="w-full space-y-5 judson-bold">
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <select
                  className="border border-gray-300 p-3 rounded-3xl sm:rounded-r-none text-sm text-gray-700 bg-white focus:outline-none w-full sm:w-1/4"
                  defaultValue="EG"
                >
                  <option value="US">🇺🇸 +1</option>
                  <option value="EG">🇪🇬 +20</option>
                  <option value="SA">🇸🇦 +966</option>
                </select>
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full sm:w-3/4 rounded-3xl sm:rounded-l-none p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
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
  );
};

export default Contactus;
