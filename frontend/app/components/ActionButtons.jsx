'use client'

import React, { useState, useEffect } from 'react'
import { getContract, defineChain, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from '../client';
import { toWei } from 'thirdweb';


const lotteryContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0x694E778589b0BCA0edD6933892a3c63B95A1518c"
});

const uZARContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0xE29E8434FF23c4ab128AEA088eE4f434129F1Bf1"
});




const ActionButtons = () => {

  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const account = useActiveAccount();

  const handleEnterLottery = async () => {
    if (account) {

      // check if user has approved uZAR
      const allowance = await readContract({
        contract: uZARContract,
        method: "function allowance(address owner, address spender) view returns (uint256)",
        params: [account.address, lotteryContract.address],
      });
      console.log('allowance', allowance);
  
      if (parseInt(allowance) < 5 * 10 ** 18) {
      //   // approve uZAR
        const transaction = await prepareContractCall({
          contract: uZARContract,
          method: "function approve(address,uint256)",
          params: [lotteryContract.address, 5 * 10 ** 18],
        });
        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });
      }
  
      // // enter lottery
      const transaction = await prepareContractCall({
        contract: lotteryContract,
        method: "function enter()",
        params: [],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      console.log('transactionHash', transactionHash);
    }
  };

  const handlePickWinner = async () => {
    try {
      const transaction = await prepareContractCall({
        contract: lotteryContract,
        method: "function pickWinner()",
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log(transactionHash)
      
    } catch (error) {
      setError(error.message);   
    }
  }


  return (
    <div className='space-y-10' >
      <button
        onClick={handleEnterLottery}
        className='w-full bg-green-600 text-white py-2 px-4 rounded mb-4'>
        Enter Lottery
      </button>

      <button
        onClick={handlePickWinner}
        className="w-full bg-green-600 text-white py-2 px-4 rounded mb-4">
        Pick Winner
      </button>
      <button className="w-full bg-red-600 text-white py-2 px-4 rounded">
        Pay Winner
      </button>
    </div>
  );
};

export default ActionButtons;
