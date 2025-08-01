import React from 'react'

const IconToursManagement = ({active}) => {
    const iconStyle = active ? "#091A2E" :"#ffffff";
  return (
    <div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconStyle} xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C7.58902 2 4.00002 5.589 4.00002 9.995C3.97102 16.44 11.696 21.784 12 22C12 22 20.029 16.44 20 10C20 5.589 16.411 2 12 2ZM12 14C9.79002 14 8.00002 12.21 8.00002 10C8.00002 7.79 9.79002 6 12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14Z" fill={iconStyle}/>
</svg>


    </div>
  )
}


export default IconToursManagement