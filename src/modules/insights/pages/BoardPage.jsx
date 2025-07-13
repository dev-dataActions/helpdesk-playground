import { useBoard } from "../hooks/useBoard";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";
import { BoardEditor } from "../components/BoardEditor";
import { Dropdown } from "../common/base/Dropdown";
import { useMemo, useState } from "react";
import { PanelLayout } from "../common/layouts/PanelLayout";

/**
 * Time grain offset constants
 */
export const TIME_GRAIN_OFFSET = {
  DAILY: 1,
  WEEKLY: 7,
  MONTHLY: 30,
  QUARTERLY: 90,
  YEARLY: 365,
};

export const TimeFilters = ({ timeRange, setTimeRange }) => {
  const selectedTimeRangeOption = useMemo(() => timeRange ?? TIME_GRAIN_OFFSET.MONTHLY, [timeRange]);

  const timeRangeOptions = useMemo(
    () => [
      {
        label: "Week",
        value: TIME_GRAIN_OFFSET.WEEKLY,
      },
      {
        label: "Month",
        value: TIME_GRAIN_OFFSET.MONTHLY,
      },
      {
        label: "Quarter",
        value: TIME_GRAIN_OFFSET.QUARTERLY,
      },
      {
        label: "6M",
        value: 180,
      },
      {
        label: "Year",
        value: TIME_GRAIN_OFFSET.YEARLY,
      },
    ],
    []
  );

  const handleTimeRangeChange = (value) => {
    try {
      if (setTimeRange && typeof setTimeRange === "function") {
        setTimeRange(value);
      }
    } catch (error) {
      console.error("Time range change error:", error);
    }
  };

  return (
    <div className="w-52">
      <Dropdown
        inlineLabel="Time range"
        options={timeRangeOptions}
        selectedOption={selectedTimeRangeOption}
        setSelectedOption={handleTimeRangeChange}
      />
    </div>
  );
};

/**
 * BoardPage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.boardId - Board ID
 * @param {string} props.decisionId - Decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {Function} props.onBack - Back button handler
 * @param {string} props.className - Additional CSS classes
 */
const BoardPage = ({ workspaceId, appId, boardId, decisionId, onNavigate = null, onBack = null, className = "" }) => {
  const { board, loading, error } = useBoard(workspaceId, appId, decisionId, boardId);
  const [timeRange, setTimeRange] = useState(TIME_GRAIN_OFFSET.QUARTERLY);

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading board..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  if (!board || Object.keys(board).length === 0) {
    return (
      <div className={className}>
        <p className="mt-10 text-center text-gray-500">Board not found.</p>
      </div>
    );
  }

  return (
    <PanelLayout
      title={board?.title}
      description={board?.description}
      className={`px-24 py-8`}
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      showBackButton={true}
      onBack={onBack}
    >
      <BoardEditor
        blocks={board?.blocks}
        timeRange={timeRange}
        workspaceId={workspaceId}
        boardId={boardId}
        onNavigate={onNavigate}
      />
    </PanelLayout>
  );
};

export default BoardPage;
