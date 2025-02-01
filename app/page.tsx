import Banner from "@/components/banner/Banner";
import HotBids from "@/components/hotBids/HotBids";
import TopSellers from "@/components/topSellers/TopSellers";
export default function Home() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Discover, collect, and sell <br />
              extraordinary NFTs
            </>
          }
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 sm:text-2xl text-4xl font-semibold ml-4 xs:ml-0">
            Top Sellers
          </h1>
          <TopSellers />
        </div>
        <div className="mt-10">
          <HotBids />
        </div>
      </div>
    </div>
  );
}
