import React, { useState } from "react";
import contactImage from "../../assets/content.png";
import Footer from "./Footer";
import Navtwo from "../component/Navtwo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from "react-icons/fa";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // simple validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.warn("Name is required");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warn("Valid email is required");
      return false;
    }
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
      toast.warn("Valid phone number is required");
      return false;
    }
    if (!formData.message.trim()) {
      toast.warn("Message cannot be empty");
      return false;
    }
    return true;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://bcknd.tickethub-tours.com/api/user/landpage/contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Something went wrong!");

      await res.json();
      toast.success("Message sent successfully ✅");
      setFormData({ name: "", email: "", phone: "", message: "" }); // reset
    } catch (err) {
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-base sm:text-lg lg:text-xl mb-4 text-three open-sans-regular leading-relaxed">
            We’d love to hear from you! Whether you have a question about our
            trips, need assistance with booking, or just want to say hi — our
            team is ready to help.
          </p>

          <form
            className="w-full space-y-4 judson-bold"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div>
              <label className="block text-seven text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-seven text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-seven text-sm mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-seven text-sm mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full rounded-3xl p-3 border border-gray-300 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-one"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center py-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-one w-80 text-white text-lg px-6 py-3 rounded-3xl transition transform hover:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
<a
  href="https://wa.me/201035555313"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
>
  <FaWhatsapp size={28} />
</a>
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Contactus;
