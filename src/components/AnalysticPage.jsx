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
    <main className='mx-auto w-full max-w-[1440px] min-h-screen font-degulardisplay bg-white px-6 pt-32'>

      {/* Top Section */}
      <div className='flex flex-row w-full'>

        {/* Left — 60% */}
        <div className='flex flex-col gap-4 w-[60%] pr-8 py-6'>
          <Withdraw />
          <div className='flex flex-row items-center gap-2 min-w-0'>
            <AppsBar />
            <div className='flex-1 min-w-0'>
              <RevenueChart filteredData={filteredData} />
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className='w-px self-stretch' />

        {/* Right — 40% */}
        <div className='hidden lg:flex flex-col gap-8 w-[40%] pl-16 py-6'>
          {walletItems.map((item) => (
            <div key={item.label} className='flex flex-col gap-1'>
              <div className='flex flex-row items-center justify-between'>
                <span className='text-xs text-[#56616B] font-medium'>{item.label}</span>
                <Info />
              </div>
              <span className='font-bold text-[28px] text-[#131316] leading-[38px] tracking-[-0.6px]'>
                USD {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom — Transactions */}
      <div className='mt-8'>
        <TransactionsSection onFilter={setFilteredData} />
      </div>

    </main>
  )
}

export default AnalysticPage