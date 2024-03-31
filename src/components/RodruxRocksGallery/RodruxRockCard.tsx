"use client";
import Image from "next/image";
import React from "react";
import { RodruxRockImage } from "../RodruxRock/RodruxRockImage";

export const RodruxRockCard = ({ rodruxRock }: { rodruxRock: RodruxRock }) => {
  return (
    <div className="w-72 flex flex-col items-center justify-center gap-3 p-2">
      <div>
        <RodruxRockImage image={rodruxRock.image}></RodruxRockImage>
      </div>
      <p>{rodruxRock.name}</p>
    </div>
  );
};
