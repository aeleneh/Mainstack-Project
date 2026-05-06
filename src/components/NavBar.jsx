import React, { useState } from 'react'
import MainstackLogo from './icons/MainstackLogo'
import HomeIcon from './icons/HomeIcon'
import AnalysticsIcon from './icons/AnalyticsIcon'
import PaymentsIcon from './icons/PaymentsIcon'
import Group from './icons/Group'
import Widgets from './icons/Widgets'
import Notifications from './icons/Notifications'
import Messages from './icons/Messages'
import Avi from './icons/Avi'
import Menu from './icons/Menu'

const navLinks = [
  {href:"/", icon: <HomeIcon />, label: "Home", active: false},
  {href:"#analytics", icon: <AnalysticsIcon />, label: "Analytics", active: false},
  {href:"#revenue", icon: <PaymentsIcon fill="#ffffff"/>, label: "Revenue", active: true},
  {href:"#crm", icon: <Group />, label: "CRM", active: false},
  {href:"#widgets", icon: <Widgets />, label: "Apps", active: false},
]

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[1408px] z-50 px-4 md:px-0'>

      {/* Navbar pill */}
      <nav className='font-degulardisplay flex flex-row justify-between items-center h-16 w-full bg-white border-2 shadow-[0px_2px_6px_0px_#2D3B430F] rounded-full px-4 md:px-6 lg:px-6 opacity-100 rotate-0 transition-all'>

        {/* Logo */}
        <div className='flex-shrink-0'>
          <MainstackLogo />
        </div>

        {/* Navlinks */}
        <ul className='hidden md:flex flex-row gap-1 lg:gap-2 items-center justify-center'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`flex flex-row gap-1 items-center px-4 py-2 text-sm font-normal text-[#56616B] rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#EFF1F6] ${link.active ? 'bg-black text-white' : 'text-[#56616B]'}`}>
                {link.icon}
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <ul className='hidden md:flex flex-row gap-2 lg:gap-4 items-center justify-center'>
            <li><a href="#" className='p-2'><Notifications /></a></li>
            <li><a href="#" className='p-2'><Messages /></a></li>
            <div className='flex flex-row gap-2 lg:gap-4 items-center justify-center bg-[#EFF1F6] py-1 pr-3 pl-1.5 rounded-full cursor-pointer hover:ring-2 ring-slate-100 transition-all'>
                <li><a href="#"><Avi /></a></li>
                <li><a href="#"><Menu /></a></li>
            </div>
        </ul>

        {/* Hamburger Button */}
        <button className='md:hidden p-2' onClick={() => setMenuOpen(!menuOpen)}>
          <div className='flex flex-col gap-1.5'>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className='md:hidden mt-3 bg-white border border-slate-100 shadow-xl rounded-[32px] px-4 flex flex-col gap-2'>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`flex flex-row gap-3 items-center px-4 py-3 rounded-full ${link.active ? 'bg-black text-white' : 'text-[#56616B]'}`}>
                  {link.icon}
                  <span className='font-medium'>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className='flex flex-row gap-4 items-center py-4 border-t-2 border-gray-100'>
            <Notifications />
            <Messages />
            <div className='flex flex-row gap-4 items-center bg-[#EFF1F6] py-2 pr-3 pl-1.5 rounded-full'>
              <Avi />
              <Menu />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default NavBar