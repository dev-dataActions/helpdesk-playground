import { Dropdown } from "../common/base/Dropdown";
import { useTenants } from "../hooks/useTenants";

export const TenantDropdown = ({ workspaceId, tenantId, setTenantId }) => {
  const { tenants } = useTenants(workspaceId);
  return (
    <div className="w-48">
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
