export type SourceType = {
  id: string;
  sourceName: string;
  url: string;
  authorId: string;
  authorUsername: string;
  authorFollowers: number;
  authorKarma: number;
  authorVerified: boolean;
  authorCreated: Date;
};

export type ClusterNodeType = {
  id: string;
  summary: string;
  sentiment: string;
  trustworthiness: number;
  disFromCon: number;
  clusterId: number;
  visX: number;
  visY: number;
};

export type MessageType =
  | "source"
  | "graphnode"
  | "ranking"
  | "summary"
  | "status"
  | "consensus"
  | "alternative"
  | "error";
