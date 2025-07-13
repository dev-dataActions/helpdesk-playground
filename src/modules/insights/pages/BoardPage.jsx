import { useBoard } from "../hooks/useBoard";
import { Loading } from "../common/functional/Loading";
import { BoardEditor } from "../components/BoardEditor";
import { Dropdown } from "../common/base/Dropdown";
import { TimeGrain, TimeGrainOffset } from "da-insight-sdk";
import { useMemo, useState } from "react";
import { PanelLayout } from "../common/layouts/PanelLayout";

export const TimeFilters = ({ timeRange, setTimeRange }) => {
  const selectedTimeRangeOption = useMemo(() => timeRange ?? 180, [timeRange]);

  const timeRangeOptions = useMemo(
    () => [
      {
        label: "Week",
        value: 7,
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
    []
  );

  return (
    <div className="w-36">
      <Dropdown
        options={timeRangeOptions}
        selectedOption={timeRange}
        setSelectedOption={(value) => setTimeRange(value)}
      />
    </div>
  );
};

const BoardPage = ({ workspaceId, appId, boardId, decisionId }) => {
  const { board, loading } = useBoard(workspaceId, appId, decisionId, boardId);
  const [timeRange, setTimeRange] = useState(TimeGrainOffset.MONTHLY);

  if (loading) return <Loading loaderText="Loading board..." />;

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <PanelLayout
      title={board?.title}
      description={board?.description}
      className={"!px-40 !py-8"}
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      showBackButton={true}
    >
      <BoardEditor blocks={board?.blocks} timeRange={timeRange} workspaceId={workspaceId} />
    </PanelLayout>
  );
};

export default BoardPage;
