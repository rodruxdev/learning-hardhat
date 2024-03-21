"use client";

import React from "react";
import ButtonWallet from "../ButtonWallet/ButtonWallet";
import useEthersConnect from "@/hooks/useEthersConnect";

const Header = () => {
  const { active, connected, connectWallet, account } = useEthersConnect();
  return (
    <header className="w-full flex justify-around">
      <h3 className="text-white">RodruxRocks</h3>
      <ButtonWallet
        connected={connected}
        connectWallet={connectWallet}
        account={account}
      ></ButtonWallet>
      {active && <p>Wallet detected</p>}
    </header>
  );
};

export default Header;
