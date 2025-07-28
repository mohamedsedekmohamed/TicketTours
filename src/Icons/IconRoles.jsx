import React from 'react'

const IconRoles = ({active}) => {
    const iconStyle = active ? "#091A2E" :"#ffffff";
  return (
    <div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconStyle} xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H3V13.5C3 15.8869 3.94821 18.1761 5.63604 19.864C7.32387 21.5518 9.61305 22.5 12 22.5C14.3869 22.5 16.6761 21.5518 18.364 19.864C20.0518 18.1761 21 15.8869 21 13.5V3ZM8.781 10.719L7.719 11.781L11.25 15.3105L17.031 9.531L15.9705 8.469L11.25 13.1895L8.781 10.719Z" fill={iconStyle}/>
</svg>

    </div>
  )
}

export default IconRoles