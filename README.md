NFT Marketplace

This is a Web3-based NFT marketplace where users can create, buy, sell, and resell NFTs using Ethereum. The project is built using Next.js, Hardhat, Pinata, and Solidity.

Features

Mint and list NFTs for sale

Buy and resell NFTs

Connect with MetaMask wallet

Store NFT metadata on IPFS via Pinata

Smart contracts deployed on Ethereum blockchain

Tech Stack

Frontend: Next.js, React

Backend: Solidity (Smart Contracts)

Blockchain: Ethereum (Hardhat for local development)

Storage: Pinata (IPFS for metadata)

Getting Started

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16 or later)

npm or yarn

MetaMask wallet

Hardhat (for local blockchain)

Pinata account (for IPFS storage)

Installation

Clone the repository:

git clone https://github.com/yourusername/nft-marketplace.git
cd nft-marketplace

Install dependencies:

npm install

or

yarn install

Smart Contract Deployment

Navigate to the contracts folder and compile the contracts:

npx hardhat compile

Start a local Ethereum network:

npx hardhat node

Deploy the smart contract to the local network:

npx hardhat run scripts/deploy.js --network localhost

Running the Frontend

Create a .env.local file in the root directory and add your environment variables:

NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_api_key
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=deployed_contract_address

Start the Next.js development server:

npm run dev

or

yarn dev

Open http://localhost:3000 in your browser.

Connecting MetaMask

Open MetaMask and connect it to http://localhost:8545

Import an account using the private key provided by Hardhat local node

License

This project is licensed under the MIT License.

Contributing

Feel free to submit pull requests or raise issues if you find any bugs.

Contact

For any queries, reach out at your-email@example.com.
