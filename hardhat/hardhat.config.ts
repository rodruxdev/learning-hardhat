import { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// const projectId = vars.get("INFURA_PROJECT_ID");
// const privateKey = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // networks: {
  //   sepolia: {
  //     url: `https://sepolia.infura.io/v3/${projectId}`,
  //     accounts: [privateKey]
  //   },
  // }
};

export default config;
