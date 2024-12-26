import React from "react";

type TableProps<T> = {
  colNames: string[];
  data: T[];
  renderRow: (item: T, idx: number) => React.ReactNode;
  className?: string;
};

export const Table = <T,>({
  colNames,
  data,
  renderRow,
  className = "",
}: TableProps<T>) => {
  return (
    <div className={`border border-gray-200 rounded-lg bg-white ${className}`}>
      <table className="w-full">
        <thead className="border-b border-gray-200">
          <tr>
            {colNames.map((name, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-semibold text-gray-700"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={colNames.length}
                className="text-center text-gray-600 text-sm p-4"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={idx}
                className={`text-sm text-gray-600 ${
                  idx != data.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                {renderRow(item, idx)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
