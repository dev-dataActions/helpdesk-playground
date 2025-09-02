import { useBoard } from "../hooks/useBoard";
import { Dropdown, Loader, PanelLayout, Loading, Error } from "da-apps-sdk";
import { BoardEditor, DecisionFilters } from "../components";
import { useMemo, useState, useEffect } from "react";
import { convertBoardFiltersToDimensionFilters } from "../utils/filter.util";

/**
 * Time grain offset constants
 */
export const TIME_GRAIN_OFFSET = {
  DAILY: 1,
  WEEKLY: 7,
  MONTHLY: 30,
  QUARTERLY: 90,
  HALF_YEARLY: 180,
  YEARLY: 365,
};

export const TimeFilters = ({ timeRange, setTimeRange }) => {
  const selectedTimeRangeOption = useMemo(() => timeRange ?? TIME_GRAIN_OFFSET.MONTHLY, [timeRange]);

  const timeRangeOptions = useMemo(
    () => [
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
        value: TIME_GRAIN_OFFSET.HALF_YEARLY,
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
 * @param {string} props.tenantId - Tenant ID
 */
const BoardPage = ({
  workspaceId,
  appId,
  boardId,
  decisionId,
  tenantId,
  onNavigate = null,
  onBack = null,
  className = "",
}) => {
  const { board, loading, error } = useBoard(workspaceId, appId, decisionId, boardId);
  const [timeRange, setTimeRange] = useState(TIME_GRAIN_OFFSET.QUARTERLY);
  const [activeFilters, setActiveFilters] = useState(null);

  // Convert board filters to dimension filters format
  const dimensionFilters = useMemo(() => {
    return convertBoardFiltersToDimensionFilters(board?.filters);
  }, [board?.filters]);

  // Initialize active filters from board filters
  const initialActiveFilters = useMemo(() => {
    return convertBoardFiltersToDimensionFilters(board?.filters);
  }, [board?.filters]);

  // Set initial active filters when board loads
  useEffect(() => {
    if (board?.filters && !activeFilters) {
      setActiveFilters(initialActiveFilters);
    }
  }, [board?.filters, activeFilters, initialActiveFilters]);

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision board..." />
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
        <p className="mt-10 text-center text-gray-500">Decision Board not found.</p>
      </div>
    );
  }

  return (
    <PanelLayout
      title={board?.title}
      className={`min-w-[800px] px-4 py-4 md:!px-28 md:!py-8`}
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Render filter dropdowns below title/description */}
      <DecisionFilters
        filters={dimensionFilters}
        workspaceId={workspaceId}
        tenantId={tenantId}
        onFilterChange={setActiveFilters}
      />
      {activeFilters != null ? (
        <BoardEditor
          blocks={board?.blocks}
          timeRange={timeRange}
          workspaceId={workspaceId}
          boardId={boardId}
          tenantId={tenantId}
          onNavigate={onNavigate}
          activeFilters={activeFilters}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center py-16">
          <Loader loaderText="Applying filters to board..." className="text-sm" loaderSize="w-5 h-5" />
        </div>
      )}
    </PanelLayout>
  );
};

export default BoardPage;
