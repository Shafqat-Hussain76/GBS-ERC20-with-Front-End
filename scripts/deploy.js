
const hre = require("hardhat");

async function main() {
  
  const MYETC20 = await hre.ethers.getContractFactory("MYERC20");
  const myerc20 = await MYETC20.deploy();

  await myerc20.deployed();

  console.log(`deployed to ${myerc20.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
