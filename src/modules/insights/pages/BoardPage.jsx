import { useBoard } from "../hooks/useBoard";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";
import { BoardEditor } from "../components/BoardEditor";
import { Dropdown } from "../common/base/Dropdown";
import { TimeGrain } from "da-insight-sdk";
import { useMemo, useState } from "react";

export const TimeFilters = ({ filters, setFilters }) => {
  const selectedTimeRangeOption = useMemo(() => filters?.timeRange ?? 180, [filters]);
  const selectedTimeGrainOption = useMemo(() => filters?.timeGrain ?? TimeGrain.MONTHLY, [filters]);

  const timeRangeOptions = useMemo(
    () => [
      {
        label: "Week",
        value: 7,
        disabled: selectedTimeGrainOption === TimeGrain.MONTHLY,
      },
      {
        label: "Month",
        value: 30,
      },
      {
        label: "Quarter",
        value: 120,
      },
      {
        label: "6M",
        value: 180,
      },
      {
        label: "Year",
        value: 360,
      },
    ],
    [selectedTimeGrainOption]
  );

  const timeGrainOptions = useMemo(
    () => [
      { label: "Daily", value: TimeGrain.DAILY },
      { label: "Weekly", value: TimeGrain.WEEKLY },
      { label: "Monthly", value: TimeGrain.MONTHLY },
    ],
    []
  );

  return (
    <div className="flex gap-2">
      <div className="w-36">
        <Dropdown
          options={timeRangeOptions}
          selectedOption={selectedTimeRangeOption}
          setSelectedOption={(value) => {
            setFilters({
              ...filters,
              timeRange: value,
            });
          }}
        />
      </div>
      <div className="w-36">
        <Dropdown
          options={timeGrainOptions}
          selectedOption={selectedTimeGrainOption}
          setSelectedOption={(value) => {
            const newFilters = {
              ...filters,
              timeGrain: value,
            };
            if (value === TimeGrain.MONTHLY && selectedTimeRangeOption === 7)
              newFilters.timeRange = 180;
            setFilters(newFilters);
          }}
        />
      </div>
    </div>
  );
};

const BoardPage = ({ workspaceId, appId, boardId, decisionId }) => {
  const { board, loading } = useBoard(workspaceId, appId, decisionId, boardId);
  const [filters, setFilters] = useState({
    timeRange: 180,
    timeGrain: TimeGrain.WEEKLY,
  });

  if (loading) return <Loading loaderText="Loading board..." />;

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <PanelLayout
      title={board?.title}
      description={board?.description}
      className={"!px-40 !py-8"}
      customButton={<TimeFilters filters={filters} setFilters={setFilters} />}
      showBackButton={true}
    >
      <BoardEditor blocks={board?.blocks} filters={filters} />
    </PanelLayout>
  );
};

export default BoardPage;
