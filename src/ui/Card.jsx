import React from 'react'

const Card = () => {
  return (
    <div><a href="#" className="block rounded-lg p-4 shadow-xs shadow-indigo-100">
  <img
    alt=""
    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    className="h-56 w-full rounded-md object-cover"
  />
<div className="mt-2">
  <h3 className="text-lg font-semibold text-gray-900">اسم المنتج</h3>

  <p className="text-sm text-gray-500 mt-1">وصف بسيط للمنتج يوضح التفاصيل أو المميزات.</p>
  <p className="text-sm text-gray-500 mt-1">Days </p>

  <div className="mt-2 flex items-center gap-2">
    <span className="text-sm text-gray-400 line-through">$200</span>
    <span className="text-sm text-four font-medium">$170</span>
  </div>
</div>

</a></div>
  )
}

export default Card