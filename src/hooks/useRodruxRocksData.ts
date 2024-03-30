import { config } from "@/config";
import { readContract } from "@wagmi/core";
import { type ReadContractParameters } from "@wagmi/core";
import { wagmiReadContractConfig } from "@/wagmiContractConfig";
import { useRodruxRocks } from "./useRodruxRocks";
import { useAccount } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isAddress } from "viem";

const emptyRodruxRock: RodruxRock = {
  name: "",
  description: "",
  image: "",
  attributes: [{ dna: "" }],
  owner: "",
};

export const useRodruxRocksData = () => {
  const { getTotalSupply } = useRodruxRocks();
  const { chainId } = useAccount();
  const [rodruxRocks, setRodruxRocks] = useState<RodruxRock[]>([]);
  const pathname = usePathname();
  const getRodruxRockData = useCallback(
    async (id: number): Promise<RodruxRock> => {
      const ownerParams: ReadContractParameters = {
        ...wagmiReadContractConfig,
        functionName: "ownerOf",
        args: [BigInt(id)],
        chainId,
      };
      const owner = await readContract(config, ownerParams);
      const params: ReadContractParameters = {
        ...wagmiReadContractConfig,
        functionName: "tokenURI",
        args: [BigInt(id)],
        chainId,
      };
      const tokenURI = await readContract(config, params);
      if (typeof tokenURI === "string") {
        const tokenMetadata = await fetch(tokenURI);
        const metadata = await tokenMetadata.json();
        return {
          owner,
          ...metadata,
        };
      }
      return emptyRodruxRock;
    },
    [chainId]
  );

  const getTokensIdsByOwner = useCallback(
    async (owner: string): Promise<unknown[]> => {
      const balanceParams: ReadContractParameters = {
        ...wagmiReadContractConfig,
        functionName: "balanceOf",
        args: [owner],
        chainId,
      };
      const balanceOf = await readContract(config, balanceParams);
      let tokensIds: unknown[] = [];
      if (typeof balanceOf === "bigint") {
        const tokenIdPromises: Promise<unknown>[] = [];
        for (let i = 0; i < balanceOf; i++) {
          const tokenByOwnerParams: ReadContractParameters = {
            ...wagmiReadContractConfig,
            functionName: "tokenOfOwnerByIndex",
            args: [owner, BigInt(i)],
            chainId,
          };
          const tokenIdPromise = readContract(config, tokenByOwnerParams);
          tokenIdPromises.push(tokenIdPromise);
        }
        tokensIds = await Promise.all(tokenIdPromises);
      }
      return tokensIds;
    },
    [chainId]
  );

  const getAllRodruxRocks = useCallback(
    async ({ owner = null }: { owner?: string | null | undefined } = {}) => {
      const parts = pathname.split("/");
      let address;
      if (parts.length === 3) {
        const slug = parts[parts.length - 1];
        address = isAddress(slug) ? slug : "";
      }

      const RodruxRockPromises: Array<Promise<RodruxRock>> = [];
      if (address) {
        const tokensIds: unknown[] = await getTokensIdsByOwner(address);
        for (let i = 0; i < tokensIds.length; i++) {
          const tokenId = tokensIds[i];
          if (typeof tokenId === "bigint") {
            RodruxRockPromises.push(getRodruxRockData(Number(tokenId)));
          }
        }
      } else {
        const totalSupply = await getTotalSupply();
        for (let i = 0; i < totalSupply; i++) {
          RodruxRockPromises.push(getRodruxRockData(i));
        }
      }
      const RodruxRocks = await Promise.all(RodruxRockPromises);
      setRodruxRocks(RodruxRocks);
    },
    [getRodruxRockData, getTotalSupply, pathname, getTokensIdsByOwner]
  );

  useEffect(() => {
    getAllRodruxRocks();
  }, [getAllRodruxRocks]);

  return { rodruxRocks };
};
