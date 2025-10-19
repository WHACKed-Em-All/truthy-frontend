import { Dispatch, SetStateAction } from "react";
import { ClusterNodeType, MessageType, SourceType } from "./types";

export const handleMessage = (
  messageData: string,
  setConsensus: Dispatch<SetStateAction<string>>,
  addClusterNodes: (newClusterNodes: ClusterNodeType[]) => void,
  addSources: (newSources: SourceType[]) => void,
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
      addClusterNodes(data);
      break;
    case "ranking":
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
