import { useState, useEffect, useCallback } from "react";
import { Dropdown } from "da-apps-sdk";
import { fetchDimensionValues } from "../../container/services/insights.svc";

/**
 * BoardFilters component for rendering filter dropdowns
 * @param {Object} props - Component props
 * @param {Array} props.filters - Array of filter configurations
 * @param {Object} props.activeFilters - Currently active filter values
 * @param {Function} props.setActiveFilters - Function to update active filters
 * @param {string} props.workspaceId - Workspace ID
 */
export const BoardFilters = ({ filters, activeFilters, setActiveFilters, workspaceId }) => {
  const [dimensionValues, setDimensionValues] = useState({});

  // Memoize the filter update function to prevent infinite loops
  const handleFilterChange = useCallback(
    (dimension, value) => {
      if (setActiveFilters) {
        setActiveFilters((prev) => ({ ...prev, [dimension]: value }));
      }
    },
    [setActiveFilters]
  );

  // Fetch dimension values for each filter - only run when filters or workspaceId change
  useEffect(() => {
    if (!filters || !workspaceId) return;

    (async function () {
      try {
        const results = {};
        for (const filter of filters) {
          if (filter?.dimension) {
            const values = await fetchDimensionValues(filter.dimension, workspaceId, undefined);
            results[filter.dimension] = Array.isArray(values) ? values : [];
          }
        }
        setDimensionValues(results);
      } catch (error) {
        console.error("Error fetching dimension values:", error);
      }
    })();
  }, [filters, workspaceId]); // Removed setActiveFilters and activeFilters from dependencies

  // Initialize active filters only once when component mounts
  useEffect(() => {
    if (setActiveFilters && (!activeFilters || Object.keys(activeFilters).length === 0)) {
      const initialFilters = {};
      if (filters && filters.length > 0) {
        for (const filter of filters) {
          if (filter?.dimension && filter?.value) {
            initialFilters[filter.dimension] = filter.value;
          }
        }
      }
      setActiveFilters(initialFilters);
    }
  }, [filters, setActiveFilters]);

  if (!filters || filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
      {filters.map((filter) => (
        <div className="w-64" key={filter?.dimension}>
          <Dropdown
            placeHolder={"All"}
            inlineLabel={filter?.dimension}
            options={dimensionValues?.[filter?.dimension]?.map((v) => ({ label: v, value: v })) || []}
            selectedOption={activeFilters?.[filter?.dimension]}
            setSelectedOption={(val) => handleFilterChange(filter.dimension, val)}
            allowNone={true}
          />
        </div>
      ))}
    </div>
  );
};
