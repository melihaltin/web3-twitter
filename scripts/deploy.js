// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
async function main() {
  const twitter = await hre.ethers.deployContract("Twitter");

  const address = await twitter.getAddress();

  const contractDirectory = __dirname + "/../src/contract";

  if (!fs.existsSync(contractDirectory)) {
    fs.mkdirSync(contractDirectory);
  }

  fs.writeFileSync(
    contractDirectory + "/twitter-address.json",
    JSON.stringify({ Twitter: address }, undefined, 2)
  );

  const contractArtifacts = await hre.artifacts.readArtifact("Twitter");

  fs.writeFileSync(
    contractDirectory + "/twitter-artifacts.json",
    JSON.stringify(contractArtifacts, undefined, 2)
  );

  console.log("Twitter deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
