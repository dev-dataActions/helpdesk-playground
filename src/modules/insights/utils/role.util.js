export const getDecisionIdByRoleId = (roleId) => {
  switch (roleId) {
    case "DGO":
      return "decision_mbmcip2a";
    case "ROL":
      return "feature_mbrug9mq";
    case "OTL":
      return "feature_mcyg3aru";
    case "FIELD_STAFF":
      return "feature_mcygu7lb";
    default:
      return "";
  }
};
