import { useRouter } from "next/router";
import BoardPage from "../../../modules/insights/pages/BoardPage";

export default function Board() {
  const router = useRouter();
  const { boardId, workflowId } = router.query;

  if (!boardId || typeof boardId !== "string") return <p>Board not found</p>;

  return <BoardPage workflowId={workflowId} boardId={boardId} />;
}
