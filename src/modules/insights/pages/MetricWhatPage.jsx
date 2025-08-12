import { useState, useEffect, useCallback } from "react";
import { PanelLayout, Loading, Error } from "da-apps-sdk";
import { useMetricDrilldown } from "../hooks/useMetricDrilldown";
import { TIME_GRAIN_OFFSET, TimeFilters } from "./BoardPage";
import { BoardEditor, BoardFilters } from "../components";

/**
 * MetricWhatPage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.metricId - Metric ID
 * @param {Function} props.onBack - Back button handler
 * @param {string} props.metricLabel - Metric label
 * @param {string} props.tenantId - Tenant ID
 */
export const MetricWhatPage = ({ workspaceId, metricId, metricLabel, tenantId, onBack = null }) => {
  const { drilldown, loading, error } = useMetricDrilldown(workspaceId, metricId);
  const [timeRange, setTimeRange] = useState(TIME_GRAIN_OFFSET.QUARTERLY);
  const [activeFilters, setActiveFilters] = useState(null);

  // Memoize the setActiveFilters function to prevent infinite loops
  const handleSetActiveFilters = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  // Initialize active filters when drilldown data loads
  useEffect(() => {
    if (drilldown?.filters && !activeFilters) {
      const initialFilters = {};
      drilldown.filters.forEach((filter) => {
        if (filter?.dimension && filter?.value) {
          initialFilters[filter.dimension] = filter.value;
        }
      });
      setActiveFilters(initialFilters);
    }
  }, [drilldown?.filters, activeFilters]); // Added activeFilters back since we need to check it

  // Handle loading state
  if (loading) {
    return (
      <div className="w-full h-full">
        <Loading loaderText="Loading drilldown view..." />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full h-full">
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  // Handle no drilldown data
  if (!drilldown || !drilldown.blocks || drilldown.blocks.length === 0) {
    return (
      <PanelLayout
        title={(metricLabel ?? metricId) + " Drilldown View"}
        description="No drilldown data available for this metric."
        className="md:px-24 md:py-8"
        showBackButton={true}
        onBack={onBack}
      >
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg">No drilldown configuration found</p>
          <p className="text-sm mt-2">This metric doesn&apos;t have any drilldown views configured.</p>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout
      title={drilldown.name || (metricLabel ?? metricId) + " Drilldown View"}
      description={drilldown.description || `Drilldown analysis view of ${metricLabel ?? metricId}`}
      className="md:px-24 md:py-8"
      customButton={<TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />}
      showBackButton={true}
      onBack={onBack}
    >
      {/* Render filter dropdowns below title/description */}
      <BoardFilters
        filters={drilldown.filters}
        workspaceId={workspaceId}
        activeFilters={activeFilters}
        setActiveFilters={handleSetActiveFilters}
      />

      {/* Render drilldown content using BoardEditor */}
      {activeFilters !== null ? (
        <BoardEditor
          blocks={drilldown.blocks}
          timeRange={timeRange}
          workspaceId={workspaceId}
          boardId={null} // Not applicable for drilldown
          tenantId={tenantId}
          onNavigate={null} // Navigation not needed for drilldown
          activeFilters={activeFilters}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center py-16">
          <Loading loaderText="Applying filters to drilldown..." className="text-sm" loaderSize="w-5 h-5" />
        </div>
      )}
    </PanelLayout>
  );
};
