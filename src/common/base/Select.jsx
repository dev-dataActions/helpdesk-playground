export const Select = ({
  id,
  label,
  value,
  options,
  onChange,
  valueKey = "value",
  placeHolder = "Select option",
  ...rest
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-light text-gray-500 mb-1"
        >
          {label}
        </label>
      )}
      <select
        {...rest}
        id={id}
        name={id}
        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
        value={value}
        onInput={onChange}
      >
        <option value="" disabled selected>
          {placeHolder}
        </option>
        {options.map((option) => (
          <option
            key={option.title ?? option.label}
            value={option[valueKey] ?? option.id}
          >
            {option.title ?? option.label}
          </option>
        ))}
      </select>
    </>
  );
};
