import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config()
const projectId = process.env.DEPLOYER_SIGNER_PRIVATE_KEY;
const privateKey = process.env.INFURA_PROJECT_ID as string;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `//To Do Add url${projectId}`,
      accounts: [privateKey]
    }
  }
};

export default config;
