"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex justify-between items-center bombay-bg-color px-3 py-1 md:px-64 shadow-md h-14">
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
      {/* Hamburger Icon for Mobile */}
      <button onClick={toggleMenu} className="md:hidden">
        <Image src="/hamburger.svg" alt="menu" width={30} height={30} />
      </button>
      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[300px]" : "max-h-0"
        } md:relative md:max-h-none md:items-center md:hidden`}
      >
        <div className="h-[300px] bg-slate-50 p-2">
          <ul  className="sidebar-nav text-center leading-relaxed text-xl">
            <li className="">
              <Link href="/" onClick={toggleMenu}>
                <p>Home</p>
              </Link>
            </li>

            <li>
              <Link href="/register" onClick={toggleMenu}>
                <p>Register</p>
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={toggleMenu}>
                <p>Login</p>
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMenu}>
                <p>About</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Desktop Menu */}

      <div className={`md:flex hidden gap-4 }`}>
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
