import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col  relative bottom-0 h-14">
      <div className="flex justify-between mx-auto mt-auto mb-3">
        <Image
          src="/search.svg"
          alt="logo"
          width="0"
          height="0"
          sizes="100vw"
          className="w-6 h-auto object-contain"
        />
        <p className="font-semibold mx-4 my-auto">Economic Search Filter</p>
        <p className="text-gray-700 my-auto">All rights reserved &copy;</p>
      </div>
    </footer>
  );
};

export default Footer;