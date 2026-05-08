import React, { useState } from 'react'
import transactionsData from '../data 2/transactionsData.json'
import FilterModal from './FilterModal'
import Filter from './icons/Filter'

const TransactionsSection = ({ onFilter }) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({})

  const typeMap = {
    'Store Transactions': 'store',
    'Get Tipped': 'tipped',
    'Withdrawals': 'withdrawal',
    'Chargebacks': 'chargebacks',
    'Cashbacks': 'cashback',
    'Refer & Earn': 'refer_earn',
  }

  const statusMap = {
    'Successful': 'successful',
    'Pending': 'pending',
    'Failed': 'failed',
  }

  const filteredData = transactionsData.filter((transaction) => {
    if (filters.transactionType) {
      const mapped = typeMap[filters.transactionType]
      if (mapped && transaction.type !== mapped) return false
    }
    if (filters.transactionStatus) {
      const mapped = statusMap[filters.transactionStatus]
      if (mapped && transaction.status !== mapped) return false
    }
    if (filters.dateFrom) {
      if (new Date(transaction.date) < new Date(filters.dateFrom)) return false
    }
    if (filters.dateTo) {
      if (new Date(transaction.date) > new Date(filters.dateTo)) return false
    }
    return true
  })

  const handleApply = (f) => {
    setFilters(f)
    // Pass filtered data up to AnalysticPage to update the chart
    const filtered = transactionsData.filter((transaction) => {
      if (f.transactionType) {
        const mapped = typeMap[f.transactionType]
        if (mapped && transaction.type !== mapped) return false
      }
      if (f.transactionStatus) {
        const mapped = statusMap[f.transactionStatus]
        if (mapped && transaction.status !== mapped) return false
      }
      if (f.dateFrom) {
        if (new Date(transaction.date) < new Date(f.dateFrom)) return false
      }
      if (f.dateTo) {
        if (new Date(transaction.date) > new Date(f.dateTo)) return false
      }
      return true
    })
    onFilter(filtered)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'successful': return 'text-green-500'
      case 'pending': return 'text-yellow-500'
      case 'failed': return 'text-red-500'
      default: return 'text-[#56616B]'
    }
  }

  const getIconBg = (status) => {
    switch (status) {
      case 'successful': return 'bg-green-50'
      case 'pending': return 'bg-yellow-50'
      case 'failed': return 'bg-red-50'
      default: return 'bg-gray-50'
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className='flex flex-col gap-4 h-full px-2 sm:px-1'>

      {/* Header */}
      <div className='flex flex-row justify-between items-center border-b pb-4  bg-white sticky top-0 z-10'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-bold text-xl sm:text-2xl text-[#131316]'>
            {filteredData.length} Transactions
          </h2>
          <p className='text-xs font-light text-[#56616B]'>
            Your transactions for the last 7 days
          </p>
        </div>
        <div className='flex flex-row gap-3'>
          <button
            onClick={() => setFilterOpen(true)}
            className='flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-full text-xs sm:text-sm font-medium text-[#131316] bg-[#EFF1F6] transition-all'
          >
            Filter
            <Filter />
          </button>
          <button className='flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-full text-xs sm:text-sm font-medium text-[#131316] bg-[#EFF1F6] transition-all'>
            Export list
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="#131316" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className='flex flex-col overflow-y-auto max-h-[500px] pr-2 custom-scrollbar'>
        {filteredData.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 gap-2'>
            <span className='text-[#56616B] text-sm'>No transactions found</span>
          </div>
        ) : (
          filteredData.map((transaction) => (
            <div
              key={transaction.payment_reference}
              className='flex flex-row items-center justify-between py-4'
            >
              <div className='flex flex-row items-center gap-3'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(transaction.status)}`}>
                  {transaction.type === 'withdrawal' || transaction.type === 'withdrawals' ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 12V4M4 8l4-4 4 4" stroke="#FF5403" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 4v8M4 8l4 4 4-4" stroke="#075132" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-sm font-medium text-[#131316]'>
                    {transaction.metadata.product_name}
                  </span>
                  <span className={`text-xs capitalize ${
                    transaction.metadata.name === 'successful' ? 'text-[#56616B]' : getStatusColor(transaction.metadata.name )
                  }`}>
                    {transaction.metadata.name  === 'successful'
                      ? transaction.metadata.product_name
                      : transaction.metadata.name .charAt(0).toUpperCase() + transaction.metadata.name .slice(1)
                    }
                  </span>
                </div>
              </div>

              <div className='flex flex-col items-end gap-0.5'>
                <span className='text-sm font-bold text-[#131316]'>
                  {transaction.type === 'withdrawal' || transaction.type === 'withdrawals' ? '-' : '+'}
                  USD {transaction.amount.toLocaleString()}
                </span>
                <span className='text-xs text-[#56616B]'>
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApply}
      />

    </div>
  )
}

export default TransactionsSection