import React from 'react'
import wallet from '../data 2/wallet.json'

const Withdraw = () => {
  return (
    
    <div className='w-full font-degulardisplay flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-6 sm:gap-12 opacity-100'> 
  
  {/* Balance Container */}
  <div className='flex flex-col items-center sm:items-start justify-center gap-1 sm:gap-2 text-center sm:text-left'>
    <span className='text-xs text-[#56616B] font-normal leading-none'>
      Available Balance
    </span>
    <span className='font-bold text-[36px] text-[#131316] leading-[38px] tracking-[-0.6px] whitespace-nowrap'>
      USD {wallet.balance.toLocaleString()}
    </span>
  </div>

  {/* Button */}
  <button className='w-[167px] h-[52px] bg-black text-white px-4 sm:px-7 py-[14px] rounded-full font-medium text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2 hover:bg-black transition-all'>
    Withdraw
  </button>
  
</div>
  )
}

export default Withdraw