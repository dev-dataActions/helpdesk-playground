import { useRouter } from "next/router";
import BoardPage from "../../modules/insights/pages/BoardPage";

export default function BoardPageContainer() {
  const { query } = useRouter();
  return (
    <BoardPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_01464be9-2a02-471d-a873-f3df68f17c4a"
      boardId={query.boardId}
      featureId={query.featureId}
    />
  );
}
