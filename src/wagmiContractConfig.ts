import { localhost } from "wagmi/chains";
import { abi } from "./abi";
import { type ReadContractParameters } from "@wagmi/core";
import { type WriteContractParameters } from "@wagmi/core";

export const wagmiReadContractConfig: Pick<
  ReadContractParameters,
  "abi" | "address" | "chainId"
> = {
  abi,
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export const wagmiWriteContractConfig: Pick<
  WriteContractParameters,
  "abi" | "address" | "chainId"
> = {
  abi,
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};
