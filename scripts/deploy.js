const { ethers } = require("hardhat");

async function main() {
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy();
  console.log("Deploying NFTMarketplace...");

  await nftmarketplace.deployed();
  console.log("NFTMarketplace deployed to:", nftmarketplace.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
