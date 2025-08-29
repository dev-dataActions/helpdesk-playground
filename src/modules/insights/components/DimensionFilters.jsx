import { useState, useEffect, useMemo } from "react";
import { Dropdown } from "da-apps-sdk";
import { fetchDimensionValues } from "../../container/services/insights.svc";

const formatDimensionLabel = (dimension) => {
  return dimension.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};

/**
 * DecisionFilters component for rendering filter dropdowns in DecisionOverview
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Object} props.filters - Object of filters with {dimension: value}
 * @param {Function} props.onFilterChange - Function to update active filters
 */
export const DimensionFilters = ({ filters, workspaceId, tenantId, onFilterChange }) => {
  const [dimensionValues, setDimensionValues] = useState({});
  const allDimensionsLoaded = useMemo(
    () => Object.keys(filters).every((dimension) => dimensionValues[dimension]?.length > 0),
    [filters, dimensionValues]
  );

  useEffect(() => {
    if (!filters || !workspaceId) return;
    (async function () {
      const results = {};
      for (const dimension of Object.keys(filters)) {
        if (dimension) {
          const values = await fetchDimensionValues(dimension, workspaceId, tenantId);
          results[dimension] = Array.isArray(values) ? values : [];
        }
      }
      setDimensionValues(results);
    })();
  }, [filters, workspaceId, tenantId]);

  if (!filters) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
      {Object.keys(filters)?.map((dimension) => (
        <div className="w-56" key={dimension}>
          <Dropdown
            placeHolder={"All"}
            inlineLabel={formatDimensionLabel(dimension)}
            options={dimensionValues?.[dimension]?.map((v) => ({ label: v, value: v })) || []}
            selectedOption={filters?.[dimension]}
            setSelectedOption={(value) => onFilterChange((prev) => ({ ...prev, [dimension]: value }))}
            allowNone={true}
            loading={!allDimensionsLoaded}
          />
        </div>
      ))}
    </div>
  );
};
