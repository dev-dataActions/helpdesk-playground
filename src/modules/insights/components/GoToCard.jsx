import { GoChevronRight, GoLinkExternal } from "react-icons/go";

export const GoToCard = ({ name = "Title", description = "Description", goToText = "Go to" }) => {
  return (
    <div className="w-full bg-white rounded-md">
      <div className="flex items-start gap-x-3 p-4">
        <div className="p-2.5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
          <GoLinkExternal size={16} />
        </div>
        <div className="bg-white">
          <h3 className="">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end px-4 py-2 border-t border-gray-200">
        <p className="flex gap-x-1 items-center text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer">
          {goToText}
          <GoChevronRight size={16} />
        </p>
      </div>
    </div>
  );
};
