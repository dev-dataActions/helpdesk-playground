import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Dropdown = ({
  label,
  inlineLabel,
  options,
  loading,
  selectedOption,
  setSelectedOption,
  placeHolder = "Pick an option",
  allowNone = false,
  ...rest
}) => {
  useEffect(() => {
    if (loading) return;
    if (!selectedOption || !options) return;
    if (!options?.find((option) => option.value === selectedOption)) setSelectedOption?.("");
  }, [options]);

  const handleChange = (e) => {
    const stringValue = e.target.value;

    // If empty value, pass it as is
    if (stringValue === "") {
      setSelectedOption?.("");
      return;
    }

    // Find the original option to get the correct type
    const originalOption = options?.find((option) => String(option.value) === stringValue);

    if (originalOption) {
      // Pass the original value with its correct type
      setSelectedOption?.(originalOption.value);
    } else {
      // Fallback to string value if option not found
      setSelectedOption?.(stringValue);
    }
  };

  return (
    <div className="w-full">
      {label && !inlineLabel && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
      {loading ? (
        <div className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-xs text-gray-800 appearance-none outline-none bg-white">
          Loading...
        </div>
      ) : (
        <div className="relative">
          {inlineLabel ? (
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="text-xs text-gray-500 px-2.5 py-2 border-r border-gray-300 bg-gray-50">
                {inlineLabel}:
              </span>
              <select
                className="flex-1 px-2.5 py-2 text-xs text-gray-800 appearance-none outline-none cursor-pointer bg-white rounded-r-md"
                value={selectedOption}
                onChange={handleChange}
                {...rest}
              >
                <option value="" disabled={!allowNone}>
                  {placeHolder}
                </option>
                {options?.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-2.5 cursor-pointer pointer-events-none">
                <IoIosArrowDown size={16} className="text-gray-500" />
              </span>
            </div>
          ) : (
            <div className="relative">
              <select
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-xs text-gray-800 appearance-none outline-none cursor-pointer"
                value={selectedOption}
                onChange={handleChange}
                {...rest}
              >
                <option value="" disabled={!allowNone}>
                  {placeHolder}
                </option>
                {options?.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-2.5 cursor-pointer">
                <IoIosArrowDown size={16} className="text-gray-500" />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
