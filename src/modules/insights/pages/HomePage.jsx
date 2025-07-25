import { useCallback } from "react";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionTreeView } from "../components/DecisionTreeView";
import { MetricView } from "../components/MetricView";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";
import { PanelLayout } from "../common/layouts/PanelLayout";
import { useTenantId } from "../hooks/useTenantId";

/**
 * HomePage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.tenantId - Tenant ID
 */
export const HomePage = ({
  workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID,
  appId = process.env.NEXT_PUBLIC_CFA_APP_ID,
  onNavigate = null,
  className = "",
  tenantId: propTenantId,
}) => {
  const { tenantId } = useTenantId();
  const finalTenantId = propTenantId || tenantId;

  const { decisionTree, loading, error } = useDecisionTree(workspaceId, appId);

  const handleNavigate = useCallback(
    (path) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(path);
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    [onNavigate]
  );

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading insights dashboard..." />
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

  return (
    <PanelLayout
      title="Insights"
      description="Monitor your key metrics and explore decision insights"
      breadcrumbs={[{ name: "Home" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-4">
        {/* Metric View - Takes full width except 300px */}
        <MetricView metricViewConfig={metricViewConfig} workspaceId={workspaceId} tenantId={finalTenantId} />

        {/* Decision Tree - Fixed 300px width */}
        <div className="lg:w-[300px]">
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-md">
            <DecisionTreeView decisionTree={decisionTree} selectedDecisionId="" onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

const metricViewConfig = {
  OUTPUT: [
    {
      metricKey: "num_trials_created",
      metricLabel: "No of Trials Completed",
    },
    {
      metricKey: "num_trials_promoted",
      metricLabel: "No. of Trials Promoted",
    },
    {
      metricKey: "trial_type",
      metricLabel: "Trial Type",
    },
    {
      metricKey: "cost_incurred_trials",
      metricLabel: "Cost Incurred in Trials (Guardrail)",
    },
  ],
  DRIVER: [
    {
      metricKey: "observation_fill_rate",
      metricLabel: "Observation Fill Rate",
    },
    {
      metricKey: "trial_completion_rate",
      metricLabel: "Trial Completion Rate",
    },
    {
      metricKey: "avg_time_to_complete_trial",
      metricLabel: "Avg. Time to Complete Trial",
    },
  ],
  INPUT: [
    {
      metricKey: "num_failed_trials",
      metricLabel: "No of Failed Trials",
    },
    {
      metricKey: "no_of_trials_created",
      metricLabel: "No of Trials Created",
    },
    {
      metricKey: "num_locations_planted",
      metricLabel: "No of Locations Planted",
    },
    {
      metricKey: "num_trials_in_progress",
      metricLabel: "No of Trials In Progress",
    },
    {
      metricKey: "num_locations_harvested",
      metricLabel: "No of Locations Harvested",
    },
    {
      metricKey: "crop_yield",
      metricLabel: "Crop Yield",
    },
  ],
};
