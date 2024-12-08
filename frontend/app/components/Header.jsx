'use client'

import Link from 'next/link'
import React from 'react'
import ConnectWallet from './ConnectWallet'

const Header = () => {
  return (
    <header className='bg-white text-black py-4'>
        <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-lg font-bold'><Link href={'/'}>Lottery Dapp</Link></h1>
            <ConnectWallet/>
        </div>
    </header>
  )
}

export default Header