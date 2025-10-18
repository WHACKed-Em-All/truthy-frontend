import { FC } from "react";
import { SourceType } from "../types";

interface ExtraSourceDataProps {
  source: SourceType;
}

const ExtraSourceData: FC<ExtraSourceDataProps> = ({
  source,
}: ExtraSourceDataProps) => {
  return (
    <div>
      <p>Source Name: {source.sourceName}</p>
      <p>Source URL: {source.url}</p>
      <p>Author: {source.authorUsername}</p>
      <p>Followers: {source.authorFollowers}</p>
      <p>Karma: {source.authorKarma}</p>
      <p>Verified: {source.authorVerified ? "Yes" : "No"}</p>
      <p>Created: {source.authorCreated.toDateString()}</p>
    </div>
  );
};

export default ExtraSourceData;
