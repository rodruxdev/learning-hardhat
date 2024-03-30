import { useAccount, useReadContract } from "wagmi";
import { wagmiReadContractConfig } from "@/wagmiContractConfig";
import { readContract } from "@wagmi/core";
import { type ReadContractParameters } from "@wagmi/core";
import { config } from "@/config";
import { getClient } from "wagmi/actions";
import { useRodruxRocks } from "./useRodruxRocks";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_IMAGE = "https://avataaars.io/";
export function useGenerateFromDNA() {
  const { address, chainId } = useAccount();
  const { getTotalSupply } = useRodruxRocks();
  const [dna, setDna] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGE);
  // const { refetch } = useReadContract();

  const generateDna = useCallback(async () => {
    if (!address) {
      setDna("");
      return;
    }
    const totalSupply = await getTotalSupply();
    if (totalSupply < 0) {
      setDna("");
      return;
    }
    const params: ReadContractParameters = {
      ...wagmiReadContractConfig,
      functionName: "deterministicPseudoRandomDNA",
      args: [totalSupply],
      account: address,
      chainId,
    };
    const dna = await readContract(config, params);
    if (typeof dna === "bigint") {
      setDna(dna.toString());
    }
  }, [address, chainId]);

  const generateImage = async (dna: string) => {
    if (!dna) {
      setImage(DEFAULT_IMAGE);
      return;
    }
    const params: ReadContractParameters = {
      ...wagmiReadContractConfig,
      functionName: "imageByDNA",
      args: [BigInt(dna)],
      chainId,
    };
    const image = await readContract(config, params);
    if (typeof image === "string") {
      setImage(image);
    }
  };

  useEffect(() => {
    generateDna();
  }, [generateDna]);

  useEffect(() => {
    generateImage(dna);
  }, [dna]);

  return { generateDna, dna, image };
}
