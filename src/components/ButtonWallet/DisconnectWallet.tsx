import React from "react";
import { Connector, useAccount, useDisconnect } from "wagmi";

const DisconnectWallet = ({
  connector,
}: Readonly<{ connector: Connector }>) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const formattedAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div>
      <span className="mr-1">{formattedAddress}</span>
      <button onClick={() => disconnect({ connector })}>Disconnect</button>
    </div>
  );
};

export default DisconnectWallet;
