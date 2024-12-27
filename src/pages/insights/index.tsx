import { usePins } from "@/hooks/usePins";
import { useWorkflows } from "@/hooks/useWorkflows";
import { Pins } from "@/modules/insights/Pins";
import { Workflows } from "@/modules/insights/Workflows";

export default function InsightPage() {
  const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID;
  const { pins } = usePins("userId"); // replace with actual userId
  const { workflows } = useWorkflows("userId"); // replace with actual userId

  if (!WORKSPACE_ID) return <div>Workspace ID not found</div>;

  return (
    <div className="flex flex-col gap-y-6 p-12">
      <Pins pins={pins} />
      <Workflows workflows={workflows} />
    </div>
  );
}
