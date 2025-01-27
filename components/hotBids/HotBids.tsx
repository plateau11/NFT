"use client";
import React, { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { makeId } from "@/utils/makeId";

const HotBids = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    setId(`0x${makeId(3)}...${makeId(4)}`);
  }, []);
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
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
      ))}
    </>
  );
};

export default HotBids;
