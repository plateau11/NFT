import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useRef } from "react";

const Modal = ({
  footer,
  body,
  handleClose,
  header,
}: {
  footer?: React.ReactNode;
  body: React.ReactNode;
  handleClose: () => void;
  header: string;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };
  return (
    <div
      className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="w-4/5  dark:bg-nft-dark bg-white flex flex-col rounded-lg"
      >
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6 ">
          <div
            className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer"
            onClick={handleClose}
          >
            <Image
              src="/assets/cross.png"
              alt="close"
              fill
              sizes={"100%"}
              className={`${theme === "light" && "filter invert"}`}
            />
          </div>
        </div>
        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">
            {header}
          </h2>
        </div>
        <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
          {body}
        </div>
        <div className="flexCenter p-4 ">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
