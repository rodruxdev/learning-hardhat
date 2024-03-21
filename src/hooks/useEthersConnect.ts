import { Eip1193Provider } from "ethers";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

function useEthersConnect() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [active, setActive] = useState(false);

  const verifyProvider = () => {
    if (window.ethereum !== undefined) {
      setActive(true);
    }
  };

  const connectWallet = async () => {
    if (active) {
      if (!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
        const signer = await provider.getSigner();
        const newAccount = await signer.getAddress();
        setConnected(true);
        setAccount(newAccount);
      } else {
        setAccount("");
        setConnected(false);
      }
    }
  };

  useEffect(() => {
    verifyProvider();
  }, []);

  return { active, account, connected, connectWallet }
}

export default useEthersConnect;
