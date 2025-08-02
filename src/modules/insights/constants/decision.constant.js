export const metricViewConfig = {
  feature_mdu6b1ml: {
    OUTPUT: [
      { metricKey: "num_entries_advanced", metricLabel: "No of Entries Advanced" },
    ],
    DRIVER: [
      { metricKey: "trial_completion_rate", metricLabel: "Trial Completion Rate" },
      { metricKey: "avg_time_to_complete_trial", metricLabel: "Avg. Time to Complete Trial" }
    ],
    INPUT: [
      { metricKey: "num_trials_created", metricLabel: "No of Trials Completed" },
      { metricKey: "no_of_trials_created", metricLabel: "Total Trials Created" },
    ],
  },

  decision_mbmcip2a: {
    OUTPUT: [
      { metricKey: "num_trials_created", metricLabel: "No of Trials Completed" },
      { metricKey: "num_entries_advanced", metricLabel: "No of Entries Advanced" },
    ],
    DRIVER: [
      { metricKey: "trial_completion_rate", metricLabel: "Trial Completion Rate" },
      { metricKey: "fieldbook_fill_rate", metricLabel: "Fieldbook Fill Rate" },
      { metricKey: "avg_time_to_complete_trial", metricLabel: "Avg. Time to Complete Trial" },
    ],
    INPUT: [
      { metricKey: "num_fields_harvested", metricLabel: "Num. Fields Harvested" },
      { metricKey: "num_fields_planted", metricLabel: "Num. Fields Planted" },
      { metricKey: "no_of_trials_created", metricLabel: "Total Trials Created" },
    ],
  },

  feature_mbrug9mq: {
    OUTPUT: [{ metricKey: "num_trials_created", metricLabel: "No of Trials Completed" }],
    DRIVER: [
      { metricKey: "trial_completion_rate", metricLabel: "Trial Completion Rate" },
      { metricKey: "fieldbook_fill_rate", metricLabel: "Fieldbook Fill Rate" },
      { metricKey: "avg_time_to_complete_trial", metricLabel: "Avg. Time to Complete Trial" },
    ],
    INPUT: [
      { metricKey: "num_fields_harvested", metricLabel: "Num. Fields Harvested" },
      { metricKey: "num_fields_planted", metricLabel: "Num. Fields Planted" },
      { metricKey: "no_of_trials_created", metricLabel: "Total Trials Created" },
    ],
  },

  feature_mdu6mn7h: {
      OUTPUT: [
        { "metricKey": "crop_yield", "metricLabel": "Crop Yield" },
        { "metricKey": "cov_of_value", "metricLabel": "Coefficient of Variation" },
        { "metricKey": "num_entries_advanced", "metricLabel": "No of Entries Advanced" }
      ],
      DRIVER: [
        { "metricKey": "avg_delay_in_observations", "metricLabel": "Avg. Delay in Observations" },
        { "metricKey": "avg_delay_in_planting", "metricLabel": "Avg. Delay in Planting" },
        { "metricKey": "avg_delay_in_harvest", "metricLabel": "Avg. Delay in Harvest" }
      ],
      INPUT: [
        { "metricKey": "fieldbook_fill_rate", "metricLabel": "Fieldbook Fill Rate" },
        { "metricKey": "num_agronomy_protocol_steps_completed", "metricLabel": "Num. Agronomy Protocols Completed" },
        { "metricKey": "std_deviations_observations", "metricLabel": "Std. Dev of Observations" }
      ]
    },
  

  feature_mcyg3aru: {
    OUTPUT: [{ metricKey: "num_trials_created", metricLabel: "No of Trials Completed" }],
    DRIVER: [
      { metricKey: "trial_completion_rate", metricLabel: "Trial Completion Rate" },
      { metricKey: "planting_to_harvest_completion_rate", metricLabel: "Planting to Harvest Completion Rate" },
      { metricKey: "avg_time_to_complete_trial", metricLabel: "Avg. Time to Complete Trial" },
    ],
    INPUT: [
      { metricKey: "num_fields_harvested", metricLabel: "Num. Fields Harvested" },
      { metricKey: "num_fields_planted", metricLabel: "Num. Fields Planted" },
      { metricKey: "no_of_trials_created", metricLabel: "Total Trials Created" },
    ],
  },


  feature_mdu6ner8: {
    OUTPUT: [
      { "metricKey": "avg_time_to_complete_trial", "metricLabel": "Avg. Time to Complete Trial" },
    ],

    INPUT: [
      { "metricKey": "avg_delay_in_harvest", "metricLabel": "Avg. Delay in Harvest" },
      { "metricKey": "avg_delay_in_agronomy_protocol", "metricLabel": "Avg. Delay in Agronomy Protocol" },
      { "metricKey": "avg_delay_in_observations", "metricLabel": "Avg. Delay in Observation Protocol" },
      { "metricKey": "avg_delay_in_planting", "metricLabel": "Avg. Delay in Planting" },
    ]
  },
  
  feature_mcygu7lb: {
    OUTPUT: [
      { metricKey: "num_fields_harvested", metricLabel: "No of Fields Harvested" },
      { metricKey: "avg_delay_in_harvest", metricLabel: "Avg. Time to Complete Harvest" },
    ],
    DRIVER: [
      { metricKey: "fieldbook_fill_rate", metricLabel: "Fieldbook Fill Rate" },
      { metricKey: "avg_delay_in_observations", metricLabel: "Avg. Delay in Observations" },
      { metricKey: "avg_delay_in_agronomy_protocol", metricLabel: "Avg. Delay in Agronomy Protocol" },
      { metricKey: "avg_delay_in_planting", metricLabel: "Avg. Delay in Planting" },
      { metricKey: "avg_delay_in_harvest", metricLabel: "Avg. Delay in Harvest" },
    ],
    INPUT: [{ metricKey: "num_fields_planted", metricLabel: "Num. Fields Planted" }],
  },
};

export const explanationInsightsConfig = {
  overview_lever: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_entries_advanced",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_entries_advanced",
        timegrain: "month",
        dimensions: ["crop_name"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_entries_advanced",
        timegrain: "month",
        dimensions: ["user_region"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
  ],
  decision_mbmcip2a: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["crop_name"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["user_region"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["trial_location"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
  ],
  feature_mbrug9mq: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["crop_name"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["user_region"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
  ],
  feature_mcyg3aru: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["trial_location"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "num_trials_created",
        timegrain: "month",
        dimensions: ["zone"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
  ],
  feature_mcygu7lb: [
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "no_of_fields_harvested",
        timegrain: "month",
        filters: [],
      },
      insight_type: "trend",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "no_of_fields_harvested",
        timegrain: "month",
        dimensions: ["crop_name"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
    {
      payload: {
        fromtime: "2025-02-01",
        totime: "2025-07-31",
        metric_name: "no_of_fields_harvested",
        timegrain: "month",
        dimensions: ["trial_location"],
        filters: [],
      },
      insight_type: "contributor",
      workspace_id: "workspace_99398cfd-dfd4-4195-8702-82dcfdd4efac",
      tenant_id: null,
    },
  ],
};
