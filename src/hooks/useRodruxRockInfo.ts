import { usePathname } from "next/navigation";
import { useRodruxRocks } from "./useRodruxRocks";
import { useCallback, useEffect, useState } from "react";
import { useRodruxRocksData } from "./useRodruxRocksData";
import { type WriteContractParameters } from "@wagmi/core";
import { wagmiWriteContractConfig } from "@/wagmiContractConfig";
import { useAccount, useWriteContract } from "wagmi";
import { isAddress } from "viem";

export const useRodruxRockInfo = () => {
  const pathname = usePathname();
  const { address, chainId } = useAccount();
  const { getTotalSupply } = useRodruxRocks();
  const { getRodruxRockData } = useRodruxRocksData();
  const [rodruxRock, setRodruxRock] = useState<RodruxRock | undefined>(
    undefined
  );
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { writeContractAsync, isPending } = useWriteContract();
  const [tokenId, setTokenId] = useState<bigint | undefined>();

  const getRodruxRockByPath = useCallback(async () => {
    const parts = pathname.split("/");
    let tokenId = -1;
    if (parts.length === 3) {
      const slug = parts[parts.length - 1];
      const totalSupply = await getTotalSupply();
      if (Number(slug) < totalSupply) {
        tokenId = Number(slug);
        setTokenId(BigInt(tokenId));
      }
    }

    setRodruxRock(undefined);
    if (tokenId >= 0) {
      const newRodruxRock = await getRodruxRockData(Number(tokenId));
      setRodruxRock(newRodruxRock);
    }
  }, [getRodruxRockData, getTotalSupply, pathname]);

  const transferRodruxRock = async () => {
    if (isOwner) {
      const toAddress = prompt("The objective address");
      if (!toAddress) {
        return;
      }
      if (isAddress(toAddress) && tokenId !== undefined) {
        try {
          const params: WriteContractParameters = {
            ...wagmiWriteContractConfig,
            functionName: "safeTransferFrom",
            account: address,
            args: [address, toAddress, tokenId],
            chainId,
          };
          await writeContractAsync(params);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    getRodruxRockByPath();
  }, [getRodruxRockByPath]);

  useEffect(() => {
    setIsOwner(rodruxRock?.owner === address);
  }, [address, rodruxRock?.owner]);

  return { rodruxRock, isOwner, isPending, transferRodruxRock };
};
