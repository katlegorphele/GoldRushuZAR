'use client'

import React, { useState, useEffect } from 'react'
import { getContract, defineChain, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from '../client';
import { toWei } from 'thirdweb';
import LoadingModal from './Modal';


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

  // const [successMsg, setSuccessMsg] = useState('');
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModalOpen,setIsLoadingModalOpen ] = useState(false)
  const account = useActiveAccount();
  const [owner, setOwner] = useState('')

  useEffect(() => {
    getOwner();
  }, [account])


  const closeModal = () => {
    setIsLoadingModalOpen(false)
    setIsError(false)
    setIsSuccess(false)
    setIsLoading(false)
    setMessage('')
  }

  const handleEnterLottery = async () => {
      try {
        if (account) {

          setIsLoading(true)
          setIsLoadingModalOpen(true)
    
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
    
          setIsLoading(false)
          setIsSuccess(true)
          setMessage("Successfully entered the lottery")
          
          
          console.log('transactionHash', transactionHash);
      } 
    } catch(error) {



      const update = async () => {
        setIsLoading(false)
        setIsError(true)
        setMessage("Not Enough Funds Or \nTransfer Permission Denied")
      }


      await update()
      
    }
  };

  const getOwner = async () => {
    const _owner = readContract({
      contract: lotteryContract,
      method: "function owner()",
      params: [],
    });

    setOwner(_owner);
  }

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
      setMessage(error.message);   
    }
  }


  return (
    <div className='flex gap-x-4  w-full justify-center  items-end' >
      <button
        onClick={handleEnterLottery}
        className=' bg-[#0091fc] text-white py-2 px-4 rounded'>
        Enter Lottery
      </button>

      {
        (owner == account) 
        ? <button
            onClick={handlePickWinner}
            className=" bg-[#0091fc] text-white py-2 px-4 rounded">
            Pick Winner
          </button> : <></> 
      }
      {/* <button className="w-full bg-red-600 text-white py-2 px-4 rounded">
        Pay Winner
      </button> */}

      <LoadingModal 
      isError={isError} 
      isSuccess={isSuccess} 
      message={message}
      isLoading={isLoading} 
      isOpen={isLoadingModalOpen}
      closeModal={closeModal}
      />


    </div>
  );
};

export default ActionButtons;
