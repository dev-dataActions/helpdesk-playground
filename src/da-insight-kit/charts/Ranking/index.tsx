/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { Loader } from "@/da-insight-kit/common/Loader";

interface RankingData {
  segment: string;
  value: string | number;
  percentage: number;
}

interface RankingProps {
  data?: RankingData[];
  loading: boolean;
}

export const Ranking: React.FC<RankingProps> = ({ data, loading }) => {
  if (loading) return <Loader className="min-h-32 h-full" />;

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex flex-row justify-between p-2 text-sm">
        <p>Country</p>
        <p>of total</p>
      </div>
      <div className="flex flex-col p-2 text-xs gap-y-2">
        {data?.map((d, index) => (
          <Tooltip
            key={index}
            title={`${d.segment} : ${d.value}`}
            position="bottom"
            arrow={true}
            arrowSize="small"
            size="small"
            {...(Tooltip as any)}
          >
            <div className="flex p-2 flex-row justify-between border-b border-gray-200 gap-x-2">
              <p className="w-12">{d.segment}</p>
              <div className="flex grow">
                <p
                  className="rounded-sm bg-blue-400 h-7"
                  style={{ width: `${d.percentage + 180}px` }}
                ></p>
              </div>
              <p>{d.value}</p>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
