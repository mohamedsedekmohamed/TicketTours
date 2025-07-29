import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { SiFalcon } from "react-icons/si";
import sidepic from '../../assets/logo.png'
import IconsHome from '../../Icons/IconsHome';
import IconsCategoriesManagement from '../../Icons/IconsCategoriesManagement';
import IconToursManagement from '../../Icons/IconToursManagement';
import IconsUsersManagement from '../../Icons/IconsUsersManagement';
import IconsPromoCodes from '../../Icons/IconsPromoCodes';
import IconsFinancialSection from '../../Icons/IconsFinancialSection';
import IconsBookingsManagement from '../../Icons/IconsBookingsManagement';
import IconCurrencies from '../../Icons/IconCurrencies'
import IconExtras from '../../Icons/IconExtras'
import IconRoles from '../../Icons/IconRoles'
import IconCounnty from '../../Icons/IconCounnty'
import IconCity from '../../Icons/IconCity'
import IconFrontWebsiteManagement from '../../Icons/IconFrontWebsiteManagement'
import IconPaymentMethod from '../../Icons/IconPaymentMethod'
const links = [
  {
    to: "home",
    name: "Home",
    icon: <IconsHome />,
    iconActive: <IconsHome active />
  },
  {
    to: "categoriesmanagement",
    name: "Categories Management",
    icon: <IconsCategoriesManagement />,
    iconActive: <IconsCategoriesManagement active />
  }, {
    to: "toursmanagement",
    name: "Tours Management",
    icon: <IconToursManagement />,
    iconActive: <IconToursManagement active />
  }, {
    to: "usersmanagement",
    name: "Users Management",
    icon: <IconsUsersManagement />,
    iconActive: <IconsUsersManagement active />
  }, {
    to: "promocodes",
    name: "Promo Codes",
    icon: <IconsPromoCodes />,
    iconActive: <IconsPromoCodes active />
  }, {
    to: "financialsection",
    name: "Financial Section",
    icon: <IconsFinancialSection />,
    iconActive: <IconsFinancialSection active />
  },
   {
    to: "bookingsmanagement",
    name: "Bookings Management",
    icon: <IconsBookingsManagement />,
    iconActive: <IconsBookingsManagement active />
  },
   {
    to: "currencies",
    name: "Currencies",
    icon: <IconCurrencies />,
    iconActive: <IconCurrencies active />
  },
   {
    to: "extras",
    name: "Extras",
    icon: <IconExtras />,
    iconActive: <IconExtras active />
  },
   {
    to: "roles",
    name: "Admin Roles",
    icon: <IconRoles />,
    iconActive: <IconRoles active />
  },
   {
    to: "county",
    name: "County",
    icon: <IconCounnty />,
    iconActive: <IconCounnty active />
  },
   {
    to: "city",
    name: "City",
    icon: <IconCity />,
    iconActive: <IconCity active />
  },
   {
    to: "frontwebsitemanagement",
    name: "Website Management",
    icon: <IconFrontWebsiteManagement />,
    iconActive: <IconFrontWebsiteManagement active />
  },
   {
    to: "paymentmethod",
    name: "Payment Method",
    icon: <IconPaymentMethod />,
    iconActive: <IconPaymentMethod active />
  },

 
  
];

const AdminSidebar = ({ setIsOpen, isOpen }) => {
  const [isActive, setIsActive] = useState('/admin/home');
  const location = useLocation();

  useEffect(() => {
    const customPaths = {
      '/admin/addcategoriesmanagement': '/admin/categoriesmanagement',
      '/admin/addfinancialsection': '/admin/financialsection',
      '/admin/addpromocodes': '/admin/promocodes',
      '/admin/addtoursmanagement': '/admin/toursmanagement',
      '/admin/addusersmanagement': '/admin/usersmanagement',
      '/admin/addcurrencies': '/admin/currencies',
      '/admin/addextras': '/admin/extras',
      '/admin/addroles': '/admin/roles',
      '/admin/addcounty': '/admin/county',
      '/admin/addcity': '/admin/city',
      '/admin/addhomecover': '/admin/frontwebsitemanagement',
      '/admin/addfaq': '/admin/frontwebsitemanagement',
     
     
    };

    const newPath = customPaths[location.pathname] || location.pathname;
    setIsActive(newPath);
  }, [location.pathname]);

 
useEffect(() => {
  if (isOpen && window.innerWidth < 768) {
    setIsOpen(false);
  }
}, [location.pathname]);

  return (
    <>
    
    <div className={` block md:hidden bg-one  h-screen  ${isOpen?"absolute w-full":""}  rounded-tr-3xl top-0 z-50 transition-all duration-300 `}>
      
      <div
        className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        
        
<div className='flex justify-center items-center z-100'>
<img src={sidepic} alt="logo" className='w-10 h-10' />
</div>          
        {isOpen && (
          <h1 className="text-four font-bold text-[14px] lg:text-[20px]">Ticket Hub</h1>
        )}
      </div>

      <div className="border-1 border-gray-300 w-full px-3" />

      <nav
        className={`space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto`}
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {links.map((link) => {
          const isCurrent = isActive === `/admin/${link.to}`;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center transition-all duration-200 rounded-3xl h-[48px] ${isOpen ? 'w-full pl-4 gap-3' : 'justify-center w-full'} ${isCurrent ? 'bg-white' : ''}`}
            >
              <div className="w-6 h-6">
                {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                  className: `w-[22px] h-[22px] ${isCurrent ? 'text-one' : 'text-white'}`
                })}
              </div>
              {isOpen && (
                <span className={`font-bold text-[12px] lg:text-[16px] ${isCurrent ? 'text-one' : 'text-white'}`}>
                  {link.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
     <div className={` hidden md:block bg-one  h-screen sticky  rounded-tr-3xl top-0 z-50 transition-all duration-300 `}>
      
      <div
        className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        
<div className='flex justify-center items-center z-100'>
<img src={sidepic} alt="logo" className='w-10 h-10' />
</div>        
        {isOpen && (
          <h1 className="text-four font-bold text-[14px] lg:text-[24px]">Ticket Hub  </h1>
        )}
      </div>

      <div className="border-1 border-gray-300 w-full px-3" />

      <nav
        className={`space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto`}
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {links.map((link) => {
          const isCurrent = isActive === `/admin/${link.to}`;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center transition-all duration-200 rounded-2xl h-[48px] ${isOpen ? 'w-full pl-2 gap-1' : 'justify-center w-full'} ${isCurrent ? 'bg-white' : ''}`}
            >
              <div className="w-6 h-6">
                {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                  className: `w-[22px] h-[22px] ${isCurrent ? 'text-one' : 'text-white'}`
                })}
              </div>
              {isOpen && (
                <span className={`font-normal  text-[14px]  ${isCurrent ? 'text-one' : 'text-white'}`}>
                  {link.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
        </>

  );
};

export default AdminSidebar;
