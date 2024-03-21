"use client";
import { Connector, useConnect } from "wagmi";

export function ButtonWallet() {
  const { connectors, connect } = useConnect();
  const connector = connectors[1];
  return (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      Connect Metamask
    </button>
  );
}
