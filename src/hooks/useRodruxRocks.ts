import { config } from "@/config";
import { readContract } from "@wagmi/core";
import { wagmiContractConfig } from "@/wagmiContractConfig";
import { getClient } from "wagmi/actions";
import { type ReadContractParameters } from "@wagmi/core";
import { abi } from "@/abi";
import { localhost } from "wagmi/chains";

export function useRodruxRocks() {
  const getTotalSupply = async () => {
    const params: ReadContractParameters = {
      ...wagmiContractConfig,
      functionName: "totalSupply",
    };
    const totalSupply = await readContract(config, params);

    return totalSupply;
  };

  return { getTotalSupply };
}
