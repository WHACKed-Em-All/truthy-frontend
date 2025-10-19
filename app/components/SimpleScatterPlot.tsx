"use client";

import { FC } from "react";
import { ClusterNodeType } from "../types";

interface ClusterProps {
  clusterItems: ClusterNodeType[];
}

const colours = ["red", "blue", "green", "orange", "magenta", "cyan"];

const getNumClusterItems = (clusterItems: ClusterNodeType[]): number => {
  if (clusterItems.length === 0) return 0;
  return (
    clusterItems.reduceRight((max, cluster) =>
      max.clusterId > cluster.clusterId ? max : cluster
    ).clusterId + 1
  );
};

const SimpleScatterPlot: FC<ClusterProps> = ({ clusterItems }) => {
  const numClusters = getNumClusterItems(clusterItems);

  let clusters = [];
  for (let i = 0; i < numClusters; i++) {
    clusters.push(clusterItems.filter((item) => item.clusterId === i));
  }

  // Find min/max for scaling
  const allX = clusterItems.map((item) => item.visX);
  const allY = clusterItems.map((item) => item.visY);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * 400 + 50;
  const scaleY = (y: number) => ((maxY - y) / (maxY - minY)) * 300 + 50; // Flip Y axis

  return (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Source Clusters
      </h3>
      <svg width="500" height="350" className="mx-auto">
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line
          x1="50"
          y1="350"
          x2="450"
          y2="350"
          stroke="#374151"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="350"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Data points */}
        {clusters.map((cluster, clusterIdx) =>
          cluster.map((item, itemIdx) => (
            <circle
              key={`${clusterIdx}-${itemIdx}`}
              cx={scaleX(item.visX)}
              cy={scaleY(item.visY)}
              r="6"
              fill={colours[clusterIdx % colours.length]}
              stroke="white"
              strokeWidth="2"
              className="hover:r-8 transition-all cursor-pointer"
            />
          ))
        )}

        {/* Legend */}
        {clusters.map((_, idx) => (
          <g key={`legend-${idx}`}>
            <circle
              cx={460}
              cy={70 + idx * 25}
              r="5"
              fill={colours[idx % colours.length]}
            />
            <text
              x={475}
              y={75 + idx * 25}
              fontSize="12"
              fill="#374151"
              className="font-medium"
            >
              Cluster {idx + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SimpleScatterPlot;
