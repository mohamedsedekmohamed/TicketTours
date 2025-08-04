import React from 'react'
import Navtwo from "../../component/Navtwo";
import Religiouss from '../../../assets/Religious.png'
const Religious = () => {
  return (
<div className="">
      <Navtwo />
      <div className="bg-nine w-[95%]   py-2 md:py-4 lg:py-8 mx-auto flex justify-between items-center">
        <span className="text-2xl md:text-4xl lg:text-6xl text-one font-semibold px-5"> Religious Tourism</span>
        <div className="w-1/2 flex justify-center items-center ">
          <img src={Religiouss}
          alt="ss"
          />
        </div>
         </div>
    </div>  )
}

export default Religious