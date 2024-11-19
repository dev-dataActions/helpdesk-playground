import { valueFormatter } from "./general.util";

export const customRechartTooltip = (params:any) => {
  const { payload, active } = params;
  if (!active || !payload) return null;
  const colData = payload?.[0]?.payload;
  return (
    <div className="w-auto rounded-md text-sm shadow-sm bg-white  border border-gray-300">
      {(colData?.date || colData?.time) && (
        <p className="mb-2 py-2 px-3 text-gray-800 border-b font-[500] text-xs">
          {(colData?.date ?? colData?.time) +
            " " +
            (colData?.prevDateLabel ? `vs ${colData?.prevDateLabel}` : "")}
        </p>
      )}
      <div className="py-1 px-2 text-xs">
        {payload.map((category:any, idx:number) => {
          return (
            <div key={idx} className="flex flex-1 gap-x-2 mb-1 items-center">
              <div className="w-3 h-3 p-[1.5px] shadow-md rounded-full">
                <div
                  style={{
                    backgroundColor: category.color ?? category?.payload?.color,
                  }}
                  className="w-2 h-2 flex flex-col rounded-full"
                />
              </div>
              <div className="flex gap-x-2 justify-between w-full">
                <p className="font-sans text-gray-500">{colData.segment ?? category.dataKey}</p>
                <p className="font-medium">{valueFormatter(category.value)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};