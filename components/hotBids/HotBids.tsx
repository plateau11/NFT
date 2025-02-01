"use client";
import React, { useContext, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { NFTContext } from "@/context/NFTContext";
import SearchBar from "../SearchBar";

const HotBids = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [nftsCopy, setNftsCopy] = useState<NFTItem[]>([]);
  const [activeSelect, setActiveSelect] = useState("Recently added");
  useEffect(() => {
    fetchNFTs().then((items: NFTItem[]) => {
      setNfts(items);
      setNftsCopy(items);
    });
  }, []);
  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);
  const onHandleSearch = (value: string) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <>
      {" "}
      <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start gap-10">
        <h1 className=" font-poppins dark:text-white text-nft-black-1 sm:text-2xl text-4xl font-semibold sm:mb-4 ">
          Hot NFTs
        </h1>
        <div className="flex-1 sm:w-full flex flex-row sm:flex-col">
          <SearchBar
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
            handleSearch={onHandleSearch}
            clearSearch={onClearSearch}
          />
        </div>
      </div>
      <div className="mt-3 w-full flex flex-wrap justify-center gap-2">
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}{" "}
      </div>
    </>
  );
};

export default HotBids;
