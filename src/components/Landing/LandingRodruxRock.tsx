"use client";
import { useGenerateFromDNA } from "@/hooks/useGenerateFromDNA";
import Image from "next/image";
import React from "react";
import MintButton from "./MintButton";
import { useRodruxRocks } from "@/hooks/useRodruxRocks";

const LandingRodruxRock = () => {
  const { mintRodruxRock, isPending } = useRodruxRocks();
  const { image } = useGenerateFromDNA();
  return (
    <div>
      {image && (
        <Image
          src={image}
          alt="image"
          width={264}
          height={280}
          unoptimized
          priority
        ></Image>
      )}
      <MintButton
        mintRodruxRock={mintRodruxRock}
        isPending={isPending}
      ></MintButton>
    </div>
  );
};

export default LandingRodruxRock;
