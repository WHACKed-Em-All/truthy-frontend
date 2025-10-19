"use client";

import { FC, lazy, Suspense } from "react";
import { ClusterNodeType } from "../types";

// Use lazy loading with Suspense for better isolation
const PlotComponent = lazy(() => 
  import("react-plotly.js").then(module => ({ default: module.default }))
);

interface ClusterProps {
  clusterItems: ClusterNodeType[];
}

const colours = ["red", "blue", "green", "orange", "magenta", "cyan"];

const getNumClusterItems = (clusterItems: ClusterNodeType[]): number => {
  return (
    clusterItems.reduceRight((max, cluster) =>
      max.clusterId > cluster.clusterId ? max : cluster
    ).clusterId + 1
  );
};

const Cluster: FC<ClusterProps> = ({ clusterItems }: ClusterProps) => {
  const numClusters = getNumClusterItems(clusterItems);

  let clusters = [];
  for (let i = 0; i < numClusters; i++) {
    clusters.push(clusterItems.filter((item) => item.clusterId === i));
  }

  const traces = clusters.map((cluster, idx) => {
    return {
      x: cluster.map((item) => item.visX),
      y: cluster.map((item) => item.visY),
      mode: "markers" as const,
      type: "scatter" as const,
      name: `Cluster ${idx + 1}`,
      marker: {
        color: colours[idx % colours.length],
        size: 10,
      },
    };
  });

  const layout = {
    title: {
      text: "Source Clusters",
    },
    paper_bgcolor: "gray",
    plot_bgcolor: "gray",
  };

  return (
    <Suspense 
      fallback={
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
          Loading plot...
        </div>
      }
    >
      <PlotComponent
        data={traces}
        layout={layout}
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    </Suspense>
  );
};

export default Cluster;
