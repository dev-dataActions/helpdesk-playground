export const getPinsByUserId = async (userId) => {
  // Your SaaS app backend should have an API to fetch pins by workspaceId and userId
  return fetch(`https://backend.dataactions.ai/pin?workspace_id=arihant&user_id=${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const deletePin = async (pinId) => {
  // Your SaaS app backend should have an API to delete a pin
  const url = `https://backend.dataactions.ai/pin?workspace_id=arihant&user_id=userId&pin_id=${pinId}`;

  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete pin with ID ${pinId}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      console.error("Error deleting pin:", err);
      throw err;
    });
};

export const AddPin = async (payload) => {
  const url = "https://backend.dataactions.ai/pin";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to add pin: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error adding pin:", err);
    throw err;
  }
};
