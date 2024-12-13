'use client'

import React, {useState, useEffect, useActionState, useContext} from 'react'
import { getContract, defineChain,readContract } from "thirdweb";
import { client } from '../client';
import { useActiveAccount } from 'thirdweb/react';
import { LotteryAppContext } from '../context/LotteryAppContext';

const lotteryContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0x694E778589b0BCA0edD6933892a3c63B95A1518c"
});

const CurrentPlayers = () => {
  const {currentPlayers,  setCurrentPlayers} = useContext(LotteryAppContext)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")


  const account = useActiveAccount()

  const getPlayers = async () => {
    try {
      setIsLoading(true);
      const data = await readContract({
        contract: lotteryContract,
        method:
          "function getPlayers() view returns (address[])",
      });
      setCurrentPlayers(data);
    } catch(error) {
      setIsError(true)
      setErrorMessage("Failed to fetch current players")
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getPlayers();
  }, [account])

  return (
    <div className="bg-[#0c113b] shadow rounded-lg p-6 h-min md:w-2/4 sm:w-screen">
        <div className="relative overflow-x-auto">
          <p className="text-white text-sm font-semibold">Current Players</p>
          <table className="w-full text-sm text-left rtl:text-right bg-[#0c113b] border-spacing-y-2  border-separate rounded">
              <thead className="text-xs text-slate-400 uppercase">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Player ID
                      </th>

                  </tr>
              </thead>
              <tbody className="bg-[#0c113b]">

                {currentPlayers.length > 0 ? (
                  currentPlayers.map((player, index) => (
                    <tr key={index} className="bg-[#121741] text-white">
                      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {player.substring(0, 8)}...{player.substring(player.length - 8, player.length)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td>No Current Players</td></tr>
                )}
                  
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default CurrentPlayers
