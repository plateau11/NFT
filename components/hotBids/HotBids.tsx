"use client";
import React, { useContext, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { NFTContext } from "@/context/NFTContext";

const HotBids = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  useEffect(() => {
    fetchNFTs().then((items: NFTItem[]) => {
      setNfts(items);
      console.log(items);
    });
  }, []);

  return (
    <>
      {nfts.map((nft) => (
        <NFTCard key={nft.tokenId} nft={nft} />
      ))}
    </>
  );
};

export default HotBids;
