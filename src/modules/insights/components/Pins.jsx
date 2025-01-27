import { toast } from "react-toastify";
import { deletePin } from "../services/pins.svc";
import { DashboardLayout, Insight, ValidDashboardColumns, ValidSpanColumns } from "da-insight-kit";

export const Pins = ({ pins }) => {
  if (!pins) return <div>No pins found</div>;
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
            title={pin?.data?.title}
            type={pin?.data?.chartType}
            metrics={pin?.data?.metrics}
            actions={[
              {
                name: "Remove from pins",
                onClick: () => {
                  deletePin(pin?.id).then(() => toast("Removed from pins"));
                },
              },
            ]}
            options={{
              spanCols: ValidSpanColumns.FOUR,
              className: "h-60",
            }}
          />
        );
      })}
    </DashboardLayout>
  );
};
