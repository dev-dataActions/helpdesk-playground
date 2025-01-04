import { DashboardLayout, Insight, ValidDashboardColumns } from "@/da-insight-kit";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { deletePin, IPin } from "@/services/pins.svc";
import { toast } from "react-toastify";

export interface IPinsProps {
  pins: IPin[];
}
export const Pins: React.FC<IPinsProps> = ({ pins }) => {
  const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID;

  if (!pins || !WORKSPACE_ID) return <div>No pins found</div>;

  return (
    <DashboardLayout
      cols={ValidDashboardColumns.TWELVE}
      title="Pinned Insights"
      description="You can browse your workflow live-boards and pin insights to quickly access and monitor"
    >
      {pins?.map((pin) => {
        return (
          <Insight
            key={pin?.id}
            workspaceId={WORKSPACE_ID}
            title={pin?.data?.title}
            type={pin?.data?.chartType}
            metrics={pin?.data?.metrics}
            spanCols={ValidSpanColumns.FOUR}
            className="h-60"
            actions={[
              {
                name: "Remove from pins",
                onClick: () => {
                  deletePin(pin?.id).then(() => toast("Removed from pins"));
                },
              },
            ]}
          />
        );
      })}
    </DashboardLayout>
  );
};
