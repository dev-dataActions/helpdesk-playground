const Table = ({ data, columns, onClick }) => {
  return (
    <div className="rounded-md">
      <table className="min-w-full table-auto">
        <thead className="font-normal">
          <tr className="text-left text-sm">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`${
                  index > 0 ? "p-2" : ""
                } border-b border-gray-300 font-normal text-gray-400`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-300 cursor-pointer">
          {data?.length === 0 && <p className="text-sm text-gray-700 py-2.5">No items are found</p>}
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className={`${onClick ? "hover:bg-gray-50" : "cursor-default"}`}>
              {columns.map((column, index) => (
                <td
                  key={column.key}
                  className={`${index > 0 ? "p-2" : ""}`}
                  onClick={onClick ? () => onClick(item) : null}
                >
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
