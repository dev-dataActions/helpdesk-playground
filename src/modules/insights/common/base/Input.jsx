import { Button } from "./Button";

export const Input = ({ name, label, className = "", isError, errorMsg, disabled, onValidate, onBlur, ...rest }) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full">
      {label && (
        <label htmlFor={rest.id} className="block text-xs text-gray-500 mb-1">
          {label}
        </label>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2">
          <input
            className={`block grow rounded-md shadow-sm placeholder:text-gray-400 text-xs border border-gray-300 text-gray-800 px-2.5 py-2 outline-none ${
              disabled ? "bg-gray-50 cursor-not-allowed" : ""
            } ${className} truncate`}
            name={name ?? rest.id}
            autoComplete={rest.type}
            disabled={disabled}
            onBlur={onBlur}
            {...rest}
          />
          {onValidate && (
            <Button
              label={"Validate"}
              className="w-[25%] bg-gray-600 hover:bg-gray-700 text-white text-xs px-2"
              onClick={onValidate}
            />
          )}
        </div>
        {isError && <p className="text-xxxs text-red-500 mt-0.5 pl-1">{errorMsg}</p>}
      </div>
    </div>
  );
};
