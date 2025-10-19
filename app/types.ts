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
  aggregatedTrust?: number; // T
  authority?: number; // A
  evidenceDensity?: number; // E
  objectivity?: number; // O
  clarity?: number; // C
  linguisticIntegrity?: number; // L
  userTrust?: number; // U
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

export type RankingType = {
  sourceId: string;
  sourceName: string;
  aggregatedTrust: number; // T
  authority: number; // A
  evidenceDensity: number; // E
  objectivity: number; // O
  clarity: number; // C
  linguisticIntegrity: number; // L
  userTrust: number; // U
};

export type MessageType =
  | "source"
  | "graphnode"
  | "ranking"
  | "status"
  | "consensus"
  | "alternative"
  | "error"
  | "sources";
