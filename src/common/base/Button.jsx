export const Button = ({ onClick, label, className, ...rest }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm leading-6 shadow-sm ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};
