import { FC } from "react";
import { TrustType } from "../types";

interface ExtraSourceDataProps {
  trustValues: TrustType;
  trustWorthiness?: number;
}

const ExtraSourceData: FC<ExtraSourceDataProps> = ({
  trustValues,
}: ExtraSourceDataProps) => {
  return (
    <div>
      <p>Authority: {trustValues.authority}</p>
      <p>Clarity: {trustValues.clarity}</p>
      <p>Evidence Density: {trustValues.evidenceDensity}</p>
      <p>Linguistic Integrity: {trustValues.linguisticIntegrity}</p>
      <p>Objectivity: {trustValues.objectivity}</p>
      <p>User Trust: {trustValues.userTrust}</p>
    </div>
  );
};

export default ExtraSourceData;
