const NEXT_PUBLIC_BACKEND_URL = "https://backend.dataactions.ai";
export const getInsightByWorkspaceIdAndInsightId = async (
  workspaceId: string,
  insightId: string
) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/insights?workspace_id=${workspaceId}&insight_id=${insightId}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
