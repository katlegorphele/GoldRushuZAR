'use client'

import React, { useState, useEffect, useContext } from 'react'
import { getContract, defineChain, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from '../client';
import { toWei } from 'thirdweb';
import LoadingModal from './Modal';
import { LotteryAppContext } from '../context/LotteryAppContext';


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
  const {setCurrentPlayers, setPreviousWinners} = useContext(LotteryAppContext)
  const [lotteryId, setLotteryId] = useState(null)

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



  const getPlayers = async () => {
    const data = await readContract({
      contract: lotteryContract,
      method:
        "function getPlayers() view returns (address[])",
    });
    setCurrentPlayers(data);
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
          
          
          getPlayers();

          
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


    // Fetch the current lottery ID
    const fetchLotteryId = async () => {
      try {
        const data = await readContract({
          contract: lotteryContract,
          method: "function lotteryId() view returns (uint256)",
        });
        setLotteryId(Number(data));
        console.log(data)
      } catch (error) {
        console.error("Error fetching lotteryId:", error);
      }
    };
  
    // Fetch the lottery history
    const fetchLotteryHistory = async () => {
      if (!lotteryId) return;
  
      const history = [];
      for (let i = lotteryId - 1; i > 0; i--) {
        try {
          const winnerAddress = await readContract({
            contract: lotteryContract,
            method: "function getWinnerByLottery(uint256 _lottery) view returns (address)",
            params: [i],
          });
          history.push({ id: i, address: winnerAddress });
        } catch (error) {
          console.error(`Error fetching winner for lottery ${i}:`, error);
        }
      }
      setPreviousWinners(history);
      console.log(history)
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

      await fetchLotteryId();
      await fetchLotteryHistory()
      
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
