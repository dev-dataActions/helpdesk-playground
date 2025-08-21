import { useCallback } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineChartBar } from "react-icons/hi";
import { ChartTypes, Insight, TimeGrain } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { GoZap } from "react-icons/go";

const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
  <div className={`text-center py-8 px-4 border border-gray-200 rounded-xl bg-gray-50/50 ${className}`}>
    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

const OverviewSubSection = ({ title, icon, goToLink, insights, workspaceId, tenantId }) => {
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
          {insights.map((insight, index) => (
            <Insight
              key={index}
              type={insight.type}
              title={insight.title}
              description={insight.description}
              metrics={insight.metrics}
              timeRange={30}
              timeGrain={insight.timeGrain}
              filters={insight.filters}
              options={{
                className: "h-60",
                showExplanation: false,
                ...(insight.options ?? {}),
              }}
              dataResolver={dataResolver}
              dimensionValuesResolver={dimensionValuesResolver}
            />
          ))}
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
  const goalInsights = [
    {
      title: "No of Trials Completed - Crop",
      description: "No of Trials Completed",
      type: ChartTypes.BIGNUMBER,
      metrics: [
        {
          metricKey: "num_trials_created",
          metricLabel: "No of Trials Completed",
        },
      ],
      options: {
        className: "h-40",
      },
      timeGrain: TimeGrain.DAILY,
      labels: ["Trial Genie", "No of Trials Completed"],
    },
    {
      title: "No of Trials Completed - Crop",
      description: "No of Trials Completed",
      type: ChartTypes.BIGNUMBER,
      metrics: [
        {
          metricKey: "num_trials_created",
          metricLabel: "No of Trials Completed",
        },
      ],
      options: {
        className: "h-40",
      },
      timeGrain: TimeGrain.DAILY,
      labels: ["Trial Genie", "No of Trials Completed"],
    },
  ];

  const causalInsights = [
    {
      title: "No of Trials Completed - Crop",
      description: "No of Trials Completed",
      type: ChartTypes.RANKING,
      metrics: [
        {
          chartType: "BAR",
          metricKey: "num_trials_created",
          metricLabel: "No of Trials Completed",
        },
      ],
      filters: {
        num_trials_created: {
          showDimensionContributionIn: "crop_name",
        },
      },
      options: {
        className: "h-60",
      },
      timeGrain: TimeGrain.DAILY,
      labels: ["Trial Genie", "No of Trials Completed"],
    },
    {
      title: "No of Trials Completed - Crop",
      description: "No of Trials Completed",
      type: ChartTypes.RANKING,
      metrics: [
        {
          chartType: "BAR",
          metricKey: "num_trials_created",
          metricLabel: "No of Trials Completed",
        },
      ],
      filters: {
        num_trials_created: {
          showDimensionContributionIn: "crop_name",
        },
      },
      options: {
        className: "h-60",
      },
      timeGrain: TimeGrain.DAILY,
      labels: ["Trial Genie", "No of Trials Completed"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Overview Header */}
      <div className="flex items-center gap-3 mb-6">
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
        />
      </div>
    </div>
  );
};
