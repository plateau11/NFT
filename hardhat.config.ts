import { HardhatUserConfig } from "hardhat/config";
import fs from "fs";
import "@nomiclabs/hardhat-waffle";
const privateKey = fs.readFileSync(".secret").toString().trim();
const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: "0.8.4",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
  },
};

export default config;
