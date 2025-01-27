import Image from "next/image";
import Link from "next/link";
import React from "react";
interface NFT {
  i: number;
  name: string;
  seller: string;
  owner: string;
  description: string;
  image?: string;
  price: string;
}
const NFTCard = ({ nft }: { nft: NFT }) => {
  return (
    <Link
      href={{ pathname: "/nft-details", query: { nft: JSON.stringify(nft) } }}
    >
      {" "}
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-2-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-5 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || `/assets/nft${nft.i}.png`}
            alt={`nft${nft.i}`}
            fill
            className="object-cover"
            sizes={"100%"}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.price}
              <span className="normal ml-0.5">ETH</span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.seller}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
