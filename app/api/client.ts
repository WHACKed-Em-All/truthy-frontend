import {
  NewQueryRequest,
  PollQueryRequest,
  PollQueryResponse,
} from "./requests";

type ResponseType<T> = [T | null, Error | null];

class QueryClient {
  private backendUrl: string;

  constructor() {
    this.backendUrl = process.env.API_URL || "http://localhost:8080";

    // must end in /
    if (!this.backendUrl.endsWith("/")) {
      this.backendUrl += "/";
    }
  }

  newQuery = async (request: NewQueryRequest, ws: WebSocket): Promise<void> => {
    await ws.send(JSON.stringify({ query: request.query }));
  };

  pollQuery = async (
    request: PollQueryRequest
  ): Promise<ResponseType<PollQueryResponse>> => {
    try {
      const response = await fetch(`${this.backendUrl}${request.queryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return [null, new Error("Failed to poll query")];
      }

      const data = await response.json();
      const result = {
        queryId: data["query_id"],
        query: data["query"],
        time: new Date(data["time"]),
        status: data["status"],
        data: data["status"] === "completed" ? data["data"] : undefined,
      };
      return [result, null];
    } catch (error) {
      return [null, error as Error];
    }
  };
}

// Single instance
export const queryClient = new QueryClient();
