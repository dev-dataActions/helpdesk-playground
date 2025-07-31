import { useRouter } from "next/router";
import { useTenantId } from "../../../../modules/insights/hooks/useTenantId";
import { useRoleId } from "../../../../modules/insights/hooks/useRoleId";
import { ScreenLayout } from "da-apps-sdk";
import { MetricWhyPage } from "../../../../modules/insights/pages/MetricWhyPage";
import { RoleDropdown } from "../../../../modules/insights/components/RoleDropdown";

export default function MetricsWhyPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();

  const handleRoleChange = () => {
    try {
      router.push("/insights");
    } catch (error) {
      console.error("Navigation error on role change:", error);
    }
  };

  const { roleId, setRoleId } = useRoleId(handleRoleChange);

  const handleNavigate = (path) => {
    try {
      router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error("Back navigation error:", error);
    }
  };

  const roleDropdown = <RoleDropdown roleId={roleId} setRoleId={setRoleId} />;

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]} actions={roleDropdown}>
      <MetricWhyPage
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        metricId={router?.query?.metricId}
        metricLabel={router?.query?.metricLabel}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
