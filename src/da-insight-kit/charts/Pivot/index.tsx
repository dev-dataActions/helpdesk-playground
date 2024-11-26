import React, { useMemo } from "react";
import { Tooltip } from "react-tippy";
import { valueFormatter } from "../../utils/general.util";

interface ChartConfig {
  row: string;
  column: string;
  dataKey: string;
}

interface DataItem {
  [key: string]: any; 
  revenue?: number | any;
}

interface CustomTooltipContentProps {
  item?: DataItem;
  chartConfig: ChartConfig;
}

const CustomTooltipContent: React.FC<CustomTooltipContentProps> = ({
  item,
  chartConfig,
}) => (
  <div className="w-48 bg-white text-black rounded-lg shadow-sm text-xs border border-gray-200">
    <div className="text-lg font-medium mb-2 border-b border-gray-200 p-2">
      {valueFormatter(item?.revenue) || "—"}
    </div>
    <div className="flex flex-col justify-between text-xs gap-y-1 p-2">
      <div>
        <div>{item?.[chartConfig?.row] || "—"}</div>
        <div className="text-gray-400 text-[10px]">{chartConfig?.row}</div>
      </div>
      <div>
        <div>{item?.[chartConfig?.column] || "—"}</div>
        <div className="text-gray-400 text-[10px]">{chartConfig?.column}</div>
      </div>
    </div>
  </div>
);

interface PivotProps {
  data?: DataItem[];
  chartsConfig: ChartConfig;
}

const Pivot: React.FC<PivotProps> = ({ data = [], chartsConfig }) => {
  const colValues = useMemo(() => {
    if (!chartsConfig?.column) return [];
    return [...new Set(data?.map((item) => item[chartsConfig.column]))];
  }, [chartsConfig?.column, data]);

  const rowValues = useMemo(() => {
    if (!chartsConfig?.row) return [];
    return [...new Set(data?.map((item) => item[chartsConfig.row]))];
  }, [chartsConfig?.row, data]);

  const cellClass =
    "flex-1 flex text-xs text-center justify-center items-center text-gray-600";
  const tableCellClass =
    "flex w-[6%] p-2 border-gray-200 text-xs text-center justify-center items-center text-gray-600";
  const contentCellClass =
    "flex-1 cursor-pointer border border-gray-200 hover:border-blue-500 hover:border-2 rounded-md text-xs bg-gray-50 font-sans";

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden p-3 h-[460px] flex flex-col">
      {colValues.length > 0 && rowValues.length > 0 ? (
        <>
          <div className="flex items-center">
            <div className="flex-1 p-4 w-[6%]" />
            <div className="flex w-[94%] h-8">
              {colValues.map((colValue) => (
                <div key={colValue} className={cellClass}>
                  {colValue}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            {rowValues.map((rowValue) => (
              <div
                key={rowValue}
                className="flex flex-grow min-h-[0] space-x-1 space-y-1"
              >
                <div className={tableCellClass}>{rowValue}</div>
                {colValues.map((colValue) => {
                  const item = data.find(
                    (d) =>
                      d[chartsConfig?.row] === rowValue &&
                      d[chartsConfig?.column] === colValue
                  );
                  const formattedValue = valueFormatter(
                    item?.[chartsConfig?.dataKey]
                  );

                  return (
                    <Tooltip
                      key={colValue}
                      html={
                        <CustomTooltipContent
                          item={item}
                          chartConfig={chartsConfig}
                        />
                      }
                      position="top"
                      size="small"
                      animation="fade"
                      className={contentCellClass}
                    >
                      <div className="flex items-center justify-center h-full">
                        {formattedValue || "—"}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-gray-500">
          N/A
        </div>
      )}
    </div>
  );
};

export default Pivot;
