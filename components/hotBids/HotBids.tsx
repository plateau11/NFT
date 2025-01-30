"use client";
import React, { useContext, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { makeId } from "@/utils/makeId";
import { NFTContext } from "@/context/NFTContext";
interface NFTItem {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
}
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
      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <NFTCard
          key={`nft-${i}/`}
          nft={{
            i,
            name: `Nifty NFT ${i}`,
            seller: id,
            owner: id,
            description: "Cool NFT on Sale",
            price: (10 - i * 0.534).toFixed(2),
          }}
        />
      ))} */}
    </>
  );
};

export default HotBids;
