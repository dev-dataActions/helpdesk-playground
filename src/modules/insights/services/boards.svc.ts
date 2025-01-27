import { IInsight } from "da-insight-kit";

export interface IBoard {
  board_id: string;
  workflow_id: string;
  data: {
    title: string;
    insights: IInsight[];
    type: string;
  };
  lastUpdated: string;
  deployed: boolean;
}

export const getBoardsByWorkflowId = async (
  workflowId: string,
  staging = false
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
