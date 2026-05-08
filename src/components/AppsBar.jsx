import React from 'react'
import LinkInTheBio from './icons/LinkInTheBio'
import Store from './icons/Store'
import MediaKit from './icons/MedaiKit'
import Invoicing from './icons/Invoicing'

const appsBar = [
  {href:"#link", icon: <LinkInTheBio/>},
  {href:"#store", icon: <Store/>},
  {href:"#media", icon: <MediaKit/>},
  {href:"#Invoicing", icon: <Invoicing/>}
]

const AppsBar = () => {
  return (
    <div>
        <ul className=' hidden fixed sm:flex flex-col items-center justify-center gap-1 border-2 border-slate-100 bg-white w-12 h-48 top-[310px] left-4 rounded-full p-1 shadow-brand-sm z-30'>
            {appsBar.map((app) => (
              <li key={app.href} className='flex items-center justify-center'>
                <a href={app.href} 
                   className='flex items-center justify-center w-10 h-10 rounded-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:bg-[#5C738314] transition-all duration-300'>
                  {app.icon}
                  </a>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default AppsBar