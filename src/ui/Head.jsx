import React from 'react'
import { useNavigate  } from 'react-router-dom'

const Head = ({name,kind}) => {
  const navigate =useNavigate ()
  return (
<div className='relative flex items-center mt-5'>
  <button onClick={()=>navigate(-1)} className='text-seven text-2xl font-normal'>
    {name} / <span className='text-one'>{kind}</span>
  </button>
  {/* <span className='absolute left-1/2 transform -translate-x-1/2 font-bold text-one text-2xl'>
    {kind}
  </span> */}
</div>

  )
}

export default Head