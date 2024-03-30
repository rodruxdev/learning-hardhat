import { useGenerateFromDNA } from "@/hooks/useGenerateFromDNA";
import { useRodruxRocks } from "@/hooks/useRodruxRocks";
import React from "react";

const MintButton = ({
  mintRodruxRock,
  isPending,
}: {
  mintRodruxRock: (generateDna: () => void) => void;
  isPending: boolean;
}) => {
  const { generateDna } = useGenerateFromDNA();
  const handleMint = () => {
    mintRodruxRock(generateDna);
  };
  return (
    <button
      className={`border-white border-2 rounded text-white ${
        isPending && "bg-gray-500"
      }`}
      onClick={handleMint}
      disabled={isPending}
    >
      Mint RodruxRock
    </button>
  );
};

export default MintButton;
