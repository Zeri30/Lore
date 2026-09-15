/** Thrown for any non-2xx response. `data` is the parsed body (JSON or text) when available. */
export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;
  /** Laravel validation errors, when the response body is a standard `{ message, errors }` shape. */
  readonly errors?: Record<string, string[]>;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.errors =
      typeof data === "object" && data !== null && "errors" in data
        ? ((data as { errors?: Record<string, string[]> }).errors ?? undefined)
        : undefined;
  }

  get isValidationError() {
    return this.status === 422;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }
}

/** Thrown when the request never reached the server (offline, DNS, CORS, timeout, etc). */
export class NetworkError extends Error {
  constructor(cause: unknown) {
    super("Unable to reach the server. Check your connection and try again.");
    this.name = "NetworkError";
    this.cause = cause;
  }
}
