export const getWorkflows = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflow`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getWorkflowByWorkflowId = async (workflowId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflow?workflow_id=${workflowId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getMetricsByWorkflowId = async (workflowId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflow-metric?workflow_id=${workflowId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getInsightsByWorkflowId = async (workflowId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflow-insight?workflow_id=${workflowId}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getBoardsByWorkflowId = async (
  workflowId: string,
  staging = true
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/board?workflow_id=${workflowId}&staging=${staging}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getBoardByWorkflowIdAndBoardId = async (
  workflowId: string,
  boardId: string,
  staging = true
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/board?workflow_id=${workflowId}&board_id=${boardId}&staging=${staging}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
