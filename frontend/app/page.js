import Image from "next/image";
import LotteryInfo from "./components/LotteryInfo";
import CurrentPlayers from "./components/CurrentPlayers";
import LotteryPotCard from "./components/LotteryPotCard";
import PreviousWinners from "./components/PreviousWinners";
import ActionButtons from "./components/ActionButtons";

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Section: Lottery Info */}
      <div>
        <LotteryInfo />
      </div>

      {/* Main Content: Left and Right Sections */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {/* Left Section: Action Buttons */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <ActionButtons/>
        </div>

        {/* Right Section: Current Players, Previous Winners, and Lottery Pot */}
        <div className="lg:col-span-2 space-y-6">
          <CurrentPlayers />
          <PreviousWinners />
          <LotteryPotCard />
        </div>
      </div>
    </div>
    
  );
}
