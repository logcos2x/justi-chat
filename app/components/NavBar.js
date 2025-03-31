"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-3 bg-[rgba(0,0,0,0.5)] text-white z-50 backdrop-blur-md">
      <h1 className="text-2xl ml-5 font-bold">Justi-Chat</h1>
      {!session && (
        <Link href={"/login"}>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 mr-5">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-5 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
              Login
            </span>
          </button>
        </Link>
      )}
      {session && (
        <button
          className="cursor-pointer relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 mr-5"
          onClick={() => signOut()}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-5 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
            Logout
          </span>
        </button>
      )}
    </nav>
  );
};

export default NavBar;
