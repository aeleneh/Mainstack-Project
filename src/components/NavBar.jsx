import React, { useState } from 'react';
import MainstackLogo from './icons/MainstackLogo';
import HomeIcon from './icons/HomeIcon';
import AnalysticsIcon from './icons/AnalyticsIcon';
import PaymentsIcon from './icons/PaymentsIcon';
import Group from './icons/Group';
import Widgets from './icons/Widgets';
import Notifications from './icons/Notifications';
import Messages from './icons/Messages';
import Avi from './icons/Avi';
import Menu from './icons/Menu';

const navLinks = [
  { href: "/", icon: <HomeIcon />, label: "Home", active: false },
  { href: "#analytics", icon: <AnalysticsIcon />, label: "Analytics", active: false },
  { href: "#revenue", icon: <PaymentsIcon fill="#ffffff" />, label: "Revenue", active: true },
  { href: "#crm", icon: <Group />, label: "CRM", active: false },
  { href: "#widgets", icon: <Widgets />, label: "Apps", active: false },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[1408px] z-50 px-4 md:px-6'>
      {/* Main Navbar Pill */}
      <nav className='relative font-degulardisplay flex flex-row justify-between items-center h-16 w-full bg-white border border-[#EFF1F6] shadow-[0px_2px_6px_0px_#2D3B430F] rounded-full px-4 md:px-2 lg:px-6 transition-all duration-300'>
        
        <div className='flex-shrink-0 ml-2 md:ml-4'>
          <MainstackLogo />
        </div>

        {/* Desktop Navlinks - Hidden on mobile/small tablets */}
        <ul className='hidden lg:flex flex-row gap-1 items-center justify-center'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className={`flex flex-row gap-1.5 items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-[#EFF1F6] ${
                  link.active ? 'bg-black text-white hover:bg-black/90' : 'text-[#56616B]'
                }`}
              >
                {/* Clone element to pass fill colors if needed based on active state */}
                {link.icon}
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Section Icons */}
        <div className='flex flex-row items-center gap-2'>
          <div className='hidden md:flex flex-row items-center gap-1 lg:gap-3 mr-2'>
            <button className='p-2 hover:bg-[#EFF1F6] rounded-full transition-colors'><Notifications /></button>
            <button className='p-2 hover:bg-[#EFF1F6] rounded-full transition-colors'><Messages /></button>
          </div>

          {/* User Profile Pill */}
          <div className='hidden md:flex flex-row gap-2 items-center bg-[#EFF1F6] p-1 pr-3 rounded-full cursor-pointer hover:ring-2 ring-slate-100 transition-all'>
            <Avi />
            <Menu />
          </div>

          {/* Hamburger Button - Visible on mobile/tablet */}
          <button 
            className='lg:hidden p-2 ml-2 rounded-full hover:bg-gray-100' 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <div className='flex flex-col gap-1.5 w-6'>
              <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`
        lg:hidden absolute left-4 right-4 mt-3 bg-white border border-[#EFF1F6] shadow-2xl rounded-[24px] p-4 transition-all duration-300 origin-top
        ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        <ul className='flex flex-col gap-2'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className={`flex text-base flex-row gap-4 items-center px-5 py-3 rounded-xl transition-colors ${
                  link.active ? 'bg-black text-white' : 'text-[#56616B] hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className='font-medium'>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile-only footer icons */}
        <div className='mt-4 pt-4 border-t border-gray-100 flex items-center justify-between px-2'>
          <div className='flex gap-4'>
            <Notifications />
            <Messages />
          </div>
          <div className='flex items-center gap-3 bg-[#EFF1F6] py-1.5 px-3 rounded-full'>
            <Avi />
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;