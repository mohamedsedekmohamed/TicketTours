import React from 'react'
import Navtwo from "../../component/Navtwo";
import Internationall from '../../../assets/International Tourism.png'
const International = () => {
  return (
 <div className="">
      <Navtwo />
      <div className="bg-nine w-[95%]   py-2 md:py-4 lg:py-8 mx-auto flex justify-between items-center">
        <span className="text-2xl md:text-4xl lg:text-6xl text-one font-semibold px-5"> International Tourism</span>
        <div className="w-1/2 flex justify-center items-center ">
          <img src={Internationall}
          alt="ss"
          />
        </div>
         </div>
    </div>  )
}

export default International