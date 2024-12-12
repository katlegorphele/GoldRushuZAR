'use client'
import React, { useState } from 'react'
import { X, Menu } from 'lucide-react'
import ConnectWallet from './ConnectWallet'
import { useActiveAccount } from 'thirdweb/react'
import LotteryInfo from './LotteryInfo'

const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const account = useActiveAccount()

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Menu Trigger */}
      <button 
        onClick={toggleDrawer} 
        className="md:hidden flex items-center justify-center w-10 h-10"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer Content */}
      <div 
        className={`
          fixed top-0 right-0 w-64 h-full bg-[#0b0e38] 
          transform transition-transform duration-300 ease-in-out z-30
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-white text-lg font-bold">Lottery Actions</h2>
          <button onClick={toggleDrawer}>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {account ? (
            <>
              <div className="w-full">
                <LotteryInfo />
              </div>
              <div className="w-full">
                <ConnectWallet />
              </div>
            </>
          ) : (
            <div className="w-full">
              <ConnectWallet />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileDrawer
