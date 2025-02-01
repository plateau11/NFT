# NFT Marketplace

This is a Web3-based NFT marketplace where users can create, buy, sell, and resell NFTs using Ethereum. The project is built using **Next.js, Hardhat, Pinata, and Solidity**.

## Features

- ✅ Mint and list NFTs for sale
- ✅ Buy and resell NFTs
- ✅ Connect with MetaMask wallet
- ✅ Store NFT metadata on IPFS via Pinata
- ✅ Smart contracts deployed on Ethereum blockchain

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Solidity (Smart Contracts)
- **Blockchain**: Ethereum (Hardhat for local development)
- **Storage**: Pinata (IPFS for metadata)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- MetaMask wallet
- Hardhat (for local blockchain)
- Pinata account (for IPFS storage)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/nft-marketplace.git
   cd nft-marketplace
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

### Smart Contract Deployment

1. **Navigate to the `contracts` folder and compile the contracts:**

   ```sh
   npx hardhat compile
   ```

2. **Start a local Ethereum network:**

   ```sh
   npx hardhat node
   ```

3. **Deploy the smart contract to the local network:**

   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```

### Running the Frontend

1. **Create a `.env.local` file in the root directory and add your environment variables:**

   ```sh
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=deployed_contract_address
   ```

2. **Start the Next.js development server:**

   ```sh
   npm run dev
   ```

   or

   ```sh
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

### Connecting MetaMask

- Open MetaMask and connect it to `http://localhost:8545`.
- Import an account using the private key provided by Hardhat local node.

## License

This project is licensed under the **MIT License**.

## Contributing

Feel free to submit pull requests or raise issues if you find any bugs. 🚀

## Contact

For any queries, reach out at **aditya1pradhan21@gmail.com**.
