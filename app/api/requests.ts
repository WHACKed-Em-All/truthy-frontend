export type NewQueryRequest = {
  query: string;
};

export type NewQueryResponse = {
  queryId: string;
};

export type PollQueryRequest = {
  queryId: string;
};

export type PollQueryStatusType = "pending" | "completed";

export type DataType = null;

export type PollQueryResponse = {
  queryId: string;
  query: string;
  time: Date;
  status: PollQueryStatusType;
  data?: DataType;
};
