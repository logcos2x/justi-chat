"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex flex-col mt-45 ml-40 items-center justify-center">
        <div className="max-w-3xl font-Manrope">
          <h1 className="text-5xl font-extrabold sm:text-7xl">
            Law, Crime, and Insight in Time!
          </h1>
          <p className="my-4 font-medium">
            Justi-Chat is an AI-powered legal encyclopedia and crime history
            search platform, offering accessible legal resources, case studies,
            and real-time crime data. Empowering lawyers, students, and citizens
            with AI-driven insights, historical crime trends, and legal guidance
            about Government portals at their fingertips.
          </p>
          <div>
            <Link href={"/about"}>
              <button className="cursor-pointer m-1 rounded-xl bg-[#6363ee] px-16 py-2 text-lg font-bold transition-all duration-300 hover:bg-[#4a4ad1]">
                Learn More
              </button>
            </Link>
            {!session && (
              <Link href={"/login"}>
                <button className="cursor-pointer mx-1 rounded-xl bg-white px-16 py-2 text-lg font-bold transition-background inline-flex h-12 items-center justify-center border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Login
                </button>
              </Link>
            )}
            {session && (
              <Link href={"/chat"}>
                <button className="cursor-pointer mx-1 rounded-xl bg-white px-16 py-2 text-lg font-bold transition-background inline-flex h-12 items-center justify-center border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Chat
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
