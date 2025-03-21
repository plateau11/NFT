"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { NFTContext } from "@/context/NFTContext";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("tokenId");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const tokenURI = searchParams.get("tokenURI");
  const router = useRouter();
  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI!);
    setPrice(data.price);
    setImage(data.image);
  };
  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, []);
  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push("/");
  };
  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/4 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />
        {image && <img src={image} className="rounded mt-4" width={350} />}
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
