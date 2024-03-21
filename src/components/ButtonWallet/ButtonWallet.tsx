import React from "react";

const ButtonWallet = ({
  connected,
  account,
  connectWallet,
}: {
  connected: boolean;
  account: string;
  connectWallet: () => {};
}) => {
  return (
    <button
      className="border-white rounded border-solid border-2 p-4"
      onClick={connectWallet}
    >
      {connected ? <span>{account}</span> : <span>Connect Wallet</span>}
    </button>
  );
};

export default ButtonWallet;
