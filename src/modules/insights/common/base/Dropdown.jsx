import { IoIosArrowDown } from "react-icons/io";

export const Dropdown = ({
  label,
  options = [],
  selectedOption = "",
  setSelectedOption,
  placeHolder = "Pick an option",
}) => {
  return (
    <div className="relative w-full">
      <label className="block text-xs text-gray-500 mb-0.5">{label}</label>
      <select
        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs text-gray-800 appearance-none outline-none cursor-pointer"
        value={selectedOption}
        onChange={(e) => setSelectedOption?.(e.target.value)}
        required
      >
        <option value="" disabled>
          {placeHolder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2 bottom-1.5 cursor-pointer">
        <IoIosArrowDown size={16} className="text-gray-500" />
      </span>
    </div>
  );
};
