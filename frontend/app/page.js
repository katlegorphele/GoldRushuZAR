"use client";

import Image from "next/image";
import LotteryInfo from "./components/LotteryInfo";
import CurrentPlayers from "./components/CurrentPlayers";
import LotteryPotCard from "./components/LotteryPotCard";
import PreviousWinners from "./components/PreviousWinners";
import ActionButtons from "./components/ActionButtons";
import {LotteryAppContextProvider} from "./context/LotteryAppContext"

import { useState } from "react";
import { HistoryIcon, LiveIcon } from "./constants/icons";

export default function Home() {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
      <div className="w-full h-full bg-[#0b0e38] pt-20">
        <LotteryPotCard />
        <Tab selected={selectedTabIndex} onChanged={(index) => {
          setSelectedTabIndex(index)
        }}/>
        <div className="flex h-min justify-center">
          {(selectedTabIndex == 0)  
            ? <CurrentPlayers />
            : <PreviousWinners />
          }
        </div>
    </div>
    
  );
}


const Tab = ({selected, onChanged}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex rounded-full bg-[#0c123c] gap-x-4 w-min m-12 justify-center">
        <button 
          onClick={() => {
            onChanged(0)
          }}
          type="button" className={`text-red-700 ${(selected == 0) ? "bg-[#0ea0fe]" : "bg-[#0c123c]"} hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-x-2`}>
            <LiveIcon />
            <p className="text-white">Live</p>
          </button>
        <button
          onClick={() => {
            onChanged(1)
          }}
          type="button" className={`text-white ${(selected == 1) ? "bg-[#0ea0fe]" : "bg-[#0c123c]"} hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-x-2`}>
            <HistoryIcon />
            <p>History</p>
          </button>
      </div>
    </div>
  )
}



// const Tab = ({ selected, onChanged }) => {
//   return (
//     <div className="flex justify-center w-full">
//       <div className="flex rounded-full bg-[#0c123c] gap-x-4 w-min m-12 justify-center">
        
//         <button
//           onClick={() => onChanged(0)}
//           type="button"
//           className={clsx(
//             'text-red-700',
//             selected === 0 ? 'bg-[#0ea0fe]' : 'bg-[#0c123c]',
//             'hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-x-2 w-auto' // Added `items-center` and `w-auto`
//           )}
//         >
//           <LiveIcon />
//           <p className="text-white">Live</p>
//         </button>

//         <button
//           onClick={() => onChanged(1)}
//           type="button"
//           className={clsx(
//             'text-white',
//             selected === 1 ? 'bg-[#0ea0fe]' : 'bg-[#0c123c]',
//             'hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-x-2 w-auto' // Added `items-center` and `w-auto`
//           )}
//         >
//           <HistoryIcon />
//           <p>History</p>
//         </button>
        
//       </div>
//     </div>
//   );
// };
