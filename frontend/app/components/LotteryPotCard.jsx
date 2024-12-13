'use client'

import React, {useState, useEffect, useContext} from 'react'
import { getContract, defineChain, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from '../client';
import ActionButtons from './ActionButtons';
import { LotteryAppContext } from '../context/LotteryAppContext';

const uZARContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0xE29E8434FF23c4ab128AEA088eE4f434129F1Bf1"
});

const LotteryPotCard = () => {
  const {lotteryBalance, setLotteryBalance} = useContext(LotteryAppContext)


  const GetLotteryPot = async () => {
    const data = await readContract({
      contract: uZARContract,
      method:
        "function balanceOf(address account) view returns (uint256)",
      params: ['0x694E778589b0BCA0edD6933892a3c63B95A1518c'],
    });
    
    setLotteryBalance(Number(data)/ 1e18)
  }

  useEffect(() => {
    GetLotteryPot()
  }, []);


  return (
    <div className="bg-[url(https://img.freepik.com/free-photo/three-dimensional-casino-item_23-2151067232.jpg?ga=GA1.1.731547532.1733351132&semt=ais_hybrid)] bg-no-repeat bg-cover bg-top   text-center h-[500px]">
     <div className='backdrop-blur w-full h-full py-12 z-0 flex flex-col justify-between'>
      <div>
        <h2 className="text-lg text-slate-300 font-bold capitalize">Lottery Price</h2>
        <span className=" mt-2 flex gap-x-1 w-full justify-center items-end">
          <p className='text-md text-slate-300 mb-1 font-semibold'>uZAR</p>
          <p className='text-5xl font-bold text-white'>{lotteryBalance}</p>
        </span>
      </div>

      <ActionButtons />
      </div>
    </div>
  )
}

export default LotteryPotCard
