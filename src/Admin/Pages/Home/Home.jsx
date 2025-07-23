import React, { useEffect, useState } from "react";
import InputField from '../../../ui/InputField'
import InputArrow from '../../../ui/InputArrow'
import Inputfiltter from '../../../ui/Inputfiltter'
import SwitchButton from '../../../ui/SwitchButton'
import Loading from '../../../ui/Loading'
import FileUploadButton from '../../../ui/FileUploadButton'
import ButtonDone from '../../../ui/ButtonDone'
import FileUploadButtonArroy from '../../../ui/FileUploadButtonArroy'
import NavAndSearch from '../../component/NavAndSearch'
import Card from '../../../ui/Card'
import CompleteBooking from '../../../Landpage/Pages/CompleteBooking'
const Home = () => {
  return (
    <div>
      <InputField placeholder="name" value="aa"/> 
    <InputArrow  placeholder="name" value="aa"/>
    <Inputfiltter  placeholder="name" value="aa"/>
    <SwitchButton />
    <div className=' flex justify-center'>

    <Loading/>
    </div>
    <FileUploadButton kind="image"
    des={"Add your documents here, and you can upload up to 5 files max"}/>
    <FileUploadButtonArroy kind="image"
    des={"Add your documents here, and you can upload up to 5 files max"}/>
      <ButtonDone checkLoading={true}/>
      <ButtonDone />
      <NavAndSearch/>
      <Card/>
      <CompleteBooking/>
     </div>
  )
}

export default Home