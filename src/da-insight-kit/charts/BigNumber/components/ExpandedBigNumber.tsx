import { getComparisonLabel, getCurrLabel, getPrevLabel } from "../utils/bigNumber.util";
import { CompactBigNumber } from "./CompactBigNumber";
import { Change } from "./Change";
import { valueFormatter } from "../../../utils/general.util";

export const ExpandedBigNumber = ({ data, value, prevValue, change, changeType, timeGrain }) => {
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
