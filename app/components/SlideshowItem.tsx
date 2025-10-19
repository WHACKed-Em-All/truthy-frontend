import { FC } from "react";
import { SourceType, TrustType } from "../types";
import ExtraSourceData from "./ExtraSourceData";

interface SlideshowItemProps {
  source: SourceType;
  trustValues?: TrustType;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
  totalItems: number;
}

const SlideshowItem: FC<SlideshowItemProps> = ({
  source,
  trustValues,
  isHovered,
  onHover,
  onLeave,
  index,
  totalItems,
}: SlideshowItemProps) => {
  // Determine transform origin based on position
  const getTransformOrigin = (): string => {
    if (index === 0) return "origin-left"; // First item expands to the right
    if (index === totalItems - 1) return "origin-right"; // Last item expands to the left
    return "origin-center"; // Middle items expand from center
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 
        dark:from-blue-900 dark:to-purple-900 cursor-pointer transition-all duration-500 ease-in-out
        ${
          isHovered
            ? `transform scale-125 z-50 shadow-2xl bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 w-48 h-auto ${getTransformOrigin()}`
            : "min-w-32 h-20 shadow-md hover:shadow-lg"
        }
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`
        ${isHovered ? "text-lg font-bold" : "text-sm"}
        transition-all duration-300 text-gray-800 dark:text-gray-200
      `}
      >
        <a href={source.url}>{source.sourceName}</a>
      </div>
      {isHovered && (
        <div className="mt-2 text-gray-600 dark:text-gray-400 animate-fade-in text-xs">
          {trustValues && <ExtraSourceData trustValues={trustValues} />}
        </div>
      )}
    </div>
  );
};

export default SlideshowItem;
