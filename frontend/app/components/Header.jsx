'use client'
import Link from 'next/link'
import React from 'react'
import ConnectWallet from './ConnectWallet'
import Image from 'next/image'
import { useActiveAccount } from 'thirdweb/react'
import LotteryInfo from './LotteryInfo'
import MobileDrawer from './MobileDrawer'

const Header = () => {
  const account = useActiveAccount()
  
  return (
    <header className='bg-[#0b0e38] text-black py-4 fixed w-full z-10 sm:px-2 md:px-0'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Left Side: Logo and Text */}
        <div className='flex items-center space-x-2 ml-2'>
          <Image alt='logo' src={'/lottery.svg'} width={40} height={40} />
          <h1 className='text-lg font-bold text-white'>
            <Link href={'/'}>uZAR GOLD RUSH</Link>
          </h1>
        </div>
        
        {/* Right Side: Connect Wallet Button */}
        <div className='flex gap-x-2'>
          {/* Desktop View */}
          <div className='hidden md:flex items-center gap-x-2'>
            {account && <LotteryInfo />}
            <ConnectWallet />
          </div>
          
          {/* Mobile View */}
          <MobileDrawer />
        </div>
      </div>
    </header>
  )
}

export default Header
