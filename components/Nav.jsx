"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import brandLogo from "@public/assets/brand.png"

const Nav = () => {
  const { data: session } = useSession();
  console.log(session, 'session')

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 px-5">
      <Link href="/">
        <Image
          src={brandLogo}
          alt="logo"
          width='auto'
          height={30}
          className="object-contain"
        />
      </Link>

      <div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-room" className="black_btn">
              Create Room
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
