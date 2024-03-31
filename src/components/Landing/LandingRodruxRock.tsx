"use client";
import { useGenerateFromDNA } from "@/hooks/useGenerateFromDNA";
import Image from "next/image";
import React from "react";
import MintButton from "./MintButton";
import { useRodruxRocks } from "@/hooks/useRodruxRocks";
import { RodruxRockImage } from "../RodruxRock/RodruxRockImage";

const LandingRodruxRock = () => {
  const { mintRodruxRock, isPending } = useRodruxRocks();
  const { image } = useGenerateFromDNA();
  return (
    <div>
      <RodruxRockImage image={image}></RodruxRockImage>
      <MintButton
        mintRodruxRock={mintRodruxRock}
        isPending={isPending}
      ></MintButton>
    </div>
  );
};

export default LandingRodruxRock;
