import { useRouter } from "next/router";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { PiGameControllerLight } from "react-icons/pi";
import { TfiGame } from "react-icons/tfi";

const AnalyticsPage = () => {
  const router = useRouter();
  return (
    <div className="p-5">
      <div className="mb-3">
        <p className="font-medium text-3xl">Insights</p>
        <p className="text-gray-600 text-sm">View player insights across your tournaments</p>
      </div>

      <div className="flex justify-start items-center gap-3">
        <div
          className="bg-white rounded-md w-[25%] p-4 h-32 border cursor-pointer"
          onClick={() => router.push("/insights/organisers/tournament")}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg">Tournaments</p>
            <TfiGame size={18} />
          </div>
          <div className="text-sm text-gray-600">View insights of tournaments across regions</div>
        </div>

        <div className="bg-white rounded-md w-[25%] p-4 h-32 border cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg">Players</p>
            <GiAmericanFootballPlayer size={18} />
          </div>
          <div className="text-sm text-gray-600">
            View insights of player engagement of tournaments
          </div>
        </div>

        <div className="bg-white rounded-md w-[25%] p-4 h-32 border cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg">Participation</p>
            <PiGameControllerLight size={18} />
          </div>
          <div className="text-sm text-gray-600">
            View insights of tournaments participations across regions
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
