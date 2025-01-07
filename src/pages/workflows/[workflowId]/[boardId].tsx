import BoardPage from "@/modules/insights/pages/BoardPage";
import { useRouter } from "next/router";

export default function Board() {
  const router = useRouter();
  const { boardId } = router.query;

  if (!boardId || typeof boardId !== "string") return <p>Board not found</p>;

  return <BoardPage boardId={boardId} />;
}
