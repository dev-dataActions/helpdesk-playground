import React from "react";
import { valueFormatter } from "../../../utils/general.util";
import { Change } from "../../BigNumber/components/Change";

export type StatProps = {
  value: number;
  prevValue: number;
  change: number;
  changeType: string;
  interval: string;
};

export const Stat: React.FC<StatProps> = ({ value, change, changeType, interval, prevValue }) => {
  return (
    <div className="p-2">
      <p className="text-3xl font-medium text-gray-700"> {valueFormatter(value)}</p>
      <dd className="">
        <span className="flex gap-2">
          <Change change={change} changeType={changeType} />
          <span className="text-sm font-light">{` vs ${interval} `}</span>
          <span className="text-sm text-gray-600">{valueFormatter(prevValue)}</span>
        </span>
      </dd>
    </div>
  );
};
