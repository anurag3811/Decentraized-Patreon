const { ethers, run, network } = require("hardhat")

async function main() {
  const patreonFactory = await ethers.getContractFactory("Patreon");
  const Patreon = await patreonFactory.deploy();
  console.log(Patreon.address);

}


main().then(() => process.exit(0)).catch((error) => {
console.log(error);
process.exit(1);})


