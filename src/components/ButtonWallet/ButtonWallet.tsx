"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import DisconnectWallet from "./DisconnectWallet";
import ConnectWallet from "./ConnectWallet";

export function ButtonWallet() {
  const { connectors } = useConnect();
  const { isConnected } = useAccount();

  const connector = connectors[1];
  if (isConnected)
    return <DisconnectWallet connector={connector}></DisconnectWallet>;
  return <ConnectWallet connector={connector}></ConnectWallet>;
}
