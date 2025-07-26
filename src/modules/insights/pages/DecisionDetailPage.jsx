import { useMemo, useCallback } from "react";
import { getBreadcrumbs, getDecision, getSubDecisions } from "../utils/general.util";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { DecisionTreeView } from "../components/DecisionTreeView";
import { DecisionBoards } from "../components/DecisionBoards";
import { MetricView } from "../components/MetricView";
import { SubDecisionCards } from "../components/SubDecisionCards";
import { Loading } from "../common/functional/Loading";
import { Error } from "../common/functional/Error";
import { PanelLayout } from "../common/layouts/PanelLayout";
import { Tabs } from "../common/functional/Tabs";

/**
 * DecisionDetailPage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {string} props.decisionId - Decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.tenantId - Tenant ID
 */
export const DecisionDetailPage = ({ workspaceId, appId, decisionId, tenantId, onNavigate = null, className = "" }) => {
  const { decisionTree, loading, error } = useDecisionTree(workspaceId, appId);

  const { breadcrumbs, decision, metricConfig, subDecisions } = useMemo(() => {
    try {
      const breadcrumbs = getBreadcrumbs(decisionTree, decisionId);
      const decision = getDecision(decisionTree, decisionId);
      const metricConfig = metricViewConfig[decisionId] || null;
      const subDecisions = getSubDecisions(decisionTree, decisionId);
      return { breadcrumbs, decision, metricConfig, subDecisions };
    } catch (error) {
      console.error("Error processing decision data:", error);
      return { breadcrumbs: [], decision: null, metricConfig: null, subDecisions: [] };
    }
  }, [decisionTree, decisionId]);

  const handleBreadcrumbNavigate = useCallback(
    (href) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(href);
        }
      } catch (error) {
        console.error("Breadcrumb navigation error:", error);
      }
    },
    [onNavigate]
  );

  if (loading) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision tree..." />
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

  if (!decision || !breadcrumbs) {
    return (
      <div className={className}>
        <Loading loaderText="Loading decision details..." />
      </div>
    );
  }

  const tabs = [
    {
      id: "monitoring",
      label: "Monitoring",
      value: "monitoring",
      component: (
        <MetricView
          onNavigate={onNavigate}
          metricViewConfig={metricConfig}
          workspaceId={workspaceId}
          tenantId={tenantId}
          className="mt-4 p-1"
        />
      ),
    },
    {
      id: "reviewing",
      label: "Reviewing",
      value: "reviewing",
      component: (
        <div className="mt-4 p-1">
          <DecisionBoards
            appId={appId}
            workspaceId={workspaceId}
            decisionId={decisionId ?? decisionTree?.data?.id}
            onNavigate={onNavigate}
          />
        </div>
      ),
    },
  ];

  return (
    <PanelLayout
      title={decision?.name}
      description={decision?.description}
      breadcrumbs={[{ name: "Home", href: "/insights" }, ...breadcrumbs, { name: decision?.name }]}
      onNavigate={handleBreadcrumbNavigate}
      className={className}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <Tabs tabs={tabs} />
        <div className="lg:w-[300px]">
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-md">
            <DecisionTreeView decisionTree={decisionTree} selectedDecisionId={decisionId} onNavigate={onNavigate} />
          </div>
          <div className="mt-4">
            <SubDecisionCards
              subDecisions={subDecisions}
              metricViewConfig={metricViewConfig}
              workspaceId={workspaceId}
              tenantId={tenantId}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

const metricViewConfig = {
  decision_mbmcip2a: {
    OUTPUT: [
      {
        metricKey: "completed_projects",
        metricLabel: "Qualified Products",
      },
      {
        metricKey: "num_trials_promoted",
        metricLabel: "Num Trials Advanced",
      },
    ],
    DRIVER: [
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
        metricKey: "no_of_trials_created",
        metricLabel: "Trials Created",
      },
      {
        metricKey: "num_fields_planted",
        metricLabel: "Num. Fields Planted",
      },
    ],
  },
  feature_mbrug9mq: {
    OUTPUT: [
      {
        metricKey: "completed_projects",
        metricLabel: "Qualified Products",
      },
    ],
    DRIVER: [
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
        metricKey: "no_of_trials_created",
        metricLabel: "Total Trials Started",
      },
    ],
  },
  feature_mcyg3aru: {
    OUTPUT: [
      {
        metricKey: "num_trials_promoted",
        metricLabel: "Total Trials Promoted",
      },
    ],
    DRIVER: [
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
        metricKey: "no_of_trials_created",
        metricLabel: "Total Trials Started",
      },
      {
        metricKey: "num_trials_created",
        metricLabel: "Total Trials Closed",
      },
    ],
  },
  feature_mcygu7lb: {
    OUTPUT: [
      {
        metricKey: "num_fields_harvested",
        metricLabel: "No of Trials Harvested",
      },
    ],
    DRIVER: [
      {
        metricKey: "fieldbook_fill_rate",
        metricLabel: "FieldBook Fill Rate",
      },
      {
        metricKey: "avg_delay_in_planting",
        metricLabel: "Avg. Delay in Planting",
      },
      {
        metricKey: "avg_delay_in_observations",
        metricLabel: "Avg. Delay in Observation Protocol",
      },
      {
        metricKey: "avg_delay_in_agronomy_protocol",
        metricLabel: "Avg. Delay in Agronomy Protocol",
      },
      {
        metricKey: "avg_delay_in_harvest",
        metricLabel: "Avg. Delay in Harvest",
      },
    ],
    INPUT: [
      {
        metricKey: "num_fields_planted",
        metricLabel: "No of Trials Planted",
      },
    ],
  },
};
