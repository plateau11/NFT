import Image from "next/image";

const Loader = () => {
  return (
    <div className="flexCenter w-full my-4">
      <Image src="/assets/loader.gif" alt="loader" width={100} height={100} />
    </div>
  );
};

export default Loader;
