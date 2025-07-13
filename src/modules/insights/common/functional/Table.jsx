import { IoFilterOutline } from "react-icons/io5";
import { Dropdown } from "../base/Dropdown";

export const Table = ({ data, columns, actions, onRowClick }) => {
  return (
    <div>
      {actions?.length > 0 && (
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-3 items-center">
            <IoFilterOutline size={16} />
            <div className="w-28">
              <Dropdown placeHolder="Add filters" />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {actions?.map((action) => (
              <button
                key={action.name}
                className="text-sm text-gray-500 hover:text-gray-800"
                onClick={action.onClick}
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <table className="min-w-full table-auto">
        <thead className="font-normal">
          <tr className="text-left text-sm">
            {columns.map((column) => (
              <th
                key={column.key + column.title}
                className={`p-2 border-b border-gray-300 font-normal text-gray-400`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {data?.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-left p-2 text-sm text-gray-600">
                No data available
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="text-sm divide-y divide-gray-300">
            {data?.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${onRowClick ? "hover:bg-gray-50 cursor-pointer" : "cursor-default"}`}
                onClick={onRowClick ? () => onRowClick(item) : null}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={JSON.stringify(item[column.key] ?? {}) + columnIndex}
                    className={`p-2 ${column.className}`}
                  >
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
