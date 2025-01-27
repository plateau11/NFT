"use client";
import React, { useEffect, useState } from "react";
import CreatorCard from "./CreatorCard";
import { makeId } from "@/utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
const TopSellers = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hideButtons, setHideButtons] = useState(false);
  const { theme } = useTheme();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(`0x${makeId(3)}...${makeId(4)}`);
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
  return (
    <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
      <div
        className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
        ref={scrollRef}
      >
        {[6, 7, 8, 9, 10].map((i) => (
          <CreatorCard
            key={`creator-${i}`}
            rank={i}
            creatorImage={`/assets/creator${i}.png`}
            creatorName={id}
            creatorEths={10 - i * 0.5}
          />
        ))}
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
  );
};

export default TopSellers;
