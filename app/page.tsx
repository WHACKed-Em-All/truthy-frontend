import { FC } from "react";
import QueryBar from "./components/QueryBar";
import TopSourcesSlideshow from "./components/TopSourcesSlideshow";

const handleSubmit = async (query: string) => {
  "use server";
  console.log(query);
};

const Home: FC = () => {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen">
      <main className="w-full h-full">
        <div className="w-4/5 m-[10%]">
          <div>
            <QueryBar handleSubmit={handleSubmit} />
          </div>
          <div>
            <TopSourcesSlideshow
              sources={[
                "something",
                "something2",
                "something3",
                "something4",
                "something5",
                "something6",
                "something7",
                "something8",
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
