"use client";

import React, { useState, useEffect } from "react";
import { getContract, defineChain, readContract } from "thirdweb";
import { client } from "../client";

const lotteryContract = getContract({
  client: client,
  chain: defineChain(1135),
  address: "0x694E778589b0BCA0edD6933892a3c63B95A1518c",
});

const PreviousWinners = () => {
  const [lotteryHistory, setLotteryHistory] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);

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
    setLotteryHistory(history);
    console.log(history)
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchLotteryId();
    };
    fetchData();
  }, []);

  // Fetch history whenever lotteryId changes
  useEffect(() => {
    if (lotteryId) fetchLotteryHistory();
  }, [fetchLotteryHistory]);

  return (
    <div className="bg-[#0c113b] white shadow rounded-lg p-6 h-min w-2/4">
      {/* <h2 className="text-lg font-bold mb-4">Previous Winners</h2>
      <ul>
        
      </ul> */}



      <div class="relative overflow-x-auto">
          <p className="text-white text-sm font-semibold">Lottery History</p>
          <table class="w-full text-sm text-left rtl:text-right bg-[#0c113b] border-spacing-y-2  border-separate rounded">
              <thead class="text-xs text-slate-400 uppercase">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Player ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Lottery ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Winning Amount
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-[#0c113b]">

                {lotteryHistory.length > 0 ? (
                  lotteryHistory.map((winner) => (
                    <tr class="bg-[#121741] text-white">
                      <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                        {winner.address.substring(0, 14)}...{winner.address.substring(20, winner.address.length)}
                      </th>
                      <td class="px-6 py-4">
                        {winner.id}
                      </td>
                      <td class="px-6 py-4">
                          500uZar
                      </td>
                    </tr>
                  ))
                ) : (
                  <li>...Loading</li>
                )}
                  
              </tbody>
          </table>
      </div>

    </div>
  );
};

export default PreviousWinners;
