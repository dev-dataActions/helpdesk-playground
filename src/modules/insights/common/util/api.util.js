import { toast } from "react-toastify";

export async function request(url, method = "GET", options = {}) {
  const { headers = {}, body } = options;
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_APP_BACKEND_API_KEY,
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) {
      let errorMsg = `API Error: ${res.status}`;
      try {
        const data = await res.json();
        errorMsg = data?.message || errorMsg;
      } catch {}
      toast.error(errorMsg);
      return null;
    }

    return await res.json();
  } catch (error) {
    toast.error("Network error: Unable to reach the server.");
    console.error("Network/API error:", error);
    return null;
  }
}
