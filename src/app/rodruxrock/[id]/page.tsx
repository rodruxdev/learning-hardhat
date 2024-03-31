"use client";
import Header from "@/components/Header/Header";
import { RodruxRockImage } from "@/components/RodruxRock/RodruxRockImage";
import { TransferButton } from "@/components/TrasnferButton/TransferButton";
import { useRodruxRockInfo } from "@/hooks/useRodruxRockInfo";
import { useRodruxRocks } from "@/hooks/useRodruxRocks";
import React from "react";

const RodruxRockInfo = () => {
  const { rodruxRock, isOwner, isPending, transferRodruxRock } =
    useRodruxRockInfo();
  return (
    <div>
      <Header></Header>
      {rodruxRock && (
        <div>
          <RodruxRockImage image={rodruxRock.image}></RodruxRockImage>
          <p>{rodruxRock.name}</p>
          <p>{rodruxRock.owner}</p>
          <TransferButton
            handleClick={transferRodruxRock}
            disabled={isPending || !isOwner}
          ></TransferButton>
        </div>
      )}
    </div>
  );
};

export default RodruxRockInfo;
