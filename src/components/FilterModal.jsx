import React, { useState } from 'react'
import { 
  format, 
  subDays, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfDay, 
  endOfDay 
} from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { motion, AnimatePresence } from 'framer-motion'

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState('Last 7 days')
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [transactionType, setTransactionType] = useState([])
  const [transactionStatus, setTransactionStatus] = useState([])
  const [typeOpen, setTypeOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const tabs = ['Today', 'Last 7 days', 'This month', 'Last 3 months']
  const types = ['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn']
  const statuses = ['Successful', 'Pending', 'Failed']

  // Handle preset date tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    const today = new Date()

    switch (tab) {
      case 'Today':
        setDateFrom(startOfDay(today))
        setDateTo(endOfDay(today))
        break
      case 'Last 7 days':
        setDateFrom(subDays(today, 7))
        setDateTo(today)
        break
      case 'This month':
        setDateFrom(startOfMonth(today))
        setDateTo(endOfMonth(today))
        break
      case 'Last 3 months':
        setDateFrom(subMonths(today, 3))
        setDateTo(today)
        break
      default:
        break
    }
  }

  const handleTypeToggle = (type) => {
    setTransactionType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleStatusToggle = (status) => {
    setTransactionStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
  }

  const handleClear = () => {
    setActiveTab('')
    setDateFrom(null)
    setDateTo(null)
    setTransactionType([])
    setTransactionStatus([])
  }

  const handleApply = () => {
    onApply({
      activeTab,
      dateFrom: dateFrom ? format(dateFrom, 'yyyy-MM-dd') : '',
      dateTo: dateTo ? format(dateTo, 'yyyy-MM-dd') : '',
      transactionType,
      transactionStatus,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/20 z-40'
            onClick={onClose}
          />

          {/* Sliding Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
                duration: 0.9, 
                ease: [0.22, 1, 0.36, 1] // Professional "Quint" ease-out
            }}
            className='fixed right-0 top-0 h-full w-full max-w-[456px] bg-white z-50 shadow-xl flex flex-col font-degular'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-5 border-b'>
              <span className='font-semibold text-lg text-[#131316]'>Filter</span>
              <button 
                onClick={onClose} 
                className='text-[#56616B] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className='flex flex-col gap-6 px-6 py-6 flex-1 overflow-y-auto'>
              
              {/* Preset Tabs */}
              <div className='flex flex-row gap-2 flex-wrap'>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                      activeTab === tab 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-[#56616B] border-[#E5E7EB] hover:border-gray-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Date Range Selectors */}
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-[#131316]'>Date Range</span>
                <div className='flex flex-row gap-3'>
                  {/* From Date */}
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <button className='flex-1 flex items-center justify-between border border-[#E5E7EB] bg-[#EFF1F6] rounded-xl px-4 py-3 text-sm text-[#131316] h-12 outline-none focus:ring-1 focus:ring-black'>
                        <span>{dateFrom ? format(dateFrom, 'dd MMM yyyy') : 'Start Date'}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#56616B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0 bg-white border-none shadow-2xl rounded-[24px] z-[100] !outline-none' align='start' onOpenAutoFocus={(e) => e.preventDefault()}>
                      <Calendar 
                        mode='single' 
                        selected={dateFrom} 
                        onSelect={(date) => { setDateFrom(date); setActiveTab(''); }} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>

                  {/* To Date */}
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <button className='flex-1 flex items-center justify-between border border-[#E5E7EB] bg-[#EFF1F6] rounded-xl px-4 py-3 text-sm text-[#131316] h-12 outline-none focus:ring-1 focus:ring-black'>
                        <span>{dateTo ? format(dateTo, 'dd MMM yyyy') : 'End Date'}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#56616B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0 bg-white border-none shadow-2xl rounded-[24px] z-[100] !outline-none' align='start' onOpenAutoFocus={(e) => e.preventDefault()}>
                      <Calendar 
                        mode='single' 
                        selected={dateTo} 
                        onSelect={(date) => { setDateTo(date); setActiveTab(''); }} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Transaction Type */}
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-[#131316]'>Transaction Type</span>
                <Popover modal={true} open={typeOpen} onOpenChange={setTypeOpen}>
                  <PopoverTrigger asChild>
                    <button className='w-full flex items-center justify-between border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#131316] bg-[#EFF1F6] h-12 outline-none focus:ring-1 focus:ring-black'>
                      <span className='truncate text-left'>{transactionType.length > 0 ? transactionType.join(', ') : 'All Types'}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className='shrink-0 ml-2'><path d={typeOpen ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4"} stroke="#56616B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[400px] p-2 bg-white shadow-xl border rounded-xl z-[100]' align='start'>
                    {types.map((type) => (
                      <div key={type} className='flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded cursor-pointer' onClick={() => handleTypeToggle(type)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${transactionType.includes(type) ? 'bg-black border-black' : 'border-[#E5E7EB]'}`}>
                          {transactionType.includes(type) && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <span className='text-sm'>{type}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Transaction Status */}
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-[#131316]'>Transaction Status</span>
                <Popover modal={true} open={statusOpen} onOpenChange={setStatusOpen}>
                  <PopoverTrigger asChild>
                    <button className='w-full flex items-center justify-between border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#131316] bg-[#EFF1F6] h-12 outline-none focus:ring-1 focus:ring-black'>
                      <span className='truncate text-left'>{transactionStatus.length > 0 ? transactionStatus.join(', ') : 'All Statuses'}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className='shrink-0 ml-2'><path d={statusOpen ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4"} stroke="#56616B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[400px] p-2 bg-white shadow-xl border rounded-xl z-[100]' align='start'>
                    {statuses.map((status) => (
                      <div key={status} className='flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded cursor-pointer' onClick={() => handleStatusToggle(status)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${transactionStatus.includes(status) ? 'bg-black border-black' : 'border-[#E5E7EB]'}`}>
                          {transactionStatus.includes(status) && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <span className='text-sm'>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Footer */}
            <div className='flex flex-row gap-3 px-6 py-4 border-t mt-auto'>
              <button 
                onClick={handleClear} 
                className='flex-1 py-3 rounded-full border border-[#E5E7EB] text-sm font-semibold text-[#131316] hover:bg-gray-50 transition-colors'
              >
                Clear
              </button>
              <button 
                onClick={handleApply} 
                className='flex-1 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/80 transition-colors'
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FilterModal