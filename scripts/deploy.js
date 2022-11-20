// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const CRUD = await hre.ethers.getContractFactory("CRUD");
  const crud = await CRUD.deploy();

  await crud.deployed();

  const Empl1 = await crud.totalEmployees();
  const response = await crud.createEmployee("Harsh", "harshkumar62367@gmail.com", 20, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  console.log(response);
  const Empl2 = await crud.totalEmployees();
  console.log(Empl1, Empl2);
  const employee = await crud.employees(0);
  console.log(employee);

  const Update = await crud.updateEmployee("Kumar", "harshkumar62367@gmail.com");
  const employee1 = await crud.employees(0);
  console.log(employee1);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
