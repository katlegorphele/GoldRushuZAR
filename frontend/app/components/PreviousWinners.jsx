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
  }, [lotteryId]);

  return (
    <div className="bg-white text-black shadow rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Previous Winners</h2>
      <ul>
        {lotteryHistory.length > 0 ? (
          lotteryHistory.map((winner) => (
            <li key={winner.id} className="mb-2">
              <strong>Lottery {winner.id}:</strong> {winner.address}
            </li>
          ))
        ) : (
          <li>No winners yet.</li>
        )}
      </ul>
    </div>
  );
};

export default PreviousWinners;
