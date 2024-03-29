import { useAccount } from "wagmi";
import { wagmiContractConfig } from "@/wagmiContractConfig";
import { readContract } from "@wagmi/core";
import { config } from "@/config";
import { getClient } from "wagmi/actions";
import { useRodruxRocks } from "./useRodruxRocks";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_IMAGE = "https://avataaars.io/";
export function useGenerateFromDNA() {
  const { address } = useAccount();
  const { getTotalSupply } = useRodruxRocks();
  const [dna, setDna] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGE);

  const generateDna = useCallback(async () => {
    const totalSupply = await getTotalSupply();
    const dna = await readContract(config, {
      ...wagmiContractConfig,
      functionName: "deterministicPseudoRandomDNA",
      args: [totalSupply],
      account: address,
    });
    if (typeof dna === "bigint") {
      setDna(dna.toString());
    }
  }, [address, getTotalSupply]);

  const generateImage = async (dna: string) => {
    const image = await readContract(config, {
      ...wagmiContractConfig,
      functionName: "imageByDNA",
      args: [BigInt(dna)],
    });
    if (typeof image === "string") {
      setImage(image);
    }
  };

  useEffect(() => {
    if (address) {
      generateDna();
    } else {
      setDna("");
    }
  }, [generateDna]);

  useEffect(() => {
    if (dna) {
      generateImage(dna);
    } else {
      setImage(DEFAULT_IMAGE);
    }
  }, [dna]);

  return { generateDna, dna, image };
}
