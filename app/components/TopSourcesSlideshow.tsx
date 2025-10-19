"use client";

import { FC, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RankingType, SourceType } from "../types";
import SlideshowItem from "./SlideshowItem";

interface TopSourcesSlideshowProps {
  sources: RankingType[];
}

const TopSourcesSlideshow: FC<TopSourcesSlideshowProps> = ({
  sources,
}: TopSourcesSlideshowProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max px-20 py-4 transition-all duration-500">
          {sources.map((source, idx) => {
            // Calculate dynamic spacing based on hovered item
            const marginClass = hoveredIndex !== null ? "ml-2 mr-2" : "mr-4";

            return (
              <div
                key={idx}
                className={`${marginClass} transition-all duration-500`}
              >
                <SlideshowItem
                  source={source}
                  isHovered={hoveredIndex === idx}
                  onHover={() => setHoveredIndex(idx)}
                  onLeave={() => setHoveredIndex(null)}
                  index={idx}
                  totalItems={sources.length}
                />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TopSourcesSlideshow;
