import { IconContext } from "react-icons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { valueFormatter } from "../../../utils/general.util";
import { Change } from "./Change";

export const Stat = ({ value, change, changeType, interval, prevValue }) => {
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
