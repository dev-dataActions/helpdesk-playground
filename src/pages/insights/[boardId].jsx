import { useRouter } from "next/router";
import BoardPage from "../../modules/insights/pages/BoardPage";

export default function BoardPageContainer() {
  const { query } = useRouter();
  return (
    <BoardPage workspaceId="asdfas-assadf-234234-sdf" apiKey="secret" boardId={query.boardId} />
  );
}
