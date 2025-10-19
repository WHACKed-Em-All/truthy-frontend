import { Dispatch, SetStateAction } from "react";
import { ClusterNodeType, MessageType, RankingType, SourceType } from "./types";

export const handleMessage = (
  messageData: string,
  setConsensus: Dispatch<SetStateAction<string>>,
  addClusterNodes: (newClusterNodes: ClusterNodeType[]) => void,
  addSources: (newSources: RankingType[]) => void,
  addAlternativeViews: (newAlternatives: string[]) => void
) => {
  console.log("Message received:", messageData);
  const message = JSON.parse(messageData);
  if (!message.type) {
    throw new Error("Type must exist on message for protocol");
  }

  const type: MessageType = message.type;
  const data = message[type];

  switch (type) {
    case "error":
      alert(data);
      break;
    case "source":
      addSources(data);
      break;
    case "graphnode":
      addClusterNodes(
        data.map((item: any) => ({
          id: item.id,
          summary: "",
          sentiment: "",
          trustworthiness: "",
          disFromCon: 0,
          clusterId: item.cluster_id,
          visX: item.vis_x,
          visY: item.vis_y,
        }))
      );
      break;
    case "sources":
      break;
    case "ranking":
      addSources(
        data.map((item: any) => ({
          sourceId: item.source_id,
          sourceName: item.source_name,
          T: item.T,
          A: item.A,
          E: item.E,
          O: item.O,
          C: item.C,
          L: item.L,
          U: item.U,
        }))
      );
      break;
    case "status":
      console.log(data);
      break;
    case "consensus":
      setConsensus(message.consensus);
      break;
    case "alternative":
      addAlternativeViews(data);
      break;
    default:
      throw new Error(`Unhandled message type: ${type}`);
  }
};
