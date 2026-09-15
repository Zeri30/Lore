import { API_BASE_URL } from "./config";
import { ApiError, NetworkError } from "./errors";

type QueryValue = string | number | boolean | undefined | null;

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  /** JSON-serializable body, or a FormData instance for file uploads. */
  body?: unknown;
  /** Appended to the URL as a query string; null/undefined values are skipped. */
  query?: Record<string, QueryValue>;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const base = path.startsWith("http") ? path : `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
  const url = new URL(base);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, query, headers, ...rest } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      ...rest,
      // Sanctum-style SPA auth relies on the session cookie being sent with every request.
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    });
  } catch (cause) {
    throw new NetworkError(cause);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    const message =
      (typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: unknown }).message)
        : null) ?? `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) => request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
