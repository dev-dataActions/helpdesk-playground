export const getBoardsByWorkflowId = async (workflowId, staging = false) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/board?workflow_id=${workflowId}&staging=${staging}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
