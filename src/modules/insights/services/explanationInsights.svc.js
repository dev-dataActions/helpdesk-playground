import { request } from "../../container/util/api.util";

/**
 * Fetch explanation insights for a specific decision
 * @param {Object} payload - The payload for the explanation insights API
 * @param {string} workspaceId - Workspace ID
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Array<string>|null>} Array of insight strings or null on error
 */
export const fetchExplanationInsights = async (payload, workspaceId) => {
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not configured");
    return null;
  }

  // Validate required parameters
  if (!payload || !workspaceId) {
    console.error("Missing required parameters for fetchExplanationInsights");
    return null;
  }

  try {
    const url = `https://dametrics.dataactions.ai/getInsightFeed`;

    // TODO: Uncomment when API is ready
    const response = await request(url, "POST", { body: payload });
    return response || [];

    // Dummy data for development
    // const dummyInsights = getDummyInsights(payload?.insight_type);
    // return dummyInsights;
  } catch (error) {
    console.error("Error fetching explanation insights:", error);
    return null;
  }
};

// /**
//  * Get dummy insights based on insight type for development
//  * @param {string} insightType - Type of insight (summary, trend, contributor, ranking)
//  * @returns {Array<string>} Array of dummy insight strings
//  */
// const getDummyInsights = (insightType) => {
//   const dummyData = {
//     summary: [
//       "Your completed projects have increased by 15% compared to last month",
//       "The average completion time has improved by 2.3 days",
//       "Project success rate is currently at 87%, which is above target",
//     ],
//     trend: [
//       "There's a consistent upward trend in project completion over the last 3 months",
//       "The growth rate has accelerated by 8% since the beginning of the quarter",
//       "Seasonal patterns show peak performance during mid-month periods",
//     ],
//     contributor: [
//       "Region A contributes 35% of total completed projects",
//       "Region B shows the highest growth rate at 22%",
//       "Region C has the most consistent performance with 94% reliability",
//     ],
//     ranking: [
//       "Trial Project Alpha ranks #1 with 95% completion rate",
//       "Trial Project Beta shows the highest efficiency improvement",
//       "Trial Project Gamma leads in cost optimization metrics",
//     ],
//   };

//   return dummyData[insightType] || dummyData.summary;
// };
