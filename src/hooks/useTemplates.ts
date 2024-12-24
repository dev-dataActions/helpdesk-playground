import {
  getTemplatesByWorkspaceIdAndUserId,
  Template,
} from "@/services/templates.svc";
import { useEffect, useState } from "react";
export default function useTemplates(workspaceId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Template[] | null>(null);
  useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    getTemplatesByWorkspaceIdAndUserId(workspaceId)
      .then((data) => setTemplates(data))
      .finally(() => setLoading(false));
  });
  return { templates, loading };
}
