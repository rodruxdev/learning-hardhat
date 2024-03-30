import { useRodruxRocksData } from "@/hooks/useRodruxRocksData";
import React from "react";
import { RodruxRockCard } from "./RodruxRockCard";

export const RodruxRocksGallery = () => {
  const { rodruxRocks } = useRodruxRocksData();
  return (
    <div className="w-full flex flex-wrap gap-4">
      {rodruxRocks?.map((rodruxRock) => (
        <RodruxRockCard
          rodruxRock={rodruxRock}
          key={rodruxRock.name}
        ></RodruxRockCard>
      ))}
    </div>
  );
};
