import React, { createContext, useEffect, useState } from 'react'

const LotteryAppContext = createContext({
  previousWinners: [],
  currentPlayers: [],
  balance: 1,
  lotteryBalance: 0,
  setLotteryBalance: (balance) => {},
  setPreviousWinners: (winners) => {},
  setCurrentPlayers: (players) => {},
  setBalance: (balance) => {}
})

const LotteryAppContextProvider = ({ children }) => {
  const [previousWinners, setPreviousWinners] = useState([])
  const [currentPlayers, setCurrentPlayers] = useState([])
  const [balance, setBalance] = useState(0)
  const [lotteryBalance, setLotteryBalance] = useState(0)



  return (
    <LotteryAppContext.Provider 
      value={{
        previousWinners, 
        currentPlayers, 
        balance,
        lotteryBalance,
        setLotteryBalance,
        setPreviousWinners,
        setCurrentPlayers,
        setBalance
      }}
    >
      {children}
    </LotteryAppContext.Provider>
  )
}

export { LotteryAppContext, LotteryAppContextProvider }
