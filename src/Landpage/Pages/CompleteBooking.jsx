import React, { useState } from 'react'
import fawry from '../../assets/fawry.png'
import instapay from '../../assets/instapay.png'
import visa from '../../assets/Visa.png'
import vodafone from '../../assets/vodafone.png'

const CompleteBooking = () => {
  const [adults, setAdults] = useState(10)
  const [children, setChildren] = useState(5)
  const [infants, setInfants] = useState(1)

  const pricePerAdult = 500
  const pricePerChild = 300
  const discount = adults >= 5 ? 0.1 : 0

  const adultsTotal = adults * pricePerAdult
  const childrenTotal = children * pricePerChild
  const discountAmount = adultsTotal * discount
  const total = adultsTotal + childrenTotal - discountAmount

  const paymentOptions = [
    { id: 'fawry', label: 'Fawry', image: fawry },
    { id: 'visa', label: 'Visa', image: visa },
    { id: 'vodafone', label: 'Vodafone Cash', image: vodafone },
    { id: 'instapay', label: 'InstaPay', image: instapay }
  ]

  const [selectedPayment, setSelectedPayment] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Form submitted with payment method: ${selectedPayment}`)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 bg-white text-white p-6 rounded-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-black">Your Info</h2>

        {[
          { label: 'Full Name', id: 'name', type: 'text', placeholder: 'Full Name' },
          { label: 'Email', id: 'email', type: 'email', placeholder: 'you@company.com' },
          { label: 'Phone', id: 'phone', type: 'tel', placeholder: 'Phone' },
          { label: 'Notes', id: 'notes', type: 'text', placeholder: 'Notes' }
        ].map(({ label, id, type, placeholder }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Payment Options */}
        <h3 className="text-xl font-semibold text-black mt-6 mb-3">Payment</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {paymentOptions.map((method) => (
            <button
              type="button"
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`flex flex-col items-center justify-center rounded-lg p-2 border transition transform ${
                selectedPayment === method.id
                  ? 'border-one scale-105 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <img
                src={method.image}
                alt={method.label}
                className="w-12 h-12 object-contain mb-2"
              />
              <span
                className={`text-sm ${
                  selectedPayment === method.id ? 'text-one font-semibold' : 'text-gray-600'
                }`}
              >
                {method.label}
              </span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-one hover:bg-one/95 hover:scale-105 text-white py-2 px-4 rounded-xl font-semibold"
          disabled={!selectedPayment}
        >
          Confirm & Pay
        </button>
      </form>

      {/* Summary */}
      <div className="w-full lg:w-1/2 bg-gray-50 rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Booking</h2>

        <div className="mb-2 text-sm">
          <span className="line-through text-gray-400 mr-2">$250.00</span>
          <span className="text-lg font-semibold text-gray-900">From: $225.00</span>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Destination: <span className="text-gray-900 font-medium">San Francisco, California</span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-1">Date</h4>
          <p className="text-gray-500">07/16/2025</p>
        </div>

        {/* People Count */}
        {[
          { label: 'Adults', desc: 'Over 18+', count: adults, setCount: setAdults },
          { label: 'Children', desc: 'Under 12', count: children, setCount: setChildren },
          { label: 'Infant', desc: 'Under 3', count: infants, setCount: setInfants }
        ].map(({ label, desc, count, setCount }) => (
          <div key={label} className="flex justify-between items-center border-t py-3">
            <div>
              <p className="font-medium text-gray-800">{label}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="w-7 h-7 text-lg text-gray-600 bg-orange-100 rounded-full"
              >
                +
              </button>
              <span className="w-6 text-center text-sm">{count}</span>
              <button
                type="button"
                onClick={() => setCount(count > 0 ? count - 1 : 0)}
                className="w-7 h-7 text-lg text-gray-600 bg-orange-100 rounded-full"
              >
                -
              </button>
            </div>
          </div>
        ))}

        {/* Price Summary */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-md font-semibold text-gray-900 mb-2">Price Summary:</h3>
          <div className="flex justify-between text-sm py-1">
            <span>Adults ({adults} x ${pricePerAdult}):</span>
            <span>${adultsTotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm py-1 text-red-500">
              <span>10% Group Discount:</span>
              <span>-${discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm py-1">
            <span>Children ({children} x ${pricePerChild}):</span>
            <span>${childrenTotal}</span>
          </div>
          <div className="flex justify-between text-base font-semibold border-t pt-4 mt-3">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompleteBooking
