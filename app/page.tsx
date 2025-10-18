"use client";

import { FC, useEffect, useState } from "react";
import QueryBar from "./components/QueryBar";
import TopSourcesSlideshow from "./components/TopSourcesSlideshow";
import { queryClient } from "./api/client";
import { SourceType, ClusterNodeType } from "./types";

const ws = new WebSocket("ws://localhost:8080/ws");

const handleSubmit = async (query: string) => {
  await queryClient.newQuery({ query }, ws);
};

const Home: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [sources, setSources] = useState<SourceType[]>([]);

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send("Hello, WebSocket!");
    };
    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="font-sans items-center justify-items-center w-[80%] min-h-screen">
        <main className="w-full h-full">
          {/* Blurred & transparent background image layer */}
          <div
            className="absolute inset-0 bg-center opacity-60 blur-sm"
            style={{
              backgroundImage: `url('/background.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "600px",
              backgroundColor: "#AEAEAE",
            }}
          />
          <div className="w-4/5 m-[10%]">
            <div>
              <QueryBar
                handleSubmit={handleSubmit}
                query={query}
                setQuery={setQuery}
              />
            </div>
            <div>
              <TopSourcesSlideshow sources={sources} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
