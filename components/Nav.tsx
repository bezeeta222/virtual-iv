"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Import the Google icon
import { GoogleLoginButton } from "react-social-login-buttons";

interface Provider {
  id: string;
  name: string;
}

const Nav: React.FC = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<{
    [key: string]: Provider;
  } | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      console.log("res", res);
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
       
        <p className="logo_text">Virtual IV</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link> */}

            <button
              type="button"
              onClick={signOut as any}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/">
              <Image
                src={session?.user.image as any}
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
                <GoogleLoginButton
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  style={{
                    background: "black", // Set the default background color to black
                    color: "white", // Set the text color to white
                    height: "40px", // Set the height to 100 pixels
                  }}
                  activeStyle={{
                    background: "grey", // Set the active (pressed) background color to black
                  }}
                />
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image as string}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href=""
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
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
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
