"use client";
import React, { useContext, useEffect, useState } from "react";
import CreatorCard from "./CreatorCard";
import { makeId } from "@/utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "@/context/NFTContext";
import { getCreators } from "@/utils/getTopCreators";
import { shortenAddress } from "@/utils/shortenAddress";
import Loader from "../Loader";
const TopSellers = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hideButtons, setHideButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  useEffect(() => {
    fetchNFTs().then((items: NFTItem[]) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;
    const scrollAmmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === "left") {
      current!.scrollLeft -= scrollAmmount;
    } else {
      current!.scrollLeft += scrollAmmount;
    }
  };

  const isScrollable = () => {
    if (!scrollRef.current || !parentRef.current) return;

    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current!.scrollWidth >= parent!.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };
  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });
  const topCreators = getCreators(nfts);

  return (
    <>
      {!isLoading && !nfts.length ? (
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          No NFTs for sale!
        </h1>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
          <div
            className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
            ref={scrollRef}
          >
            {topCreators.map((creator, i) => (
              <CreatorCard
                key={`creator-${creator.seller}`}
                rank={i + 1}
                creatorImage={`/assets/creator${i + 1}.png`}
                creatorName={shortenAddress(creator.seller)}
                creatorEths={creator.sum}
              />
            ))}
            {/* {[6, 7, 8, 9, 10].map((i) => (
          <CreatorCard
            key={`creator-${i}`}
            rank={i}
            creatorImage={`/assets/creator${i}.png`}
            creatorName={id}
            creatorEths={10 - i * 0.5}
          />
        ))} */}
            {!hideButtons && (
              <>
                <div
                  onClick={() => handleScroll("left")}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                >
                  <Image
                    src="/assets/left.png"
                    fill
                    sizes={"100%"}
                    alt="left_arrow"
                    className={` ${
                      theme === "light" && "filter invert"
                    } rounded-full `}
                  />
                </div>{" "}
                <div
                  onClick={() => handleScroll("right")}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                >
                  <Image
                    src="/assets/right.png"
                    fill
                    sizes={"100%"}
                    alt="right_arrow"
                    className={` ${
                      theme === "light" && "filter invert"
                    } rounded-full `}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default TopSellers;
