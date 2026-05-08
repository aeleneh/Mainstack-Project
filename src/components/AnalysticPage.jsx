import React, { useState } from 'react'
import AppsBar from './AppsBar'
import RevenueChart from './RevenueChart'
import wallet from '../data 2/wallet.json'
import Info from './icons/Info'
import Withdraw from './Withdraw'
import TransactionsSection from './TransactionsSection'

const walletItems = [
  { label: 'Ledger Balance', value: wallet.ledger_balance },
  { label: 'Total Payout', value: wallet.total_payout },
  { label: 'Total Revenue', value: wallet.total_revenue },
  { label: 'Pending Payout', value: wallet.pending_payout },
]

const AnalysticPage = () => {
  const [filteredData, setFilteredData] = useState(null)

  return (
    <main className='mx-auto w-full max-w-[1440px] min-h-screen font-degulardisplay bg-white px-6 sm:pl-20 lg:pl-10 md:px-16 pt-32'>

      {/* Top Section */}
      <div className='flex flex-col lg:flex-row w-full gap-10 lg:gap-0'>

        {/* Left — 60% */}
      <div className='w-full lg:w-[65%] lg:pr-12 py-2 md:py-6'>
          <Withdraw />
          <div className='flex flex-col md:flex-row items-start gap-4 mt-6'>
            <div className='hidden md:block'>
              <AppsBar />
            </div>
            
            <div className='w-full flex-1 min-w-0'>
              <RevenueChart filteredData={filteredData} />
            </div>
          </div>
        </div>

        {/* Right Section — Wallet Stats */}
        <div className='w-full lg:w-[35%] lg:pl-12 py-2 md:py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8'>
            {walletItems.map((item) => (
              <div key={item.label} className='flex flex-col gap-1'>
                <div className='flex flex-row items-center justify-between lg:justify-between'>
                  <span className='text-sm text-[#56616B] font-normal'>{item.label}</span>
                  <button className='hover:opacity-70 transition-opacity'>
                    <Info />
                  </button>
                </div>
                <span className='font-bold text-[24px] md:text-[28px] text-[#131316] leading-tight tracking-[-0.6px]'>
                  USD {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom — Transactions */}
      <div className='mt-6 md:mt-10'>
        <TransactionsSection onFilter={setFilteredData} />
      </div>

    </main>
  )
}

export default AnalysticPage