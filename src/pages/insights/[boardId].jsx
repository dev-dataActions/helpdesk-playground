import { useRouter } from "next/router";
import BoardPage from "../../modules/insights/pages/BoardPage";

export default function BoardPageContainer() {
  const { query } = useRouter();
  return (
    <BoardPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_9a7d6508-a2c5-481e-868c-c26e69276238"
      apiKey="secret"
      boardId={query.boardId}
      featureId={query.featureId}
    />
  );
}
