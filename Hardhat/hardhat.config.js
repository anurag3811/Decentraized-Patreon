require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

// const RPC_URL = process.env.RPC_URL;



module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "hmy goerli infura link was here",
      accounts: ["MY private key was here"],
      chainId: 5,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY,
  // }
  // gasReporter: {
  //   enabled: true,
  //   currency: "USD",
  //   outputFile: "gas-report.txt",
  //   noColors: true,
  //   coinmarketcap: COINMARKETCAP_API_KEY,
  // },
};
