"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const nftCurrency = "MATIC";

  const pinataApiKey = "1e5199f7a3d79e05ce05";
  const pinataSecretApiKey =
    "d584d159b0ccc6235fe4d69a3a6bf053774dc0d90d5cb008112717f8e6f148c8";
  const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

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

      // Prepare the file for upload
      const formData = new FormData();
      formData.append("file", file);

      // Make the request to Pinata
      const response = await axios.post(pinataUrl, formData, {
        maxRedirects: 0,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      // Check if the upload was successful
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

  return (
    <NFTContext.Provider
      value={{ nftCurrency, currentAccount, connectWallet, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
