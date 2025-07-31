import { Dropdown } from "da-apps-sdk";

const ROLE_OPTIONS = [
  { label: "DGO", value: "DGO" },
  { label: "ROL", value: "ROL" },
  { label: "OTL", value: "OTL" },
  { label: "Field Staff", value: "FIELD_STAFF" },
];

export const RoleDropdown = ({ roleId, setRoleId }) => {
  return (
    <div className="w-48">
      <Dropdown
        inlineLabel="Role"
        options={ROLE_OPTIONS}
        placeHolder="Select Role"
        selectedOption={roleId}
        setSelectedOption={setRoleId}
        allowNone={true}
      />
    </div>
  );
};
