import React from "react";
import { ButtonWallet } from "../ButtonWallet/ButtonWallet";
import ClientOnly from "../ClientOnly/ClientOnly";

const Header = () => {
  return (
    <header className="w-full flex justify-around">
      <h3 className="text-white">RodruxRocks</h3>
      <ClientOnly>
        <ButtonWallet></ButtonWallet>
      </ClientOnly>
    </header>
  );
};

export default Header;
