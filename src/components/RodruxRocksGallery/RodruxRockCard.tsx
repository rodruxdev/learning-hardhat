"use client";
import Image from "next/image";
import React from "react";

export const RodruxRockCard = ({ rodruxRock }: { rodruxRock: RodruxRock }) => {
  return (
    <div className="w-72 flex flex-col items-center justify-center gap-3 p-2">
      <div>
        {rodruxRock.image && (
          <Image
            src={rodruxRock.image}
            alt="image"
            width={264}
            height={280}
            unoptimized
            priority
          ></Image>
        )}
      </div>
      <p>{rodruxRock.name}</p>
    </div>
  );
};
