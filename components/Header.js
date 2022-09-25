import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export const Header = ({ search, searchHidden }) => {
  return (
    <header>
      <Link href="/home">
        <h1
          className="text-center text-white md:text-6xl font-extrabold tracking-tighter mb-4"
          data-aos="zoom-y-out"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-500 to-teal-400">
            Decentralized
          </span>
          Tube
        </h1>
      </Link>
      {!searchHidden && (
        <div className="w-full flex justify-between h-20 items-center border-b p-4 border-[#202229]">
          <div className=" w-1/3">
            <Image
              width={120}
              height={80}
              src="/decentralized-logo.png"
              alt="decentralized-tube Logo"
            />
          </div>
          <div className=" w-1/3 flex justify-center items-center">
            {search ? (
              <input
                type="text"
                onChange={(e) => search(e.target.value)}
                placeholder="Type to search"
                className=" border-0 bg-transparent focus:outline-none text-white"
              />
            ) : null}
          </div>
          <div className=" w-1/3 flex justify-end">
            <AiOutlinePlusCircle
              onClick={() => {
                window.location.href = "/upload";
              }}
              size="30px"
              className="mr-8 fill-whiteIcons dark:fill-white cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
};
