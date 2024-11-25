import React from "react";
import { Change } from "./Change";
import { CompactBigNumber } from "./CompactBigNumber";
import { valueFormatter } from "../../../utils/general.util";
import { TimeGrain } from "@/da-insight-kit/constants/date.constant";
import { Entry } from "@/da-insight-kit/resolvers/dataResolvers/simple";
import { getComparisonLabel, getCurrLabel, getPrevLabel } from "../utils/bigNumber.util";

export type ExpandedBigNumberProps = {
  data: Entry[];
  value: number;
  prevValue: number;
  change: number;
  changeType: string;
  timeGrain: TimeGrain;
};

export const ExpandedBigNumber: React.FC<ExpandedBigNumberProps> = ({
  data,
  value,
  prevValue,
  change,
  changeType,
  timeGrain,
}) => {
  return (
    <div className="grid grid-cols-3 divide-x">
      <CompactBigNumber number={valueFormatter(value)} label={getCurrLabel(data, timeGrain)} />
      <CompactBigNumber number={valueFormatter(prevValue)} label={getPrevLabel(data, timeGrain)} />
      <CompactBigNumber
        number={<Change change={change} changeType={changeType} />}
        label={getComparisonLabel(data, timeGrain)}
      />
    </div>
  );
};
