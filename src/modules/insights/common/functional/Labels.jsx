import { Label } from "../base/Label";
import { IoAddOutline } from "react-icons/io5";
import { PopupWrapper } from "../functional/PopupWrapper";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { useState } from "react";
import { toast } from "react-toastify";
import { MultiSelectDropdown } from "../base/MultiDropdown";
import { Button } from "../base/Button";
import { Loader } from "../base/Loader";

export const LabelsForm = ({ selectedLabels = [], allLabels = [], handleUpdateLabels, close }) => {
  const [selected, setSelected] = useState(selectedLabels);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await handleUpdateLabels(selected);
      toast.success("Labels updated successfully");
      close();
    } catch (error) {
      console.error("Error updating labels:", error);
      toast.error("Failed to update labels");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-2.5 w-64 flex flex-col gap-2 border border-gray-300 rounded-md" onSubmit={handleSubmit}>
      <MultiSelectDropdown options={allLabels} selectedOptions={selected} setSelectedOptions={setSelected} />
      <div className="flex justify-end gap-2">
        <Button onClick={() => close()} className="bg-gray-200 hover:bg-gray-300 w-20" label="Cancel" />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-24"
          label={loading ? <Loader loaderText="Loading" /> : "Save"}
        />
      </div>
    </form>
  );
};

export const Labels = ({ labels = [] }) => {
  const { containerRef, visibleCount, showAll } = useResizeObserver(labels);

  try {
    if (labels.length === 0) {
      return <div className="text-gray-500 text-xs">No labels</div>;
    }

    return (
      <div ref={containerRef} className="w-36 flex gap-1 cursor-pointer">
        {labels.map((label, idx) =>
          idx < visibleCount ? (
            <div
              key={label}
              className="text-gray-600 border border-gray-300 rounded-xl px-2 py-0.5 text-xs whitespace-nowrap"
            >
              {label}
            </div>
          ) : idx === visibleCount && !showAll ? (
            <div
              key="+more"
              className="text-gray-600 border border-gray-300 rounded-xl px-2 py-0.5 text-xs whitespace-nowrap"
            >
              +{labels.length - visibleCount}
            </div>
          ) : null
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering labels:", error);
    return <div className="w-36 text-gray-500 text-xs">Error loading labels</div>;
  }
};

export const EditableLabels = ({
  labels = [],
  allLabels = [],
  handleUpdateLabels,
  labelType = "labels",
  FormComponent = LabelsForm, // fallback for now
}) => {
  try {
    if (!handleUpdateLabels || typeof handleUpdateLabels !== "function") {
      return <Labels labels={labels} />;
    }
    return (
      <PopupWrapper
        trigger={
          !labels || labels.length === 0 ? (
            <Label
              icon={<IoAddOutline size={16} />}
              text={`Add ${labelType}`}
              className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
            />
          ) : (
            <Labels labels={labels} />
          )
        }
      >
        <FormComponent selectedLabels={labels} allLabels={allLabels} handleUpdateLabels={handleUpdateLabels} />
      </PopupWrapper>
    );
  } catch (error) {
    console.error("Error rendering EditableLabels:", error);
    return <div className="text-red-500 text-xs">Error loading labels</div>;
  }
};
