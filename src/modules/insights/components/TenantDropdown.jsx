import { Dropdown } from "../common/base/Dropdown";
import { useTenants } from "../hooks/useTenants";

export const TenantDropdown = ({ workspaceId, tenantId, setTenantId }) => {
  const { tenants } = useTenants(workspaceId);
  return (
    <div className="w-full">
      <Dropdown
        options={tenants?.map((x) => ({ label: x.name, value: x.id }))}
        placeHolder="Admin"
        selectedOption={tenantId}
        setSelectedOption={setTenantId}
        allowNone={true}
      />
    </div>
  );
};
