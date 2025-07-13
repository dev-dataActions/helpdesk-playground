import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export const MultiSelectDropdown = ({
  label,
  options,
  loading,
  disabled,
  selectedOptions = [],
  setSelectedOptions,
  placeholder = "Select options",
  createOptions = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter(
    (opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions.includes(opt.value)
  );

  const inputValueAlreadyExists = options.some((opt) => opt.label.toLowerCase() === inputValue.toLowerCase());

  const addOption = (value) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const removeOption = (value) => {
    setSelectedOptions(selectedOptions.filter((v) => v !== value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const existing = options.find((opt) => opt.label.toLowerCase() === inputValue.toLowerCase());
      addOption(existing?.value || inputValue.trim());
    }
    if (e.key === "Backspace" && !inputValue && selectedOptions.length > 0) {
      removeOption(selectedOptions[selectedOptions.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (disabled) {
    return (
      <div className="w-full relative text-xs cursor-not-allowed">
        {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
        <div className={`w-full border border-gray-300 rounded-md py-2 px-3 bg-white text-gray-300`}>{placeholder}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full relative text-xs">
        {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
        <div className={`w-full border border-gray-300 rounded-md py-2 px-3 bg-white`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full relative text-xs" ref={containerRef}>
      {label && <label className="block text-xs text-gray-500 mb-1">{label}</label>}
      <div
        className={`w-full border border-gray-300 rounded-md pl-2 pr-4 py-1 flex flex-wrap items-center gap-1 relative cursor-text ${
          isOpen ? "ring-1 ring-blue-500" : ""
        } bg-white`}
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.map((value, idx) => {
          const label = options.find((o) => o.value === value)?.label || value;
          return (
            <div key={value + idx} className="flex items-center bg-gray-200 rounded-full px-2 py-0.5">
              <span>{label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(value);
                }}
                className="ml-1 text-xs hover:text-red-500"
              >
                <IoClose size={12} />
              </button>
            </div>
          );
        })}

        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none px-1 py-1"
          placeholder={placeholder}
        />

        <IoIosArrowDown className="absolute right-2 top-2 text-gray-500 pointer-events-none" size={16} />
      </div>

      {isOpen && (filteredOptions.length > 0 || inputValue.trim()) && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow mt-1 max-h-60 overflow-auto w-full transition-all duration-200">
          {filteredOptions.map((opt) => (
            <div
              key={opt.value}
              onClick={() => addOption(opt.value)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}

          {inputValue.trim() && !inputValueAlreadyExists && createOptions && (
            <div
              onClick={() => addOption(inputValue.trim())}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-blue-600"
            >
              {`Create ${inputValue.trim()}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
