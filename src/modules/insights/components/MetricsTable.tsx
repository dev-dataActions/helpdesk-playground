import { Loader } from "@/common/base/Loader";
import Table from "@/common/functional/Table";
import { ChartTypes, Insight } from "da-insight-kit";
import { PopUpMenu } from "da-insight-kit/dist/common/PopUpMenu";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { CiStar } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

export const MetricsTable = ({ metrics, loading }) => {
  const router = useRouter();
  const { query } = useRouter();

  const columns = useMemo(
    () => [
      {
        key: "star",
        title: "",
        render: () => (
          <div className="flex items-center justify-center">
            <CiStar size={20} />
          </div>
        ),
      },
      {
        key: "metricLabel",
        title: "Metric",
        render: (value, item) => (
          <div className="flex gap-2 items-center">
            <p className="border border-gray-300 p-1 rounded-md">
              <GoGoal size={24} />
            </p>
            <div className="flex flex-col justify-center">
              <div className="text-xxs">{value}</div>
              <div className="text-gray-500 text-xxxs">{item.description}</div>
            </div>
          </div>
        ),
      },
      {
        key: "metricKey",
        title: "Value",
        render: (_, item) => (
          <div className="w-28">
            <Insight
              key={item.id}
              options={{
                hideCard: true,
                compact: true,
                hideTitle: true,
                className: "!w-auto inline-block",
              }}
              type={ChartTypes.BIGNUMBER}
              metrics={[
                {
                  metricKey: item.metricKey,
                  metricLabel: item.metricLabel,
                },
              ]}
            />
          </div>
        ),
      },
      {
        key: "metricKey",
        title: "Trend",
        render: (_, item) => (
          <div className="w-48 h-12">
            <Insight
              options={{
                hideCard: true,
                compact: true,
                hideTitle: true,
              }}
              type={ChartTypes.MIXED}
              metrics={[
                {
                  metricKey: item.metricKey,
                  metricLabel: item.metricLabel,
                  chartType: ChartTypes.LINE,
                },
              ]}
            />
          </div>
        ),
      },
      {
        key: "labels",
        title: "Labels",
        render: (value) =>
          value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((label, index) => (
                <span
                  key={index}
                  className="text-gray-600 border border-gray-300 rounded-md px-2.5 py-1 text-xxxs bg-gray-50"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">+ Add labels</span>
          ),
      },
    ],
    []
  );

  if (loading) return <Loader />;

  return (
    <Table
      data={metrics}
      columns={columns}
      onClick={(item) => router.push(`/metrics/${item.id}`)}
    />
  );
};
