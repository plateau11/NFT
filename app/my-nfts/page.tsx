"use client";
import React, { useContext, useEffect, useState } from "react";
import NFTCard from "@/components/hotBids/NFTCard";
import Loader from "@/components/Loader";
import { NFTContext } from "@/context/NFTContext";
import Banner from "@/components/banner/Banner";
import Image from "next/image";
import { shortenAddress } from "@/utils/shortenAddress";

const MyNFTs = () => {
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items: NFTItem[]) => {
      setNfts(items);
      console.log(items);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4 "
          parentStyles="h-80 justify-center"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src="/assets/creator1.png"
              className="rounded-full object-cover"
              width={200}
              height={200}
              alt="creator"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>
      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-26">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:p-0 minlg:px-8">
            Searchbar
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
