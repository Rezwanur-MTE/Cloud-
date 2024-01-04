require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },

  paths:{
    artifacts:"./client/Edgecloud/src/artifacts",
  },

};

//0x5FbDB2315678afecb367f032d93F642f64180aa3