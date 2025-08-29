import { useCallback, useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineChartBar } from "react-icons/hi";
import { Insight } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { GoZap } from "react-icons/go";
import { useOverviewInsights } from "../hooks/useOverviewInsights";
import { Loader } from "da-apps-sdk";
import { TimeFilters } from "../pages/BoardPage";
import { computeInsightFilters } from "../utils/filter.util";
import { DimensionFilters } from "./DimensionFilters";

const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
  <div className={`text-center py-8 px-4 border border-gray-200 rounded-xl bg-gray-50/50 ${className}`}>
    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

const OverviewSubSection = ({
  title,
  icon,
  goToLink,
  insights,
  workspaceId,
  tenantId,
  timeRange,
  isGoalInsights = false,
  activeFilters = {},
}) => {
  const dataResolver = useCallback((payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);

  const dimensionValuesResolver = useCallback(
    (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
    [workspaceId, tenantId]
  );

  return (
    <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        {goToLink}
      </div>

      {insights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            // Compute the correct filters for this insight
            const computedFilters = computeInsightFilters(insight, activeFilters);

            return (
              <Insight
                key={index}
                type={insight.type}
                title={insight.title}
                description={insight.description}
                metrics={insight.metrics}
                timeRange={timeRange}
                timeGrain={insight.timeGrain}
                filters={computedFilters}
                options={{
                  className: isGoalInsights ? "h-40" : "h-60",
                  showExplanation: false,
                  ...(insight.options ?? {}),
                }}
                dataResolver={dataResolver}
                dimensionValuesResolver={dimensionValuesResolver}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={HiOutlineChartBar}
          title="No insights configured"
          description="Configure insights to track your decision outcomes"
        />
      )}
    </div>
  );
};

/**
 * DecisionOverview component with premium design and comprehensive UX considerations
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {string} props.tenantId - Tenant ID
 */
export const DecisionOverview = ({ workspaceId, appId, decisionId, tenantId }) => {
  const {
    filters,
    goalInsights,
    causalInsights,
    isLoading: isLoadingOverview,
  } = useOverviewInsights(workspaceId, appId, decisionId);

  const [timeRange, setTimeRange] = useState(30);
  const [activeFilters, setActiveFilters] = useState(null);

  useEffect(() => {
    if (filters?.length > 0) {
      const initialFilters = {};
      for (const filter of filters) initialFilters[filter.dimension] = filter.value;
      setActiveFilters(initialFilters);
    }
  }, [filters]);

  if (isLoadingOverview || activeFilters === null) {
    return (
      <div className="py-5">
        <Loader loaderText={"Loading decision overview..."} className="text-sm" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Overview Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
            <TbTargetArrow className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Decision Overview</h2>
            <p className="text-sm text-gray-500">
              Get a glimpse of the decision progress and drilldown into causal factors.
            </p>
          </div>
        </div>
        <TimeFilters timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      <DimensionFilters
        tenantId={tenantId}
        workspaceId={workspaceId}
        filters={activeFilters}
        onFilterChange={setActiveFilters}
      />

      <div className="space-y-4">
        {/* Goal Metrics Section */}
        <OverviewSubSection
          title="Goal Metrics"
          icon={<HiOutlineChartBar className="w-4 h-4 text-blue-600" />}
          goToLink={
            <a
              href={`/insights/metricView?decisionId=${decisionId}`}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Go to Metric View →
            </a>
          }
          insights={goalInsights}
          workspaceId={workspaceId}
          tenantId={tenantId}
          timeRange={timeRange}
          isGoalInsights={true}
          activeFilters={activeFilters}
        />

        {/* Causal Insights Section */}
        <OverviewSubSection
          title="Causal Insights"
          icon={<GoZap className="w-4 h-4 text-purple-600" />}
          goToLink={
            <a
              href={`/insights/causalView?decisionId=${decisionId}`}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Go to Causal View →
            </a>
          }
          insights={causalInsights}
          workspaceId={workspaceId}
          tenantId={tenantId}
          timeRange={timeRange}
          activeFilters={activeFilters}
        />
      </div>
    </div>
  );
};
