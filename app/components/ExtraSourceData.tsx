import { FC } from "react";
import { RankingType } from "../types";

interface ExtraSourceDataProps {
  source: RankingType;
  trustWorthiness?: number;
}

const ExtraSourceData: FC<ExtraSourceDataProps> = ({
  source,
}: ExtraSourceDataProps) => {
  return (
    <div>
      <p>Authority: {source.authority}</p>
      <p>Clarity: {source.clarity}</p>
      <p>Evidence Density: {source.evidenceDensity}</p>
      <p>Linguistic Integrity: {source.linguisticIntegrity}</p>
      <p>Objectivity: {source.objectivity}</p>
      <p>User Trust: {source.userTrust}</p>
    </div>
  );
};

export default ExtraSourceData;
