"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import brandLogo from "@public/assets/brand.png";
import UserContext from "@store/UserContext";
import DualRing from "./Loading/DualRing";

const Nav = () => {
  const { data: session } = useSession();
  const { isLoggedIn, checkLoggedUser, user, isChecking } =
    useContext(UserContext);

  const handleSignOut = () => {
    if (session?.user) {
      signOut();
    }
    localStorage.removeItem("user");
    checkLoggedUser();
  };

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 px-5">
      <Link href="/">
        <Image
          src={brandLogo}
          alt="logo"
          width="auto"
          height={40}
          className="object-contain"
        />
      </Link>

      <div>
        {isChecking ? (
          <DualRing />
        ) : isLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/room" className="black_btn">
              Create Room
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              {user?.image ? (
                <Image
                  src={user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              ) : (
                <section className="w-9 h-9 rounded-full flex justify-center items-center bg-yellow-400">
                  <span className="text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </section>
              )}
            </Link>
          </div>
        ) : (
          <Link href="/signin" className="black_btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
