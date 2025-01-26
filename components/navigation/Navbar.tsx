"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import Button from "../button/Button";

const MenuItems = ({
  isMobile = false,
  active,
  setActive,
}: {
  isMobile: boolean;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, index) => (
        <li
          key={index}
          onClick={() => setActive(item)}
          className={`cursor-pointer flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          }`}
        >
          <Link href={generateLink(index)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const hasConnected = true;
  const router = useRouter();

  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {}}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src="/assets/logo02.png"
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              CryptoKet
            </p>
          </div>
        </Link>{" "}
        <Link href="/">
          <div className="hidden md:flex cursor-pointer" onClick={() => {}}>
            <Image
              src="/assets/logo02.png"
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-9 h-5 bg-black rounded-2xl p-1 relative label"
          >
            <Sun className="text-white" />
            <Moon className="text-white" />
            <div className="w-4 h-4 absolute bg-white rounded-full ball" />
          </label>
        </div>{" "}
        <div className="md:hidden flex">
          <MenuItems isMobile={false} active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            src="/assets/cross.png"
            alt="close"
            width={25}
            height={25}
            objectFit="contain"
            onClick={() => setIsOpen(false)}
            className={`${theme === "light" && "filter invert"}`}
          />
        ) : (
          <Image
            src="/assets/menu.png"
            alt="menu"
            width={25}
            height={25}
            objectFit="contain"
            onClick={() => setIsOpen(true)}
            className={`${theme === "light" && "filter invert"}`}
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile={true}
              />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
