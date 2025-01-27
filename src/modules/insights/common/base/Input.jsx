export const Input = ({ name, label, className = "", ...rest }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {label && (
        <label htmlFor={rest.id} className="block text-sm text-gray-500 mb-1">
          {label}
        </label>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <input
          className={`block w-full rounded-md shadow-sm placeholder:text-gray-400 text-sm border border-gray-300 text-gray-800 px-2.5 py-1 ${className}`}
          name={name ?? rest.id}
          autoComplete={rest.type}
          {...rest}
        />
      </div>
    </div>
  );
};
