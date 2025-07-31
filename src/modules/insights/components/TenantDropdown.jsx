import { Dropdown } from "da-apps-sdk";
import { useTenants } from "../hooks/useTenants";

export const TenantDropdown = ({ workspaceId, tenantId, setTenantId }) => {
  const { tenants } = useTenants(workspaceId);
  return (
    <div className="w-full">
      <Dropdown
        inlineLabel="Account"
        options={tenants?.map((x) => ({ label: x.name, value: x.id }))}
        placeHolder="Admin"
        selectedOption={tenantId}
        setSelectedOption={setTenantId}
        allowNone={true}
      />
    </div>
  );
};
