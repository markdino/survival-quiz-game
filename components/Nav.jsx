"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import brandLogo from "@public/assets/brand.png";
import UserContext from "@store/UserContext";
import DualRing from "./Loading/DualRing";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { data: session, status } = useSession();
  const { isLoggedIn, checkLoggedUser, user, isChecking } =
    useContext(UserContext);
  const pathName = usePathname();

  const handleSignOut = () => {
    if (session?.user) {
      signOut();
    }
    localStorage.removeItem("user");
    checkLoggedUser();
  };
  return (
    <nav className="flex justify-between w-full py-3 px-5">
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
        {status === "loading" || isChecking ? (
          <section className="px-8">
            <DualRing />
          </section>
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
          <Link href={`/signin?redirect=${pathName}`} className="black_btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
