export const Card = ({ title, content, onClick }) => {
  return (
    <div
      className="h-full w-full flex flex-col relative border border-gray-300 bg-white rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex py-2 px-3 border-b">
        <p className="text-sm text-left">{title}</p>
      </div>

      <div className="h-24">
        <div className="h-full rounded-b-md bg-white p-0.5 overflow-auto">
          <p className="text-xxs h-full text-gray-500 font-sans text-left px-3 py-1">{content}</p>
        </div>
      </div>
    </div>
  );
};
