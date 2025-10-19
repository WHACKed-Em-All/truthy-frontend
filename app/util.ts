import { Dispatch, SetStateAction } from "react";
import { ClusterNodeType, MessageType, SourceType } from "./types";

export const handleMessage = (
  messageData: string,
  setConsensus: Dispatch<SetStateAction<string>>,
  setClusterNodes: Dispatch<SetStateAction<ClusterNodeType[]>>,
  setSources: Dispatch<SetStateAction<SourceType[]>>,
  setAlternativeViews: Dispatch<SetStateAction<string[]>>
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
      break;
    case "graphnode":
      setClusterNodes(data);
      break;
    case "ranking":
      break;
    case "summary":
      break;
    case "status":
      break;
    case "consensus":
      setConsensus(message.consensus);
      break;
    case "alternative":
      break;
    default:
      throw new Error(`Unhandled message type: ${type}`);
  }
};
