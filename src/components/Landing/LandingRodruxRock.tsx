"use client";
import { useGenerateFromDNA } from "@/hooks/useGenerateFromDNA";
import Image from "next/image";
import React from "react";

const LandingRodruxRock = () => {
  const { dna, image } = useGenerateFromDNA();
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
      <p>{dna}</p>
    </div>
  );
};

export default LandingRodruxRock;
