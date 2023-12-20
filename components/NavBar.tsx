"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center bombay-bg-color px-3 py-1 md:px-64 shadow-md h-14">
      <div className=" flex align-middle font-semibold cold-gray-color gap-3">
        <Image
          className="mx-auto my-3"
          src="/search.svg"
          alt="search"
          width="30"
          height="30"
        />
        <div className="my-auto">
          <Link href="/" className="text-md">
            Economic Search Filter
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        {status === "loading" && (
          <div className="flex gap-3">
            <div className="spinner"></div> <div>Loading...</div>
          </div>
        )}
        {status === "authenticated" && (
          <>
            <div>{session.user!.name}</div>
            <button
              onClick={() => signOut()}
              className="text-red-800 font-semibold hover:elm-bg-color hover:text-[#1d7a85] transition duration-300 ease-in-out"
            >
              Sign Out
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <div className="flex gap-4">
            <Link
              href="/register"
              className="cold-gray-color font-semibold hover:elm-bg-color hover:text-[#1d7a85] transition duration-300 ease-in-out"
            >
              Register
            </Link>
            <button
              onClick={() => signIn()}
              className="cold-gray-color font-semibold hover:elm-bg-color hover:text-[#1d7a85] transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        )}
        <Link
          href="/about"
          className="cold-gray-color font-semibold hover:elm-bg-color hover:text-[#1d7a85] transition duration-300 ease-in-out"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
