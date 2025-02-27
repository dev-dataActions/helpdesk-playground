import { GoChevronRight, GoLinkExternal } from "react-icons/go";

export const GoToCard = ({
  name = "Title",
  description = "Description",
  goToText = "Go to",
  href = "#",
}) => {
  return (
    <div className="w-full h-full bg-white rounded-md border border-gray-200 flex flex-col justify-between">
      <div className="flex items-start gap-x-3 p-4">
        <div className="p-2.5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
          <GoLinkExternal size={16} />
        </div>
        <div className="bg-white">
          <h3 className="text-sm">{name}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end px-4 py-2 border-t border-gray-200">
        <a
          className="flex gap-x-1 items-center text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer text-xs"
          href={href}
        >
          {goToText}
          <GoChevronRight size={16} />
        </a>
      </div>
    </div>
  );
};
