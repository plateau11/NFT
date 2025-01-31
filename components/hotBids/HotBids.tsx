"use client";
import React, { useContext, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { makeId } from "@/utils/makeId";
import { NFTContext } from "@/context/NFTContext";

const HotBids = () => {
  const [id, setId] = useState("");
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  useEffect(() => {
    fetchNFTs().then((items: NFTItem[]) => {
      setNfts(items);
      console.log(items);
    });
  }, []);
  useEffect(() => {
    setId(`0x${makeId(3)}...${makeId(4)}`);
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
