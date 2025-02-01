"use client";

import Button from "@/components/button/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { NFTContext } from "@/context/NFTContext";
import { shortenAddress } from "@/utils/shortenAddress";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const PaymentBodyCmp = ({
  nft,
  nftCurrency,
}: {
  nft: NFT;
  nftCurrency: string;
}) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Subtotal
      </p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image src={nft.image} fill sizes={"100&"} alt="image" />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {shortenAddress(nft.seller)}
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
            {nft.name}
          </p>
        </div>
      </div>

      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Total
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
        {nft.price} <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [nft, setNft] = useState<NFT>({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    description: "",
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    try {
      // Get the 'nft' parameter and parse it as JSON
      const nftParam = searchParams.get("nft");
      if (nftParam) {
        const nftData = JSON.parse(nftParam);
        setNft({
          image: nftData.image || "",
          tokenId: nftData.tokenId || "",
          name: nftData.name || "",
          owner: nftData.owner || "",
          price: nftData.price || "",
          seller: nftData.seller || "",
          description: nftData.description || "",
        });
      }
    } catch (error) {
      console.error("Error parsing NFT data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:2/3 minmd:h-2/3 sm:w-full sm:h-300 h-55">
          <Image
            src={nft.image}
            alt={nft.name || "NFT"}
            width={557}
            height={557}
            className="rounded-xl shadow-xl object-cover"
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4 mt-10">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10 ">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src="/assets/creator1.png"
                className="rounded-full object-cover"
                width={100}
                height={100}
                alt="creator"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-gray-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins  dark:text-white text-nft-black-1  minlg:text-base font-semibold">
              Detail
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
              You cannot buy your own NFT
            </p>
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName="Checkout"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />{" "}
              <Button
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
          header="Checkout"
        />
      )}
      {successModal && (
        <Modal
          header="Payment Successful"
          body={
            <div className="flexCenter flex-col text-center">
              <div className="relative w-52 h-52">
                <Image src={nft.image} alt={nft.name} fill sizes={"100%"} />
              </div>
              <p className="mt-10 font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
                You successfully purchased{" "}
                <span className="font-semibold">{nft.name}</span> from
                <span className="font-semibold">
                  {" "}
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                classStyles="sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() => router.push("/my-nfts")}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default NFTDetails;
