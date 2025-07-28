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
