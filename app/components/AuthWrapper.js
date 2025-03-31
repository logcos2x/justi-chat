"use client";
import { useSession } from "next-auth/react";
import Chat from "./Chat";

export default function AuthWrapper({ children }) {
  const { data: session } = useSession();

  if (session) {
    return <Chat />;
  }

  return children;
}
