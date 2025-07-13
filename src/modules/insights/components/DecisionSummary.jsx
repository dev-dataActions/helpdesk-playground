import { Insight } from "da-insight-sdk";
import { useAppDecisionInsights } from "../hooks/useAppDecisionInsights";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";
import { Error } from "../common/functional/Error";
import { Loading } from "../common/functional/Loading";

/**
 * InsightPreview component for decision summary
 * @param {Object} props - Component props
 * @param {Object} props.insightConfig - Insight configuration
 * @param {string} props.workspaceId - Workspace ID
 */
const InsightPreview = ({ insightConfig, workspaceId }) => {
  return (
    <Insight
      title={insightConfig?.title}
      type={insightConfig?.type}
      metrics={insightConfig?.metrics}
      options={insightConfig?.options}
      dataResolver={(payload) => fetchData(payload, workspaceId)}
      dimensionValuesResolver={(dimension) => fetchDimensionValues(dimension, workspaceId)}
    />
  );
};

/**
 * DecisionSummary component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {string} props.className - Additional CSS classes
 */
export const DecisionSummary = ({ workspaceId, appId, decisionId, className = "" }) => {
  const { insights: appDecisionInsights, loading, error } = useAppDecisionInsights(workspaceId, appId, decisionId);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm mb-0.5">Summary (loading...)</p>
            <p className="text-gray-500 font-light text-xs mb-3">Understand how your business is working</p>
          </div>
        </div>
        <Loading loaderText="Loading insights..." fullScreen={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm mb-0.5">Summary</p>
            <p className="text-gray-500 font-light text-xs mb-3">Understand how your business is working</p>
          </div>
        </div>
        <Error errorText={error} fullScreen={false} />
      </div>
    );
  }

  if (!appDecisionInsights || !Array.isArray(appDecisionInsights)) {
    return (
      <div className={className}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm mb-0.5">Summary (0)</p>
            <p className="text-gray-500 font-light text-xs mb-3">Understand how your business is working</p>
          </div>
        </div>
        <div className="text-center text-gray-500 p-4">No insights available</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm mb-0.5">{`Summary (${appDecisionInsights.length})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3">Understand how your business is working</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {appDecisionInsights.length === 0 && <p className="text-sm text-gray-600 w-72">No insights added yet.</p>}
        {appDecisionInsights.map((insight, index) => (
          <div key={insight?.insight_id || index} className="col-span-4">
            <InsightPreview insightConfig={{ ...insight, options: { className: "h-40" } }} workspaceId={workspaceId} />
          </div>
        ))}
      </div>
    </div>
  );
};
