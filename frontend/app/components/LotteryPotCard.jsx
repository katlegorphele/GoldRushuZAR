'use client'

import React, {useState, useEffect} from 'react'
import { getContract, defineChain, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from '../client';

const uZARContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0xE29E8434FF23c4ab128AEA088eE4f434129F1Bf1"
});

const LotteryPotCard = () => {

  const [lotteryPot, setLotteryPot] = useState('');

  const GetLotteryPot = async () => {
    const data = await readContract({
      contract: uZARContract,
      method:
        "function balanceOf(address account) view returns (uint256)",
      params: ['0x694E778589b0BCA0edD6933892a3c63B95A1518c'],
    });
    setLotteryPot(data);

    setLotteryPot(Number(data)/ 1e18)
  }

  useEffect(() => {
    GetLotteryPot()
  }, []);





  return (
    <div className="bg-yellow-100 shadow rounded-lg p-6 text-center">
      <h2 className="text-xl text-black font-bold">Current Lottery Pot</h2>
      <p className="text-3xl font-bold text-yellow-600 mt-4">uZAR{lotteryPot}</p>
    </div>
  )
}

export default LotteryPotCard