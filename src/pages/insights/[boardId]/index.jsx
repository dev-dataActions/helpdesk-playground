import { useRouter } from "next/router";
import BoardPage from "../../../modules/insights/pages/BoardPage";

export default function BoardPageContainer() {
  const { query } = useRouter();

  const mode = process.env.NEXT_PUBLIC_PRODUCT_MODE;
  const appId =
    mode === "LITE"
      ? process.env.NEXT_PUBLIC_LITE_CFA_APP_ID
      : process.env.NEXT_PUBLIC_PRO_CFA_APP_ID;

  return (
    <BoardPage
      workspaceId={process.env.NEXT_PUBLIC_DEMO_WORKSPACE_ID}
      appId={appId}
      boardId={query.boardId}
      decisionId={query.decisionId}
    />
  );
}
