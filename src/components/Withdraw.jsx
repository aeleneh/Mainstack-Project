import React from 'react'
import wallet from '../data 2/wallet.json'

const Withdraw = () => {
  return (
    
    <div className='w-full font-degulardisplay flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 sm:gap-12 opacity-100'> 
      <div className='w-[231px] h-[72px] flex flex-col items-start justify-center gap-2'>
        <span className='text-xs text-[#56616B] font-thin leading-none'>Available Balance</span>
        <span className='font-bold text-[28px] text-[#131316] leading-[38px] tracking-[-0.6px] whitespace-nowrap'>
          USD {wallet.balance.toLocaleString()}
        </span>
      </div>

      <button className='w-[167px] h-[52px] bg-black text-white px-7 py-[14px] rounded-full font-medium text-sm whitespace-nowrap flex items-center justify-center gap-2 hover:bg-black transition-all'>
        Withdraw
      </button>
    </div>
  )
}

export default Withdraw