import React from "react";
import { ButtonWallet } from "../ButtonWallet/ButtonWallet";

const Header = () => {
  return (
    <header className="w-full flex justify-around">
      <h3 className="text-white">RodruxRocks</h3>
      <ButtonWallet></ButtonWallet>
    </header>
  );
};

export default Header;
