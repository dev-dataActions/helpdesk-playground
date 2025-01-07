import { usePins } from "@/modules/insights/hooks/usePins";
import { useWorkflows } from "@/modules/insights/hooks/useWorkflows";
import { Pins } from "@/modules/insights/components/Pins";
import { Workflows } from "@/modules/insights/components/Workflows";

export default function InsightHomePage() {
  const { pins } = usePins("userId"); // replace with actual userId
  const { workflows } = useWorkflows("userId"); // replace with actual userId

  return (
    <div className="flex flex-col gap-y-8 p-10">
      <Pins pins={pins} />
      <Workflows workflows={workflows} />
    </div>
  );
}
