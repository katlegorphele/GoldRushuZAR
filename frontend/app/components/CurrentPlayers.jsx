'use client'

import React, {useState, useEffect, useActionState} from 'react'
import { getContract, defineChain,readContract } from "thirdweb";
import { client } from '../client';
import { useActiveAccount } from 'thirdweb/react';

const lotteryContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0x694E778589b0BCA0edD6933892a3c63B95A1518c"
});

const CurrentPlayers = () => {
  const [lotteryPlayers, setPlayers] = useState([])

  const account = useActiveAccount()

  const getPlayers = async () => {
    const data = await readContract({
      contract: lotteryContract,
      method:
        "function getPlayers() view returns (address[])",
    });
    setPlayers(data);
  }

  useEffect(() => {
    getPlayers();
  }, [account])

  return (
    <div className="bg-[#0c113b] shadow rounded-lg p-6 h-min w-2/4">
        <div class="relative overflow-x-auto">
          <p className="text-white text-sm font-semibold">Current Players</p>
          <table className="w-full text-sm text-left rtl:text-right bg-[#0c113b] border-spacing-y-2  border-separate rounded">
              <thead className="text-xs text-slate-400 uppercase">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Player ID
                      </th>

                  </tr>
              </thead>
              <tbody className="bg-[#0c113b]">

                {lotteryPlayers.length > 0 ? (
                  lotteryPlayers.map((player) => (
                    <tr className="bg-[#121741] text-white">
                      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {player.substring(0, 14)}...{player.substring(20, player.length)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td>...Loading</td></tr>
                )}
                  
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default CurrentPlayers
