export const apiClient = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  options: RequestInit = {}
): Promise<T> => {
  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method,
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    config
  );

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!response.ok) {
    let message = text;
    if (contentType.includes("application/json")) {
      try {
        const json = JSON.parse(text);
        message = json?.message || JSON.stringify(json);
      } catch (_) {
        message = "Gagal mem-parsing error JSON dari server.";
      }
    }
    throw new Error(message);
  }

  if (!text) return undefined as T;

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as T;
    } catch (err) {
      throw new Error("Gagal mem-parsing JSON.");
    }
  }

  return text as unknown as T;
};
