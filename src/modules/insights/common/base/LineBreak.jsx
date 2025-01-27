export const LineBreak = ({ text }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm font-medium leading-6">
        <span className="bg-white px-6 text-gray-900">{text}</span>
      </div>
    </div>
  );
};
