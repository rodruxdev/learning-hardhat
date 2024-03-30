import { config } from "@/config";
import { readContract } from "@wagmi/core";
import {
  wagmiReadContractConfig,
  wagmiWriteContractConfig,
} from "@/wagmiContractConfig";
import { type ReadContractParameters } from "@wagmi/core";
import { type WriteContractParameters } from "@wagmi/core";
import { useAccount, useWriteContract } from "wagmi";
import { useCallback } from "react";

export function useRodruxRocks() {
  const { address, chainId } = useAccount();
  const { data, writeContractAsync, isPending } = useWriteContract();

  const getTotalSupply = useCallback(async (): Promise<number> => {
    const params: ReadContractParameters = {
      ...wagmiReadContractConfig,
      functionName: "totalSupply",
      chainId,
    };
    const totalSupply = await readContract(config, params);
    if (typeof totalSupply === "bigint") {
      return Number(totalSupply);
    }
    return -1;
  }, [chainId]);

  const mintRodruxRock = async (onMint: () => void) => {
    if (!address) {
      console.log("Connect your wallet");
      return;
    }
    try {
      const params: WriteContractParameters = {
        ...wagmiWriteContractConfig,
        functionName: "mint",
        account: address,
        chainId,
      };
      await writeContractAsync(params);
    } catch (error) {
      console.error(error);
    }
  };

  return { getTotalSupply, mintRodruxRock, isPending, data };
}
