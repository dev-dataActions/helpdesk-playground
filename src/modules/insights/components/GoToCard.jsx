import { GoChevronRight, GoLinkExternal } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";

export const GoToCard = ({ name = "Title", description = "Description", goToText = "Go to", href = "#", onDelete }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl flex flex-col justify-between relative group border border-gray-200 transition-all duration-200">
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
          title="Delete board"
        >
          <IoTrashOutline size={16} />
        </button>
      )}
      <div className="flex items-start gap-x-4 p-5">
        <div className="p-2.5 rounded-md bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
          <GoLinkExternal size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end px-4 py-2 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <a
          className="flex gap-x-2 items-center text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline cursor-pointer transition-colors duration-200"
          href={href}
        >
          {goToText}
          <GoChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};
