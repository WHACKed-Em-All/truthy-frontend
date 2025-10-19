import { FC } from "react";

interface AlternativeViewsProps {
  alternativeViews: string[];
}

const AlternativeViews: FC<AlternativeViewsProps> = ({
  alternativeViews,
}: AlternativeViewsProps) => {
  return (
    <ul>
      {alternativeViews.map((view, idx) => (
        <li key={idx}>{view}</li>
      ))}
    </ul>
  );
};

export default AlternativeViews;
