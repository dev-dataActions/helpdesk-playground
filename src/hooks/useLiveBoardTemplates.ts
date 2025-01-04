import {
  getLiveBoardTemplatesByWorkspaceIdAndUserId,
  Template,
} from "@/services/templates.svc";
import { useEffect, useState } from "react";
export default function useLiveBoardTemplates(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [liveBoardTemplates, setLiveBoardTemplates] = useState<
    Template[] | null
  >(null);
  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getLiveBoardTemplatesByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setLiveBoardTemplates(data))
      .finally(() => setLoading(false));
  }, [workspaceId]);
  return { liveBoardTemplates, loading };
}
