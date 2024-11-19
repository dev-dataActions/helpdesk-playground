const NEXT_PUBLIC_BACKEND_URL = "https://backend.dataactions.ai";
export const getDimensionOptions = async (params) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dimension`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

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
