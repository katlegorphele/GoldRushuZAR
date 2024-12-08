require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const {PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    lisk: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [PRIVATE_KEY],
      chainId: 4202,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123"
    },
    customChains: [
      {
          network: "lisk-sepolia",
          chainId: 4202,
          urls: {
              apiURL: "https://sepolia-blockscout.lisk.com/api",
              browserURL: "https://sepolia-blockscout.lisk.com"
          }
      }
    ]
  },
};
