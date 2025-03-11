import { useRouter } from "next/router";
import BoardPage from "../../modules/insights/pages/BoardPage";

export default function BoardPageContainer() {
  const { query } = useRouter();
  return (
    <BoardPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_8c2bcb42-53ae-45c5-a284-9d4ab7930135"
      boardId={query.boardId}
      featureId={query.featureId}
    />
  );
}
