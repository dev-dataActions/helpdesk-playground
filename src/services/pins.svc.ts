export const getPinsByWorkspaceIdAndUserId = async (workspaceId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pin?workspace_id=${workspaceId}&user_id=arihant`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deletePin = async (workspaceId: string, pinId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pin?workspace_id=${workspaceId}&pin_id=${pinId}&user_id=arihant`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the pin");
    }

    const data = await response.json();
    console.log("Pin deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the delete operation:", error);
    throw error;
  }
};

