export const metricViewConfig = {
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

export const explanationInightsConfig = {
  decision_mbmcip2a: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "completed_projects",
        timegrain: "month",
        filters: [],
      },
      insight_type: "summary",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        filters: [],
      },
      insight_type: "summary",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        dimensions: ["user_region"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        dimensions: ["trial_name"],
        filters: [],
      },
      insight_type: "ranking",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
  ],
  feature_mbrug9mq: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "completed_projects",
        timegrain: "month",
        filters: [],
      },
      insight_type: "summary",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
  ],
  feature_mcyg3aru: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        filters: [],
      },
      insight_type: "summary",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        timegrain: "month",
        dimensions: ["user_region"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_promoted",
        dimensions: ["trial_name"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
  ],
  feature_mcygu7lb: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_fields_harvested",
        timegrain: "month",
        filters: [],
      },
      insight_type: "summary",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_fields_harvested",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_fields_harvested",
        timegrain: "month",
        dimensions: ["district"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: "mcsyjvco",
    },
  ],
};
