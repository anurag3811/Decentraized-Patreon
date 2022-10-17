# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js

hello

some things I might forget:

0. const { ethers, run, network } = require("hardhat")  ------------- for ethers, run verify:verify , get network config

1. Network config in hardhat.config.js
2. Installing Hardhat toolkit
3.  .env file things:

    Create .env in open
    {    npm install dotenv --save   }
    require('dotenv').config()         ---------- in file
    const RPC_URL = process.env.RPC_URL

# contents:
        rpc url
        private key
        etherscan api key
        coinmarket cap api keys


4. For progmatic verification on etherscan:
        {   npm install --save-dev @nomiclabs/hardhat-etherscan    }
        require("@nomiclabs/hardhat-etherscan");

5. Verification: 

6. Deployment: {    npx hardhat run --network <your-network> scripts/deploy.js  }   network = rinkeby, localhost,etc 

7. Sometimes Delete Artifacts and cache to compile again

8. npx hardhat node     ------- setup localhost in hardhat.config.js

10. Testing: get chai, see test file, {     npx hardhat test    }

11. gasreporter : install gas-reporter







