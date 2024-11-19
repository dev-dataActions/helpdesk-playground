import { IconContext } from "react-icons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { valueFormatter } from "../../../utils/general.util";

export const Stat = ({
  name,
  value,
  change,
  changeType,
  interval,
  prevValue,
}) => {
  return (
    <div className="">
      <dt className="text-sm text-gray-500">{name}</dt>
      <dd className="flex items-end text-gray-900">
        <span className="text-lg"> {valueFormatter(value)}</span>
        <span>
          <IconContext.Provider
            value={{
              color: changeType === "negative" ? "red" : "green",
              size: "1.5em",
            }}
          >
            <div>
              {changeType === "negative" ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropup />
              )}
            </div>
          </IconContext.Provider>
        </span>
        <span
          className={`${
            changeType === "negative" ? "text-rose-600" : "text-green-700"
          } text-sm`}
        >
          {`${change}`}
        </span>
      </dd>
      <dd className="">
        <span>
          <span className="text-sm font-light">{` vs ${interval} `}</span>
          <span className="text-sm text-gray-600">
            {valueFormatter(prevValue)}
          </span>
        </span>
      </dd>
    </div>
  );
};
