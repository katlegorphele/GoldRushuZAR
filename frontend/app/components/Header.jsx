'use client'

import Link from 'next/link'
import React from 'react'
import ConnectWallet from './ConnectWallet'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='bg-white text-black py-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Left Side: Logo and Text */}
        <div className='flex items-center space-x-2'>
          <Image alt='logo' src={'/lottery.svg'} width={40} height={40} />
          <h1 className='text-lg font-bold'>
            <Link href={'/'}>uZAR GOLD RUSH </Link>
          </h1>
        </div>
        
        {/* Right Side: Connect Wallet Button */}
        <ConnectWallet />
      </div>
    </header>
  )
}

export default Header