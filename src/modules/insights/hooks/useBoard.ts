import { useEffect, useState } from "react";
import { IBoard, getBoardByBoardId } from "../services/boards.svc";

export default function useBoard(boardId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [board, setBoard] = useState<IBoard | null>(null);

  useEffect(() => {
    if (!boardId) return;
    setLoading(true);
    getBoardByBoardId(boardId)
      .then((data) => setBoard(data))
      .finally(() => setLoading(false));
  }, [boardId]);

  return { board, loading };
}
