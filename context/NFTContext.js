"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import Web3Modal from "web3modal";
import { MarketAddress, MarketAddressABI } from "./constants.js";
import { ethers } from "ethers";
export const NFTContext = React.createContext();

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const pinataApiKey = "1e5199f7a3d79e05ce05";
  const pinataSecretApiKey =
    "d584d159b0ccc6235fe4d69a3a6bf053774dc0d90d5cb008112717f8e6f148c8";
  const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const pinataJsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const checkIfWalletIsConnected = async () => {
    console.log("Checking if wallet is connected...");
    if (!window.ethereum) return alert("Please install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const uploadToIPFS = async (file) => {
    if (!file) {
      console.error("No file provided for upload.");
      return;
    }
    try {
      console.log("Uploading file to Pinata...");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(pinataUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      if (response.data && response.data.IpfsHash) {
        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log("Uploaded file URL:", url);
        return url;
      } else {
        console.error("Failed to upload file to Pinata.");
      }
    } catch (error) {
      console.error("Error uploading file to Pinata.", error);
    }
  };

  const createNFT = async (FormInput, fileUrl, router) => {
    const { name, description, price } = FormInput;
    if (!name || !description || !price || !fileUrl) {
      console.error("Please fill out all the fields.");
      return;
    }

    const metadata = {
      name,
      description,
      image: fileUrl,
      price,
    };

    try {
      console.log("Uploading metadata to Pinata...");
      const response = await axios.post(pinataJsonUrl, metadata, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      if (response.data && response.data.IpfsHash) {
        const metadataUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log("Uploaded metadata URL:", metadataUrl);
        await createSale(metadataUrl, price);
        router.push("/");
      } else {
        console.error("Failed to upload metadata to Pinata.");
      }
    } catch (error) {
      console.error("Error uploading metadata to Pinata.", error);
    }
  };

  const createSale = async (metadataUrl, formInputPrice, isReselling, id) => {
    try {
      const we3Modal = new Web3Modal();
      const connection = await we3Modal.connect();
      console.log("Connected to Web3");
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = fetchContract(signer);
      console.log({ contract });
      const listingPrice = await contract.getListingPrice();
      const transaction = await contract.createToken(metadataUrl, price, {
        value: listingPrice.toString(),
      });
      await transaction.wait();
    } catch (error) {
      console.error("Error creating sale.", error);
    }
  };

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const data = await contract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );
        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    const we3Modal = new Web3Modal();
    const connection = await we3Modal.connect();
    console.log("Connected to Web3");
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );
        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  };
  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
        uploadToIPFS,
        createNFT,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
