import React from "react";
import { Connector } from "wagmi";
import { useConnect } from "wagmi";

const ConnectWallet = ({ connector }: Readonly<{ connector: Connector }>) => {
  const { connect } = useConnect();
  return (
    <button key={connector?.uid} onClick={() => connect({ connector })}>
      Connect Metamask
    </button>
  );
};

export default ConnectWallet;
