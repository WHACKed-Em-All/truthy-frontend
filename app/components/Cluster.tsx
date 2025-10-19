import { FC } from "react";
import { ClusterNodeType } from "../types";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";

interface ClusterProps {
  clusterItems: ClusterNodeType[];
}

const colours = ["red", "blue", "green", "orange", "magenta", "cyan"];

const getNumClusterItems = (clusterItems: ClusterNodeType[]): number => {
  if (clusterItems.length === 0) {
    return 0;
  }
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
    } as Partial<Data>;
  });

  const layout: Partial<Layout> = {
    title: {
      text: "Source Clusters",
    },
    paper_bgcolor: "gray",
    plot_bgcolor: "gray",
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
};

export default Cluster;
